---
title: "Nixpacks vs Dockerfile vs Buildpacks: qué método de build elegir en DeployKit"
description: "DeployKit puede construir tu app de tres formas. Cómo funciona cada una, en qué destaca, dónde falla y una regla sencilla para elegir la adecuada."
slug: nixpacks-vs-dockerfile-vs-buildpacks
date: 2026-10-15
tags: [docker, nixpacks, buildpacks, dockerfile, guía]
author: Equipo de DeployKit
---

Cada app de DeployKit se convierte en una imagen de Docker antes de ejecutarse. Cómo se construye esa imagen lo decides tú, con el **tipo de build** de la app:

- **Nixpacks** (por defecto): detecta tu stack y construye la imagen sin configuración.
- **Dockerfile**: usa tu propio Dockerfile, o genera uno si el repositorio no lo tiene.
- **Buildpacks**: Cloud Native Buildpacks, la forma de construir apps de Heroku.

Los tres producen una imagen normal que después se ejecuta igual. La diferencia está en cuánto tienes que escribir, cuánto control tienes y qué pasa cuando la detección se equivoca.

## Nixpacks: cero configuración

[Nixpacks](https://nixpacks.com) analiza tu repositorio, deduce el lenguaje y el framework (Node.js, Python, Go, Ruby, Rust, PHP, Java y más), instala las herramientas necesarias y construye una imagen. Haces push y funciona, siempre que tu proyecto siga las convenciones habituales.

**Lo que añade DeployKit:**

- **Start Command.** Si Nixpacks elige mal el comando de arranque de tu app, define el tuyo en la configuración de la app. Se le pasa a Nixpacks como comando de arranque y solo se aplica a este tipo de build.
- **Fallback automático.** Si Nixpacks falla, o no está instalado en el servidor, DeployKit no se rinde: pasa a la estrategia Dockerfile, usando tu `Dockerfile` si existe o generando uno si no. El log del build indica cuándo ocurre.
- **Un límite de 10 minutos.** Un build de Nixpacks que tarde más se detiene.

**Dónde falla:**

- **Arranques de varios pasos.** La detección puede elegir `node index.js` cuando necesitas `prisma migrate deploy && node dist/index.js`. Pon la cadena completa en tu script `start` o en Start Command.
- **Cualquier cosa poco habitual.** Librerías del sistema, una estructura no estándar o un paso de build que Nixpacks no conoce. Puedes describirlos en un `nixpacks.toml` en la raíz del repositorio, pero llegados a ese punto un Dockerfile suele ser más claro.
- **Su futuro.** Railway, que creó Nixpacks, ahora se centra en su sucesor, Railpack, y Nixpacks apenas recibe desarrollo nuevo. Funciona bien con lo que ya soporta, pero no esperes que se mantenga al día con cada framework nuevo.

Para ver qué va a detectar Nixpacks antes de desplegar, ejecuta `nixpacks plan .` en local.

## Dockerfile: control total

Con un Dockerfile, el build hace exactamente lo que escribiste: imagen base, paquetes del sistema, pasos de build, usuario y comando de arranque. No se adivina nada. Por eso es nuestra recomendación para todo lo que importe en producción.

**Qué consigues:**

- **Builds reproducibles.** El mismo Dockerfile da la misma imagen en tu portátil, en CI y en el servidor.
- **Imágenes pequeñas.** Un build multi-stage solo incluye el resultado compilado y las dependencias de producción.
- **Buena caché.** Copia el lockfile e instala las dependencias antes de copiar el código, y Docker reutiliza esa capa hasta que cambien tus dependencias.
- **Servidores remotos.** Las apps desplegadas en un [servidor remoto](/es/docs/servers) se construyen allí con el Dockerfile del repositorio. Nixpacks, Buildpacks y la generación de Dockerfile solo funcionan en el servidor local, así que para desplegar en remoto el Dockerfile es obligatorio.

**¿Aún no tienes Dockerfile? DeployKit escribe uno.** Si el tipo de build es Dockerfile y no existe ninguno en la ruta configurada, DeployKit detecta el stack y lo genera:

| Detecta | Imagen generada | Puerto por defecto |
| --- | --- | --- |
| `go.mod` | Binario estático de Go sobre Alpine | 8080 |
| `requirements.txt` / `pyproject.toml` | Python 3.12 ejecutando `uvicorn main:app` | 8000 |
| Next.js | Servidor standalone (`output: "standalone"`) | 3000 |
| Vite, CRA, Vue, Angular, Svelte | Build estático servido por nginx | 80 |
| Cualquier otro servidor Node.js | Ejecuta tu script `start` | 3000 |

Si configuras un puerto en la app, el Dockerfile generado usa ese en lugar del puerto por defecto. Toma el archivo generado como punto de partida: el de Python da por hecho una app FastAPI o Starlette en `main.py`, así que Django o Flask necesitan su propio Dockerfile. En un monorepo, detecta tu gestor de paquetes y construye el paquete junto con sus dependencias del workspace.

**Dónde falla:** casi siempre en los mismos sitios. La app escucha en `localhost`, el puerto no coincide o las variables de build no llegan al build. Nuestra [guía para un Dockerfile que funciona a la primera](/es/blog/dockerfile-que-funciona-a-la-primera) los repasa uno a uno.

## Buildpacks: a la manera de Heroku

Los Cloud Native Buildpacks convierten código fuente en una imagen siguiendo convenciones. DeployKit ejecuta `pack build` con el builder `heroku/builder:24`, así que si tu app funcionaba en Heroku, probablemente se construya aquí sin cambios.

**Qué consigues:**

- **Las convenciones de Heroku.** Un `Procfile` con un proceso `web:`, las versiones del lenguaje declaradas al estilo Heroku (`engines` en `package.json`, `.python-version`, la versión de Ruby en el `Gemfile`) y los archivos de dependencias habituales.
- **Una base mantenida.** El proyecto de buildpacks de Heroku mantiene al día el builder y su imagen de ejecución.

**Dónde falla:**

- **Sin fallback.** Si el build con buildpacks falla, falla el despliegue. No se pasa a otra estrategia.
- **El mismo límite de 10 minutos** que Nixpacks.
- **Imágenes más grandes** que con un Dockerfile multi-stage escrito a mano, y menos control sobre lo que llevan.
- **Solo en el servidor local**, como Nixpacks.

## Las variables de entorno funcionan igual en los tres

DeployKit nunca pasa tus variables de entorno como build args de Docker, porque quedarían legibles en los metadatos de la imagen. En su lugar, antes de cada build las escribe en un archivo `.env` en la raíz del contexto de build, y en ejecución las define como entorno del contenedor.

- **Nixpacks y Buildpacks** recogen el `.env` automáticamente. No tienes que hacer nada.
- **Tu propio Dockerfile** tiene que copiarlo a la etapa de build antes del paso de build (`COPY . .` lo hace) y no debe excluirlo en `.dockerignore`. Si no, variables como `VITE_*` o `NEXT_PUBLIC_*` faltan en el bundle sin que nada avise.

## Comparados uno a uno

| | Nixpacks | Dockerfile | Buildpacks |
| --- | --- | --- | --- |
| Configuración | Ninguna | Escribir uno, o dejar que DeployKit lo genere | Ninguna si sigues las convenciones |
| Control | Bajo (`nixpacks.toml`, Start Command) | Total | Bajo |
| Tamaño de imagen | Medio a grande | Tan pequeño como lo hagas | Grande |
| Si el build falla | Pasa a la estrategia Dockerfile | Falla el despliegue | Falla el despliegue |
| Servidores remotos | No | Sí | No |
| Comando de arranque | Detectado, o Start Command | Tu `CMD` | `Procfile` |
| Ideal para | Prototipos, apps estándar | Producción, monorepos, cualquier cosa a medida | Apps que vienen de Heroku |

## ¿Cuál elegir?

Una regla sencilla que sirve a la mayoría de equipos:

1. **¿Estás empezando, o es una app estándar?** Deja el valor por defecto, **Nixpacks**. Si construye y arranca bien, ya está.
2. **¿Vienes de Heroku con un `Procfile`?** Prueba primero **Buildpacks**. Es el camino más corto.
3. **¿Pasas a producción, despliegas en un servidor remoto o la detección se equivocó?** Cambia a **Dockerfile**. Parte del generado si te ayuda, súbelo al repositorio y a partir de ahí es tuyo.

Pasar de Nixpacks a un Dockerfile es un cambio pequeño: sube el Dockerfile al repositorio, pon el tipo de build en Dockerfile y la ruta en `Dockerfile` (sin `./` delante), y vuelve a desplegar. Si algo sale mal, puedes volver al despliegue anterior con un clic.

La [guía de aplicaciones](/es/docs/applications) documenta todas las opciones de build, incluido Root Directory para monorepos y el escaneo de vulnerabilidades opcional con Trivy.
