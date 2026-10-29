# decisión 0002: api pequeña con almacenamiento intercambiable

## estado

aceptada

## contexto

el laboratorio necesita mostrar validación de servidor, autorización y consultas PostgreSQL sin convertir el proyecto en un producto con autenticación, despliegue o migraciones complejas.

## decisión

usar el módulo `node:http` para una api REST pequeña, `zod` para validar entradas en el borde y `pg` para PostgreSQL. mantener un almacén en memoria como valor por defecto y activar PostgreSQL solo cuando existe `DATABASE_URL`.

## consecuencias

- `npm run api` funciona sin Docker.
- la misma api puede probarse con PostgreSQL local.
- las consultas PostgreSQL usan parámetros, no interpolación.
- no hay persistencia entre reinicios en modo memoria.
- la api no pretende ser autenticación real ni un backend de producción.
