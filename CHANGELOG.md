# producto y cambios

## qué hace el producto

bugforge-qa-lab es un laboratorio público para practicar testing manual, automatización con playwright y desarrollo web con criterio de calidad. la aplicación simula un pequeño sistema de gestión con usuarios, incidencias, casos de prueba y resultados.

su valor no está en tener muchas funcionalidades, sino en hacer visibles los flujos, los riesgos, las evidencias y la relación entre una incidencia y su prueba.

## registro de cambios

### 2026-10-29 — primera aplicación ejecutable

- añadido proyecto React + TypeScript + Vite.
- añadido navegación pública para inicio, catálogo, casos y resultados.
- añadido aplicación bajo prueba con resumen, incidencias, usuarios y formulario de alta.
- añadido fixtures locales deterministas.
- habilitados scripts de lint, typecheck, build y test.
- verificados `npm run typecheck`, `npm run lint` y `npm run build`.

### 2026-10-29 — catálogo de calidad

- añadido catálogo público con cinco incidencias reproducibles.
- añadido catálogo de casos de prueba esperados.
- documentados instalación, ejecución y comprobaciones locales.

### 2026-10-29 — primera automatización

- añadido `playwright.config.ts` con Chromium, servidor Vite y evidencias de fallo.
- añadidos flujos e2e de navegación y alta válida.
- añadidas reproducciones automatizadas para BUG-101, BUG-102 y BUG-103.
- añadido workflow de GitHub Actions para lint, typecheck, build y e2e.

### 2026-10-29 — estrategia y decisiones

- añadido prueba unitaria de reproducibilidad de fixtures.
- documentada estrategia de testing y política para fallos conocidos.
- documentada decisión de comenzar frontend-only y sus limitaciones.

### 2026-10-29 — publicación

- creado repositorio público `marcoojea/bugforge-qa-lab`.
- conectado el remoto `origin` y subida la rama `main`.
- verificada la presencia de `README.md` en GitHub.

### 2026-10-29 — api y PostgreSQL

- añadido servidor REST educativo con validación `zod`, errores estructurados y permisos simulados.
- añadido almacenamiento en memoria y PostgreSQL opcional con `docker compose`.
- añadido contrato, semillas, documentación y tests de api.
- añadida licencia MIT.

### 2026-10-29 — protección del repositorio

- activado ruleset `protect-main` sobre la rama `main`.
- requerido pull request y comprobación `quality` antes de integrar cambios.
- bloqueado force push y borrado de la rama principal.

### 2026-10-29 — base del repositorio

- creado repositorio local `bugforge-qa-lab`.
- añadido `README.md` con objetivo, alcance, arquitectura mínima, invariantes y fases.
- añadido catálogo inicial de producto y cambios.
- definido enfoque frontend-only con datos deterministas para la primera fase.

## decisiones pendientes

- activar protección de `main` cuando haya colaboradores.
- decidir si la interfaz debe consumir la api por defecto o mantener fixtures para enseñar ambos enfoques.

## cómo actualizar este archivo

añadir una entrada por fase completada. describir qué hace el producto, qué cambió, qué comprobaciones pasaron y qué limitaciones quedan. no usar este archivo como lista de commits automática.
