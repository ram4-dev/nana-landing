# Voz de Nani — ElevenLabs

## Integración implementada

El servidor genera una bienvenida fija en inglés una sola vez, guarda el MP3 y su metadata y los reutiliza. Las visitas no generan llamadas de pago. La landing obtiene `/api/nani/welcome`, cambia el audio con `naniSpeech.setSource()` y conserva el AnalyserNode que mueve ambos labios. Es sincronización por amplitud, no por fonemas.

La bienvenida dice:

> Hi, I’m Nani. Welcome to Nana Wallet. Your money, your voice. Tell me what you’d like to do. I’ll prepare it, and you can review the details before confirming.

## Configuración

Provisionar la clave desde el vault, sin copiar su valor:

```sh
vault-env to .env --names ELEVEN_LABS_API_KEY
portless nana-landing npm run dev
```

Node carga `.env` automáticamente; ese archivo está ignorado por Git y no se sirve públicamente. Si falta el audio y existe la clave, el arranque lo genera antes de escuchar. `ELEVENLABS_VOICE_ID` es opcional: en su ausencia, el script elige una voz femenina inglesa disponible en la cuenta, priorizando Sarah/Jessica/Rachel.

Para cambiar la voz o regenerar explícitamente:

```sh
npm run voice:generate
```

La página intenta reproducir al cargar. Si el navegador bloquea autoplay, tocar Nani o usar Enter/Espacio con foco reproduce el saludo. Ese control se activa sólo cuando hay audio ElevenLabs disponible. No se vuelve a mostrar el texto ni Replay eliminado por el usuario. Sin audio generado, el endpoint devuelve 503 y no reproduce la demo anterior en español.

## Verificación y límite actual

Pruebas del contrato API, elección de voz, guardado, metadata sin secretos y errores pasan con proveedor simulado. El vault confirmó ELEVEN_LABS_API_KEY y el conector seguro ejecutó generación real con Sarah. El MP3 inglés ya está guardado localmente. No se reveló ni escribió la clave; vault-env to .env sigue bloqueado por red del sandbox. La reproducción real en Chrome y el movimiento de ambos labios con el PCM generado están comprobados. El preview estático usa metadata/audio locales si la API devuelve 404. Provisionar .env sólo hace falta para futuras regeneraciones automáticas; el servidor Node sigue siendo necesario para guardar la waitlist. La integración no envía texto de usuarios ni permite un proxy TTS abierto.

API utilizada: [Create speech](https://elevenlabs.io/docs/api-reference/text-to-speech/convert), salida mp3_44100_128 y modelo eleven_multilingual_v2.
