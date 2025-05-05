# Products Microservice

## Dev

1. Clonar Repositorio
2. Instalar dependencias `npm i`
3. Crear archivo `.env` con base en el archivo `.env.template`
4. Ejecutar migracion de prisma usando `npx prisma migrate dev --name dev`
5. Ejecutar `npm run start:dev`

## Iniciar Data en Base de datos

1. Abrir un administrador de base de datos (e.g. DBeaver)
2. Usar el archivo `/prisma/backup/products-ms.sql` para agregar data a la tabla.


## Build de Producción

Construir imagen de docker con el tag `:prod` y utilizando el `Dockerfile.prod`
ejemplo:
```
docker build -f Dockerfile.prod -t products-ms:prod .
```