# Landing Nana Wallet

Referencia: brand.html. Paleta canónica: crema #f4f1ea, headings #6548ee, acción #4936c7, superficies #fdfbfa, texto #5d5a64, borde #d5d0d8, confirmación #237a4b. Fuente Fredoka con fallback de sistema.

## Desarrollo

Desde la raíz:

```sh
portless nana-landing npm run dev
```

Abrir la URL que devuelve Portless. El servidor anterior en 4173 sólo entrega archivos estáticos: permite ver la landing pero no guardar la waitlist. Para el formulario debe ejecutarse este servidor Node.

## Waitlist

POST /api/waitlist recibe JSON `{email, website: ""}`. Valida email, deduplica, persiste y sólo después responde éxito. La respuesta inicial incluye un token de borrado, cuyo hash se almacena en el servidor. El navegador guarda el token en localStorage y DELETE /api/waitlist permite retirar el registro. La inscripción se confirma con Join the waitlist, sin checkbox adicional. No se envía correo automáticamente.

Los datos se guardan en data/waitlist.json, ignorado por Git y fuera de las rutas públicas. Para despliegue usar un volumen persistente o reemplazar el almacenamiento con base de datos; decidir proveedor de correo y verificación del email antes de publicar. No desplegar en filesystem efímero sin adaptar esta parte.

## Assets incorporados

El hero usa el fondo nana-lilac-bubble-bottom-left-nogrid.png y un avatar de marca en el encabezado. Nani sigue siendo el rig Rive aprobado; su canvas mide 450 px de ancho en escritorio, elevado a -34 px dentro de una escena de 620 px. Nana/Wallet y Your money./Your voice. ocupan dos filas detrás del personaje, con ajustes propios en móvil.

Las cuatro pantallas provistas (01-agent-home.jpg a 04-agent-transaction-confirmed.jpg) reemplazan las vistas HTML de concepto. Se conservan enteras, sin recortar contenidos. El servidor permite únicamente los assets de raíz usados por la landing. Los originales no se modifican.

## Verificación

`npm run check` comprueba sintaxis JS del servidor y formulario. El rig se valida con Rive verify/inspect y el arnés WASM/PCM temporal. El formulario requiere verificar POST/DELETE y persistencia con el servidor Node activo. Nunca usar emails reales para pruebas.

## Foco del email

Mientras el campo email tiene foco, Rive activa la pose del pulgar arriba usando nani/gaze/nani-thumbs-up.png, con los mismos ojos, mirada y parpadeo del frontal. Al salir restaura las poses normales. No hay checkbox adicional para inscribirse.

## Vercel y Supabase

El despliegue usa funciones API y Supabase; ver `docs/DEPLOY_VERCEL.md`. `npm run build` copia sólo archivos públicos a dist, incluidos Rive/WASM locales y el audio generado. El almacenamiento en data/waitlist.json queda sólo para desarrollo local sin configuración Supabase.
