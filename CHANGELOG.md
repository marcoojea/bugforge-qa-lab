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

### 2026-10-29 — base del repositorio

- creado repositorio local `bugforge-qa-lab`.
- añadido `README.md` con objetivo, alcance, arquitectura mínima, invariantes y fases.
- añadido catálogo inicial de producto y cambios.
- definido enfoque frontend-only con datos deterministas para la primera fase.

## decisiones pendientes

- licencia pública.
- nombre y configuración del repositorio remoto.
- decisión futura sobre api y postgresql, si el laboratorio necesita demostrar validación de servidor.

## cómo actualizar este archivo

añadir una entrada por fase completada. describir qué hace el producto, qué cambió, qué comprobaciones pasaron y qué limitaciones quedan. no usar este archivo como lista de commits automática.
