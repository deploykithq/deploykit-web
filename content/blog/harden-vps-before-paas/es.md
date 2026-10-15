---
title: "Protege tu VPS antes de instalar un PaaS autoalojado: SSH, firewall y la trampa de Docker con ufw"
description: "Checklist práctica para un VPS Linux nuevo antes de instalar DeployKit: actualizaciones, claves SSH, un firewall que Docker no se salte, fail2ban y el panel."
slug: proteger-vps-antes-de-paas-autoalojado
date: 2026-10-15
tags: [seguridad, autoalojamiento, vps, docker, tutorial]
author: Equipo de DeployKit
---

Un PaaS autoalojado es algo muy potente para exponer a internet. Guarda tus credenciales de repositorios, las contraseñas de tus bases de datos y el acceso al socket de Docker, que en la práctica equivale a ser root en la máquina. Antes de instalar uno, merece la pena dedicar veinte minutos a que sea difícil entrar en el propio servidor.

Esta checklist parte de un VPS recién creado con **Ubuntu 24.04** o **Debian 12**. En otras distribuciones los comandos son parecidos. Sigue los pasos en orden y no cierres tu sesión SSH actual hasta comprobar que puedes volver a entrar.

## 1. Actualiza todo y activa las actualizaciones de seguridad automáticas

```bash
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Unattended upgrades instala los parches de seguridad cada día. Reinicia cuando se actualice el kernel (si existe `/var/run/reboot-required`), o instala `needrestart` para que te avise de qué servicios hay que reiniciar.

## 2. Crea un usuario normal con sudo

No trabajes como `root` en el día a día:

```bash
adduser deploy
usermod -aG sudo deploy
```

Copia tu clave pública al nuevo usuario, desde **tu propia máquina**:

```bash
ssh-copy-id deploy@ip-de-tu-servidor
```

Abre una terminal **nueva** y comprueba que `ssh deploy@ip-de-tu-servidor` funciona y que `sudo -v` te pide la contraseña. Solo entonces sigue adelante.

## 3. Cierra el acceso por SSH

Los bots adivinan contraseñas, no claves. Crea un archivo aparte para que las actualizaciones de paquetes no sobrescriban tu configuración:

```bash
sudo tee /etc/ssh/sshd_config.d/10-hardening.conf > /dev/null <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
PubkeyAuthentication yes
MaxAuthTries 3
EOF
sudo sshd -t && sudo systemctl reload ssh
```

`sshd -t` valida la configuración antes de recargarla, así que una errata no te deja fuera. Prueba a iniciar sesión de nuevo antes de cerrar la sesión actual.

Mover SSH a un puerto no estándar reduce el ruido en los logs, pero no es seguridad de verdad. Lo que importa son las claves y el firewall.

## 4. El firewall, y la trampa de Docker

Este es el paso que la mayoría de guías explica mal para servidores con Docker.

**Docker se salta `ufw`.** Cuando un contenedor publica un puerto, Docker escribe sus propias reglas de iptables, que se evalúan antes que las de ufw. Así que `ufw deny 5432` puede mostrar el puerto como bloqueado mientras un contenedor de base de datos en ese puerto está accesible desde todo internet.

En un servidor con DeployKit, se publican puertos en el host en tres casos:

- Una app **sin dominio** publica su puerto en el host.
- Una base de datos con el **puerto externo** activado.
- Un **servidor de juegos**, porque los jugadores se conectan directamente a sus puertos.

Las apps con dominio no publican nada. El tráfico solo entra por Traefik, en el 80 y el 443.

### Usa el firewall de tu proveedor cloud

La solución más fiable es un firewall **fuera** del servidor: Hetzner Cloud Firewall, Security Groups de AWS, Cloud Firewalls de DigitalOcean, etc. Docker no puede tocar esas reglas. Un buen punto de partida:

| Puerto | Protocolo | Origen | Para qué |
| --- | --- | --- | --- |
| 22 | TCP | Tu IP (o el rango de tu oficina/VPN) | SSH |
| 80 | TCP | Cualquiera | Validación de Let's Encrypt y redirección HTTP→HTTPS |
| 443 | TCP | Cualquiera | Tus apps y el panel |
| Puertos de juegos | TCP/UDP | Cualquiera | Solo si ejecutas servidores de juegos |

El puerto 80 tiene que seguir abierto aunque todo acabe en HTTPS, porque Let's Encrypt valida los certificados a través de él.

### Si además usas ufw

ufw sigue siendo útil para los servicios propios del host, como SSH:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Pero no confíes en él para los puertos de los contenedores. Si necesitas filtrar en el host los puertos publicados, añade reglas a la cadena `DOCKER-USER` de Docker, por ejemplo con [ufw-docker](https://github.com/chaifeng/ufw-docker). **No desactives la integración de Docker con iptables** (`"iptables": false`): rompe la red de los contenedores.

El hábito más seguro es, simplemente, publicar lo mínimo posible. Dale un dominio a cada app web, y activa el puerto externo de una base de datos solo cuando de verdad lo necesites, restringido a tu IP en el firewall del proveedor.

## 5. Frena los ataques de fuerza bruta con fail2ban

Aunque SSH solo acepte claves, los bots no paran de llamar al puerto 22 y te llenan los logs. fail2ban bloquea las IPs tras varios fallos seguidos:

```bash
sudo apt install -y fail2ban
sudo tee /etc/fail2ban/jail.local > /dev/null <<'EOF'
[sshd]
enabled = true
backend = systemd
maxretry = 5
bantime = 1h
EOF
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

