# api del laboratorio

la api es una superficie educativa para practicar validación, permisos simulados, errores HTTP y persistencia.

## ejecución en memoria

```bash
npm run api
```

usa `http://127.0.0.1:3001` y no requiere servicios externos.

## ejecución con PostgreSQL

```bash
docker compose up -d postgres
$env:DATABASE_URL = 'postgresql://bugforge:bugforge_local_only@localhost:5432/bugforge'
npm run api
```

en bash, usa `export DATABASE_URL=...`. los datos iniciales se cargan desde `db/schema.sql` y `db/seed.sql` la primera vez que se crea el volumen.

## contrato

`GET /api/health` devuelve estado y almacenamiento activo.

`GET /api/incidents?status=open` devuelve `{ "data": [...] }`.

`POST /api/incidents` requiere el header `x-test-role: admin` o `x-test-role: analyst` y un cuerpo como:

```json
{"title":"el botón no conserva el estado","severity":"high"}
```

respuestas relevantes:

- `201`: incidencia creada.
- `400`: json inválido.
- `403`: rol sin permiso.
- `409`: título duplicado.
- `413`: cuerpo demasiado grande.
- `422`: datos inválidos.
- `500`: error interno sin detalles de implementación.

no hay autenticación real. `x-test-role` solo simula el contexto de permisos para el laboratorio.
