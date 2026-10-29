# bugforge-qa-lab

laboratorio público de qa y desarrollo web. contiene una aplicación educativa con fallos intencionados, un catálogo de incidencias y automatización e2e con playwright.

## objetivo

demostrar criterio profesional de testing: explorar una aplicación, detectar problemas, documentar evidencias, convertir casos en pruebas automatizadas y explicar los límites de cada comprobación.

## alcance inicial

- aplicación react + typescript con varias páginas y formularios.
- api node con validación de servidor, permisos simulados y almacenamiento en memoria o PostgreSQL.
- flujos de usuarios, incidencias, casos de prueba y panel de resultados.
- datos locales deterministas, sin autenticación real, pagos ni despliegue complejo.
- fallos intencionados de validación, usabilidad, navegación, accesibilidad, estados, responsive y permisos simulados.
- catálogo de calidad con gravedad, reproducción, esperado, actual y estado.
- tests e2e con playwright, fixtures reutilizables, trazas, capturas y vídeo cuando proceda.
- lint, typecheck, build y ejecución en github actions.

## arquitectura mínima

el laboratorio usa una interfaz frontend y una api educativa opcional:

- react + typescript + vite para la interfaz.
- react router para navegación.
- fixtures tipadas para usuarios, incidencias, casos y resultados.
- servicios locales pequeños para centralizar lectura y mutaciones de datos.
- playwright para pruebas de navegador.
- github actions para instalar, validar, construir y ejecutar e2e.
- `node:http`, `zod` y `pg` para el contrato de api.

la api funciona en memoria por defecto. PostgreSQL se activa con `DATABASE_URL` y se puede iniciar con `docker compose`.

## comportamiento e invariantes

- cada flujo importante debe tener una ruta estable y un nombre accesible.
- datos de prueba deben poder reiniciarse y producir siempre el mismo estado inicial.
- cada incidencia debe enlazar con una pantalla, pasos de reproducción, resultado esperado y resultado actual.
- los fallos intencionados deben estar aislados, explicados y no impedir explorar el resto del laboratorio.
- tests deben esperar estados observables, no tiempos arbitrarios.
- formularios deben conservar etiquetas, foco y mensajes asociados incluso cuando contengan errores intencionados.
- vistas deben funcionar con teclado y en tamaños móviles representativos.
- resultados e2e fallidos deben conservar evidencia útil.

## estructura actual y prevista

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

la primera slice ya incluye la navegación pública, la aplicación bajo prueba, fixtures de usuarios e incidencias y un formulario de creación local.

## instalación y ejecución

```bash
npm install
npm run dev
npm run api
```

para PostgreSQL: `docker compose up -d postgres` y consulta [docs/api.md](docs/api.md).

comprobaciones locales:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run test:api
```

los tests e2e usan Chromium y levantan Vite automáticamente. la suite separa flujos correctos de fallos conocidos; estos últimos usan `test.fail` y deben seguir fallando mientras la incidencia siga abierta.

## estrategia de testing

la estrategia completa está en [docs/quality-strategy.md](docs/quality-strategy.md). combina lint, typecheck, build, pruebas unitarias de fixtures, e2e con Playwright y revisión manual de teclado y responsive.

## decisiones técnicas

la primera decisión arquitectónica está documentada en [docs/decisions/0001-frontend-only.md](docs/decisions/0001-frontend-only.md). se prioriza ejecución local simple sobre introducir backend antes de necesitarlo.

la api y PostgreSQL están documentados en [docs/decisions/0002-api-and-postgresql.md](docs/decisions/0002-api-and-postgresql.md) y [docs/api.md](docs/api.md).

## limitaciones conocidas

- la interfaz usa fixtures locales; la api persiste solo cuando se activa PostgreSQL.
- los permisos son simulados; no hay autenticación real.
- la aplicación contiene defectos intencionados y no representa un producto listo para producción.
- el repositorio es público y está publicado en GitHub.

## mejoras futuras

- completar todas las reproducciones e2e del catálogo.
- añadir estados de carga, error y lista vacía más variados.
- proteger `main` con las comprobaciones de ci cuando el repositorio tenga colaboradores.

## documentación

- [producto y cambios](CHANGELOG.md)
- objetivo y alcance: este documento.
- arquitectura: este documento y las decisiones técnicas que se añadan.
- guía de instalación y ejecución: sección de instalación y scripts de `package.json`.
- catálogo de incidencias: `src/data/qualityCatalog.ts` y sección visible en la aplicación.
- estrategia de testing: [docs/quality-strategy.md](docs/quality-strategy.md).
- limitaciones y mejoras futuras: se mantendrán aquí y en `CHANGELOG.md`.

## fases

1. preparar proyecto y aplicación mínima: completado.
2. comprobar ejecución, lint, typecheck y build: completado.
3. añadir fallos intencionados y catálogo de incidencias: completado.
4. crear tests de playwright por funcionalidad: completado.
5. añadir evidencias, documentación completa y github actions: completado.
6. revisar accesibilidad, responsive y estabilidad de los tests: en mejora continua.
7. añadir api con validación y PostgreSQL reproducible: completado.

cada fase debe dejar el repositorio en un estado comprobable antes de iniciar la siguiente.

## estado actual

repositorio público creado. aplicación mínima ejecutable, catálogo, automatización y ci preparados.

## licencia

licencia MIT. consulta [LICENSE](LICENSE).