El panel de DeployKit tiene su propia protección: el login y el registro están limitados a 10 intentos por minuto y por IP.

## 6. Mantenimiento básico

- **Sincronización de la hora.** Los certificados y los tokens dependen del reloj. Comprueba que `timedatectl` muestra `System clock synchronized: yes`.
- **Swap en servidores pequeños.** En un VPS de 1–2 GB, los builds de imágenes pueden quedarse sin memoria. Un archivo de swap de 2 GB te da margen:

  ```bash
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
  sudo mkswap /swapfile && sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```

- **Rotación de logs de Docker.** Por defecto, los logs de los contenedores crecen sin límite. Fija un tope en `/etc/docker/daemon.json` (créalo si Docker ya está instalado y reinicia Docker):

  ```json
  {
    "log-driver": "json-file",
    "log-opts": { "max-size": "10m", "max-file": "3" }
  }
  ```

## 7. Instala DeployKit y protege el panel enseguida

Ahora sí, instala:

```bash
npm i -g @deploykit/cli
sudo deploykit install --domain deploy.example.com --email tu@example.com
```

Y justo después:

- **Crea la cuenta de admin inmediatamente.** Si no pasaste un email y una contraseña de admin al instalador, el panel muestra un formulario de registro, y **la primera persona que se registra se convierte en admin**. No dejes una instalación recién hecha con ese formulario abierto a internet. Regístrate en cuanto resuelva el dominio.
- **Usa una contraseña larga y única** e invita a tu equipo con el rol más bajo que necesite: Viewer, Operator o Admin. Consulta [usuarios y roles](/es/docs/users-rbac).
- **Haz copia de `/opt/deploykit/.env`.** El instalador guarda ahí todos los secretos con permisos `600`, incluida la clave de cifrado de las variables de entorno de tus apps. Si pierdes esa clave, las variables guardadas no se pueden descifrar. Guarda una copia en tu gestor de contraseñas.
- **Saca las copias de seguridad del servidor.** Las copias de las bases de datos y de los juegos van a `/var/backups/deploykit`. Una copia en el mismo disco no sobrevive a perder el servidor, así que sincroniza esa carpeta con otro sitio.
- **Deja `TRUST_PROXY=false`** salvo que todas las peticiones lleguen a DeployKit a través de un proxy que controles y que defina `X-Forwarded-For`. Si no, un cliente podría falsear su IP en los límites de peticiones y en el log de auditoría.
- **Trata el acceso a Docker como acceso root.** Quien esté en el grupo `docker`, o tenga el rol Admin en DeployKit, puede controlar el host. Mantén esa lista corta y revisa el [log de auditoría](/es/docs/audit-logs) de vez en cuando.

## La checklist

1. Sistema actualizado y actualizaciones de seguridad automáticas activadas.
2. Usuario con sudo distinto de root y con clave SSH.
3. SSH sin contraseñas ni login de root, y configuración validada con `sshd -t`.
4. Firewall del proveedor que solo permite el 22 (desde tu IP), el 80 y el 443, y los puertos de juegos si hacen falta.
5. Ningún puerto de contenedor publicado sin necesidad. Recuerda que ufw no los cubre.
6. fail2ban vigilando SSH.
7. Reloj sincronizado, swap en servidores pequeños y rotación de logs de Docker configurada.
8. Cuenta de admin creada justo después de instalar, `.env` respaldado y copias de seguridad fuera del servidor.

Nada de esto es exclusivo de DeployKit, y merece la pena hacerlo en cualquier servidor expuesto a internet. Cuando lo tengas, sigue la [guía de instalación](/es/docs/installation) y la [guía rápida](/es/docs/quickstart) para desplegar tu primera app.
