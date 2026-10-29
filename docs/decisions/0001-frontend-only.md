# decisión 0001: primera fase frontend-only

## contexto

el objetivo inicial es enseñar exploración, documentación y automatización de una aplicación pública. añadir api y PostgreSQL desde el primer commit introduciría configuración, migraciones y dependencias que no son necesarias para demostrar esos flujos.

## decisión

usar React, TypeScript, Vite, fixtures locales y una capa de componentes sencilla. dejar backend y PostgreSQL para una fase posterior, solo si se necesita demostrar validación de servidor o persistencia real.

## consecuencias

- instalación rápida y reproducible.
- sin secretos ni servicios externos.
- permisos, carga y errores de red se simulan en la interfaz.
- no se demuestra todavía un contrato HTTP ni una validación de servidor.
