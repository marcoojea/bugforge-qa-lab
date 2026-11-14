# bugforge-qa-lab

> **EN:** Public QA and web development lab. It contains an educational React and TypeScript app with intentional bugs, a documented bug catalog and Playwright E2E tests. It shows how to explore an application, document defects with evidence, turn them into automated tests and state the limits of each check. Runs locally; PostgreSQL is optional.

Laboratorio público de QA y desarrollo web. Contiene una aplicación educativa con fallos intencionados, un catálogo de incidencias y automatización E2E con Playwright.

## Objetivo

Demostrar criterio profesional de testing: explorar una aplicación, detectar problemas, documentar evidencias, convertir casos en pruebas automatizadas y explicar los límites de cada comprobación.

## Alcance inicial

- Aplicación React + TypeScript con varias páginas y formularios.
- API Node con validación de servidor, permisos simulados y almacenamiento en memoria o PostgreSQL.
- Flujos de usuarios, incidencias, casos de prueba y panel de resultados.
- Datos locales deterministas, sin autenticación real, pagos ni despliegue complejo.
- Fallos intencionados de validación, usabilidad, navegación, accesibilidad, estados, responsive y permisos simulados.
- Catálogo de calidad con gravedad, reproducción, esperado, actual y estado.
- Tests E2E con Playwright, fixtures reutilizables, trazas, capturas y vídeo cuando proceda.
- Lint, typecheck, build y ejecución en GitHub Actions.

## Arquitectura mínima

El laboratorio usa una interfaz frontend y una API educativa opcional:

- React + TypeScript + Vite para la interfaz.
- React Router para navegación.
- Fixtures tipadas para usuarios, incidencias, casos y resultados.
- Servicios locales pequeños para centralizar lectura y mutaciones de datos.
- Playwright para pruebas de navegador.
- GitHub Actions para instalar, validar, construir y ejecutar E2E.
- `node:http`, `zod` y `pg` para el contrato de API.

La API funciona en memoria por defecto. PostgreSQL se activa con `DATABASE_URL` y se puede iniciar con `docker compose`.

## Comportamiento e invariantes

- Cada flujo importante debe tener una ruta estable y un nombre accesible.
- Datos de prueba deben poder reiniciarse y producir siempre el mismo estado inicial.
- Cada incidencia debe enlazar con una pantalla, pasos de reproducción, resultado esperado y resultado actual.
- Los fallos intencionados deben estar aislados, explicados y no impedir explorar el resto del laboratorio.
- Tests deben esperar estados observables, no tiempos arbitrarios.
- Formularios deben conservar etiquetas, foco y mensajes asociados incluso cuando contengan errores intencionados.
- Vistas deben funcionar con teclado y en tamaños móviles representativos.
- Resultados E2E fallidos deben conservar evidencia útil.

## Estructura actual y prevista

```text
src/
  app/
  components/
  data/
  features/
  services/
  styles/
server/
  index.ts
  store.ts
  validation.ts
db/
  schema.sql
  seed.sql
tests/
  e2e/
  fixtures/
docs/
  incidents/
  decisions/
```

La primera slice ya incluye la navegación pública, la aplicación bajo prueba, fixtures de usuarios e incidencias y un formulario de creación local.

## Instalación y ejecución

```bash
npm install
npm run dev
npm run api
```

Para PostgreSQL: `docker compose up -d postgres` y consulta [docs/api.md](docs/api.md).

Comprobaciones locales:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run test:api
```

Los tests E2E usan Chromium y levantan Vite automáticamente. La suite separa flujos correctos de fallos conocidos; estos últimos usan `test.fail` y deben seguir fallando mientras la incidencia siga abierta.

## Estrategia de testing

La estrategia completa está en [docs/quality-strategy.md](docs/quality-strategy.md). Combina lint, typecheck, build, pruebas unitarias de fixtures, E2E con Playwright y revisión manual de teclado y responsive.

## Cómo usar el laboratorio como libro de bugs

Entra en `incidencias` y abre la ficha de cualquier bug. Cada ficha sigue el mismo recorrido:

1. Detectar: pasos manuales y señales que confirman el problema.
2. Documentar: qué datos, evidencias y contexto debe incluir un buen reporte.
3. Automatizar: código Playwright, archivo de referencia y estado del test.

El botón `reproducir en la aplicación` lleva al flujo bajo prueba. Los ejemplos marcados como `automatizado` están cubiertos por la suite actual; los marcados como `propuesto` enseñan el siguiente caso que debería incorporarse.

La interfaz usa una identidad visual dark arcade: azul marino como base, acentos cyan/lima/rosa para estados y una cuadrícula responsive para escanear el catálogo como un panel técnico.

La sección `acceso demo` contiene un login, recuperación de contraseña y cierre de sesión simulados. No hay autenticación real ni credenciales externas: se usan para practicar casos básicos de validación, sesión, permisos, mensajes de error, estados de carga y navegación.

## Decisiones técnicas

La primera decisión arquitectónica está documentada en [docs/decisions/0001-frontend-only.md](docs/decisions/0001-frontend-only.md). Se prioriza ejecución local simple sobre introducir backend antes de necesitarlo.

La API y PostgreSQL están documentados en [docs/decisions/0002-api-and-postgresql.md](docs/decisions/0002-api-and-postgresql.md) y [docs/api.md](docs/api.md).

## Limitaciones conocidas

- La interfaz usa fixtures locales; la API persiste solo cuando se activa PostgreSQL.
- Los permisos son simulados; no hay autenticación real.
- La aplicación contiene defectos intencionados y no representa un producto listo para producción.
- El repositorio es público y está publicado en GitHub.
- `main` está protegido con el ruleset `protect-main` y el job `quality`.

## Mejoras futuras

- Completar todas las reproducciones E2E del catálogo.
- Añadir estados de carga, error y lista vacía más variados.
- Mantener actualizado el ruleset `protect-main` si cambia el workflow de CI.

## Documentación

- [Producto y cambios](CHANGELOG.md)
- Objetivo y alcance: este documento.
- Arquitectura: este documento y las decisiones técnicas que se añadan.
- Guía de instalación y ejecución: sección de instalación y scripts de `package.json`.
- Catálogo de incidencias: `src/data/qualityCatalog.ts` y sección visible en la aplicación.
- Estrategia de testing: [docs/quality-strategy.md](docs/quality-strategy.md).
- Limitaciones y mejoras futuras: se mantendrán aquí y en `CHANGELOG.md`.

## Fases

1. Preparar proyecto y aplicación mínima: completado.
2. Comprobar ejecución, lint, typecheck y build: completado.
3. Añadir fallos intencionados y catálogo de incidencias: completado.
4. Crear tests de Playwright por funcionalidad: completado.
5. Añadir evidencias, documentación completa y GitHub Actions: completado.
6. Revisar accesibilidad, responsive y estabilidad de los tests: en mejora continua.
7. Añadir API con validación y PostgreSQL reproducible: completado.

Cada fase debe dejar el repositorio en un estado comprobable antes de iniciar la siguiente.

## Estado actual

Repositorio público creado. Aplicación mínima ejecutable, catálogo, automatización y CI preparados.

## Licencia

Licencia MIT. Consulta [LICENSE](LICENSE).
