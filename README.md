# Coworkspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Tu monorepo Nx para Coworkspace está listo para usar ✨

---

## 🚀 Primeros pasos

1. Clona el repositorio.
2. Copia el archivo `.env.example` y crea uno nuevo `.env` en la raíz:

```bash
cp .env.example .env
```


## ## Instala las dependencias del monorepo:

```sh
yarn install
```


## Levanta la base de datos MySQL usando Docker:

```sh
docker compose up -d
```

## ##  📦 Comandos de desarrollo

🔧 Backend (NestJS)

## Levantar la API:

```sh
nx serve api
```

## Ejecutar los tests de la API:


```sh
nx test api
```

## Build de la API:


```sh
nx build api
```


## ## 💻 Frontend (Next.js)

## Levantar el frontend:

```
nx dev web
```
## Ejecutar pruebas E2E (Playwright):

```
yarn nx run @coworkspace/web-e2e:e2e

```

## Build del frontend:

```
nx build web

```

🧪 Tests E2E y Unitarios

API usa Jest con base de datos real definida en .env.test.

Frontend tiene pruebas E2E con Playwright + MSW mock server.
