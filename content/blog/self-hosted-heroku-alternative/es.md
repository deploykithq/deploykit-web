---
title: "Una alternativa autoalojada a Heroku: despliega con git push en tu propio VPS"
description: "Cómo conseguir la experiencia de git push de Heroku y Vercel en un servidor que controlas, con builds automáticos, SSL y bases de datos, y sin pagar por cada app."
slug: alternativa-heroku-autoalojada
date: 2026-10-15
tags: [autoalojamiento, heroku, docker, tutorial]
author: Equipo de DeployKit
---

Plataformas como Heroku y Vercel popularizaron una idea: **haces push a git y tu app está en línea**. El precio es que alquilas esa comodidad por app, por usuario y por gigabyte, en una infraestructura que no controlas.

Un PaaS autoalojado te da el mismo flujo de trabajo en un servidor tuyo. En este artículo vemos qué significa eso en la práctica y cómo montarlo con [DeployKit](/es/docs).

## ¿Por qué autoalojar tus despliegues?

- **Coste predecible.** Un solo VPS ejecuta muchas apps y bases de datos. La factura no crece con cada servicio nuevo.
- **Sin dependencia del proveedor.** Por debajo solo hay Docker, Compose y Traefik. Si desinstalas la plataforma, tus contenedores siguen funcionando.
- **Tus datos siguen siendo tuyos.** Bases de datos, logs y variables de entorno viven en tus propios discos.

## Qué necesitas

- Un VPS Linux con IP pública (con 2 GB de RAM vas sobrado para empezar).
- Un dominio cuyo DNS puedas editar.
- Node.js 20+ en el servidor, solo para ejecutar el instalador.

## 1. Instala DeployKit en el servidor

Conéctate al servidor por SSH y ejecuta el instalador:

```bash
npm i -g @deploykit/cli && deploykit install
```

El instalador monta el panel detrás de Traefik, que emite automáticamente certificados de Let's Encrypt para cada dominio que añadas. La [guía de instalación](/es/docs/installation) explica los requisitos y las opciones en detalle.

## 2. Conecta un repositorio

Desde el panel, crea una aplicación y vincula un repositorio de GitHub o GitLab. DeployKit registra el webhook por ti, así que cada push a la rama elegida lanza un despliegue.

No necesitas un Dockerfile: Nixpacks detecta Node.js, Python, Go, Ruby, Rust y más, y construye la imagen. Si ya tienes un `Dockerfile`, DeployKit lo usa.

## 3. Haz push para desplegar

```bash
git push origin main
```

DeployKit detecta el stack, construye la imagen, arranca el contenedor y enruta tu dominio hacia él con HTTPS. Los logs de build y de ejecución se ven en directo en el panel, y si una versión sale mal puedes volver a cualquier despliegue anterior con un clic.

## 4. Añade una base de datos

PostgreSQL, MySQL, MariaDB, MongoDB y Redis están a un clic, con backups programados y restauración con un clic. Las cadenas de conexión llegan a tu app como variables de entorno, cifradas en reposo.

## Heroku frente a un PaaS autoalojado

| | PaaS tipo Heroku | Autoalojado con DeployKit |
| --- | --- | --- |
| Modelo de coste | Por app / dyno | Tu servidor, todas las apps que quieras |
| Dónde viven los datos | En el proveedor | En tus propios discos |
| Dependencia | Específica de la plataforma | Docker estándar por debajo |
| Despliegue con git push | Sí | Sí |

## Siguientes pasos

Lee el [inicio rápido](/es/docs/quickstart) para desplegar tu primera app, o recorre la [documentación completa](/es/docs) para descubrir los despliegues de preview, las tareas programadas y las configuraciones con varios servidores.
