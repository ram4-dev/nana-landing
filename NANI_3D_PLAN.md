# Nani: propuesta para un personaje 3D controlable

## Objetivo

Conservar la apariencia de Nani y poder girar cabeza/cuello de forma continua, seguir
el mouse con ambos ojos y parpadear en cualquier ángulo. Esta propuesta no crea todavía
un modelo 3D: el build actual sigue siendo Rive con tres poses originales.

## Ruta propuesta

1. Crear un busto 3D usando la imagen frontal y las dos referencias de tres cuartos.
   Meshy permite una imagen principal y hasta tres vistas adicionales. Es una opción
   para obtener la geometría inicial; la fidelidad a Nani debe revisarse visualmente.
   [Multi-View de Meshy](https://help.meshy.ai/en/articles/12634481-how-to-use-multi-view).
2. Revisar y preparar el modelo en Blender: cara, pelo, moño, lentes y ropa. Verificar
   nariz, silueta, orejas y proporciones desde frente, ambos perfiles y atrás. No tenemos
   una referencia posterior confirmada; la parte posterior generada requerirá revisión.
3. Separar ojos y preparar un rig de cuello/cabeza, ojos orientables y cierre de párpados.
   El auto-rig corporal de Meshy no resuelve un rig facial complejo; su documentación
   indica exportar y preparar esos controles en Blender/Maya. Para este busto conviene
   un rig facial/cuello explícito, sin depender del auto-rig de cuerpo completo.
   [Límites del auto-rig](https://docs.meshy.ai/en/webapp/guides/3d-model/rigging).
4. Exportar GLB e integrarlo en la landing con Three.js. Su sistema permite huesos,
   morph targets y clips de animación; admite modelos exportados de Blender y cargados
   con GLTFLoader. [Sistema de animación](https://threejs.org/manual/pages/animation-system.html).

## Entrega mínima del modelo

| Parte | Requisito |
|---|---|
| Torso y cuello | Geometría con pesos que permita girar el cuello sin separar la camisa |
| Cabeza | Hueso de cabeza parentado al cuello y pivotes anatómicos |
| Ojos | Dos piezas independientes, con iris/pupilas y centros de rotación correctos |
| Párpados | Morph targets exportados para cierre de cada ojo |
| Lentes, pelo y moño | Piezas fijadas a la cabeza; revisar penetraciones y caras ocultas |
| Texturas | Materiales/UV coherentes desde todos los ángulos; ojos no pintados en la cara |
| Archivo | GLB con huesos de deformación y morph targets; no depender de constraints de Blender en runtime |

Nombres propuestos para integración: `Neck`, `Head`, `EyeLeft`, `EyeRight`,
`BlinkLeft` y `BlinkRight`. Son parte del contrato futuro, no nombres presentes en el repo.

## Control en la web

- Un objetivo común de mirada derivado del mouse.
- Ojos con respuesta rápida; cuello/cabeza con respuesta más lenta y límites anatómicos.
- Interpolación de rotaciones con quaternions, conservando la geometría de cada ángulo.
- Respiración e idle aplicados junto al seguimiento, sin que un clip sobrescriba la mirada.
- Párpados cerrados mediante morph targets, independientes del giro de cabeza.

## Verificación antes de integrar

- Comparar frente, tres cuartos y perfiles con las imágenes originales.
- Inspeccionar parte posterior y revisar la identidad del personaje antes del rig final.
- Mover el mouse horizontal y verticalmente: ambos ojos siguen en todas las poses.
- Girar lentamente: cuello unido a torso, lentes unidos a cabeza y sin penetraciones.
- Parpadear en ambos perfiles; comprobar cierre completo y reapertura.
- Ejecutar en navegador real y comprobar rendimiento, carga de GLB y reduced motion.

## Estado de las herramientas

En esta revisión no apareció Blender en `/Applications` ni en las aplicaciones del usuario.
No hay un conector 3D/Meshy disponible entre las herramientas de esta sesión. La
investigación no subió imágenes, consumió créditos ni produjo un GLB. La creación del
modelo requiere preparar Blender o disponer de acceso a un generador/modelo externo.

## Alternativa en 2D

Un personaje dibujado por capas en Rive puede controlar ojos, párpados y cuello, con
vistas diseñadas para determinados ángulos. Para cubrir ángulos arbitrarios con volumen
consistente, la recomendación de esta propuesta es el modelo 3D. Las tres imágenes
actuales conservan una transición breve de opacidad; ampliar su duración por sí solo
prolongaría la superposición visible.


## Primera prueba local implementada

`3d/` contiene un busto procedural Three.js para evaluar giro continuo y rig de ojos/párpados.
Es una aproximación visual, sin reconstrucción desde imágenes ni exportación GLB.
La versión Rive continúa en `/`. Detalle y evidencia vigente en `HANDOFF.md`.
