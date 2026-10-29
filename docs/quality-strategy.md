# estrategia de testing

## niveles

1. typecheck y lint detectan errores estructurales antes de ejecutar la aplicación.
2. build comprueba que la aplicación puede empaquetarse para producción.
3. tests unitarios cubren reglas pequeñas y la reproducibilidad de fixtures.
4. tests e2e recorren flujos visibles con Playwright y selectores accesibles.
5. revisión manual cubre teclado, viewport de 320 px, estados vacíos y evidencias visuales.

## criterios de los casos

cada caso debe indicar intención, precondiciones, pasos, datos, resultado esperado y relación con una incidencia. los selectores deben preferir roles, labels y texto visible. no se usan esperas fijas para sincronizar flujos.

## fallos conocidos

las reproducciones de defectos abiertos usan `test.fail`. así la suite confirma que el defecto sigue presente sin convertir una incidencia conocida en ruido de ci. al corregir un defecto, se elimina `test.fail`, se conserva el caso y se actualiza el catálogo.

## evidencias

Playwright conserva trace, screenshot y vídeo cuando un test falla. GitHub Actions publica `playwright-report/` y `test-results/` como artefactos si la ejecución falla.

## datos

fixtures TypeScript locales. no dependen de red, reloj, usuario real ni base de datos. cada test navega a un estado inicial controlado.
## lectura educativa de una incidencia

cada ficha del catálogo debe permitir recorrer el mismo ciclo:

1. detectar el comportamiento con pasos reproducibles.
2. documentar contexto, datos, esperado, actual y evidencias.
3. automatizar la regresión con localizadores accesibles y estados observables.
4. relacionar el ejemplo visible con el archivo real de Playwright.

los casos intencionadamente defectuosos usan `test.fail` mientras la incidencia está abierta. los casos propuestos muestran el patrón esperado y quedan identificados para no confundir cobertura existente con trabajo pendiente.

