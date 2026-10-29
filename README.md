# bugforge-qa-lab

laboratorio público de qa y desarrollo web. contiene una aplicación educativa con fallos intencionados, un catálogo de incidencias y automatización e2e con playwright.

## objetivo

demostrar criterio profesional de testing: explorar una aplicación, detectar problemas, documentar evidencias, convertir casos en pruebas automatizadas y explicar los límites de cada comprobación.

## alcance inicial

- aplicación react + typescript con varias páginas y formularios.
- flujos de usuarios, incidencias, casos de prueba y panel de resultados.
- datos locales deterministas, sin autenticación real, pagos ni despliegue complejo.
- fallos intencionados de validación, usabilidad, navegación, accesibilidad, estados, responsive y permisos simulados.
- catálogo de calidad con gravedad, reproducción, esperado, actual y estado.
- tests e2e con playwright, fixtures reutilizables, trazas, capturas y vídeo cuando proceda.
- lint, typecheck, build y ejecución en github actions.

## arquitectura mínima

el laboratorio empezará como una aplicación frontend-only:

- react + typescript + vite para la interfaz.
- react router para navegación.
- fixtures tipadas para usuarios, incidencias, casos y resultados.
- servicios locales pequeños para centralizar lectura y mutaciones de datos.
- playwright para pruebas de navegador.
- github actions para instalar, validar, construir y ejecutar e2e.

no se añadirá backend ni postgresql en la primera fase. no aporta suficiente valor al objetivo inicial y haría más difícil la ejecución pública. si una segunda fase necesita demostrar validación de servidor, se añadirá una api pequeña con contratos claros y postgresql reproducible.

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
tests/
  e2e/
  fixtures/
docs/
  incidents/
  decisions/
```

la primera slice ya incluye la navegación pública, la aplicación bajo prueba, fixtures de usuarios e incidencias y un formulario de creación local.

## documentación

- [producto y cambios](CHANGELOG.md)
- objetivo y alcance: este documento.
- arquitectura: este documento y las decisiones técnicas que se añadan.
- guía de instalación y ejecución: se completará al crear el primer slice ejecutable.
- catálogo de incidencias: `docs/incidents/` y sección visible en la aplicación.
- estrategia de testing: se documentará junto con los primeros tests.
- limitaciones y mejoras futuras: se mantendrán aquí y en `CHANGELOG.md`.

## fases

1. preparar proyecto y aplicación mínima.
2. comprobar ejecución, lint, typecheck y build.
3. añadir fallos intencionados y catálogo de incidencias.
4. crear tests de playwright por funcionalidad.
5. añadir evidencias, documentación completa y github actions.
6. revisar accesibilidad, responsive y estabilidad de los tests.

cada fase debe dejar el repositorio en un estado comprobable antes de iniciar la siguiente.

## estado actual

repositorio creado. aplicación mínima ejecutable preparada. catálogo de fallos y automatización e2e pendientes.

## licencia

pendiente de decidir antes de publicar.
