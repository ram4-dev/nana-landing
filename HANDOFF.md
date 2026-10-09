# Handoff — Landing animada de Nani con Rive

## Publicación pública GitHub — 2026-10-09

- Usuario autorizó visibilidad pública y push completo. GitHub PATCH confirmó public:true en ram4-dev/nana-landing. Nuevo gitaddall pasó; no se modificó configuración del sandbox.
- 111archivos ~58MB preparados, excluidos .env/.vercel/node_modules/dist/data/supabase.temp. Inspección de archivos privados y patrones de credenciales sin hallazgos. Check/test PASS. Origen GitHub previsto https://github.com/ram4-dev/nana-landing.git y rama main.

## Publicación GitHub solicitada — 2026-10-09

- Usuario informa despliegue Vercel realizado y error verifier unexpected redirect. Verifier GET/HEAD ahora follow; actualiza origin canónico tras validar contenidoNana. Login/protection reporta errorclaro; POST/DELETE conserva redirecterror. Checks/test PASS.
- Repo privado creado mediante GH_TOKEN vault para identidad ram4-dev: https://github.com/ram4-dev/nana-landing. Vacío: git add --all falló .git/index.lock EPERM. Sin commit/push del contenido actual. Staging previo del usuario preservado.
- .gitignore recupera excepción .env.example tras patrón .env* agregado por VercelCLI. .env/keys/.vercel/node_modules/dist/supabase.temp excluidos. No secretos leídos/imprimidos.

## Pedido de publicación Vercel — 2026-10-09

- Usuario autorizó deploy production con CLI. vercelwhoami y deploy --prod --yes intentados; CLI sale0 al Loading teams sinURL/.vercel, por lo tanto sin confirmación de publicación. Se desactivó update-notifier (cache EPERM) y experimentalwebstorageNode26; mismo resultado. Probe APIapi.vercel.com ENOTFOUND en sandbox. No keys subidas ni proyecto vinculado por esta sesión.
- scripts/deploy-vercel.mjs + npm run deploy:vercel automatizan link, envadd sensitive stdin Preview/Production, deploy y verificación HTTP de URLreal. `.env` cargada automáticamente por Node sin imprimir valores. Requiere Vercel autenticado y acceso API.

## Verificación Supabase real — 2026-10-09

- Usuario completó Supabase y vault-env; .env existe chmod600, sin leer/imprimir valores. Proyecto vinculado correcto.
- Secure secret_exec realizó chequeo REST real con URL/key del vault: tabla disponible, RPC rate limit, alta descartable example.invalid, duplicado sin reemplazar token, baja y consulta que confirma ausencia PASS. Registros temporales de email/rate limpiados. Migración funcional confirmada por API; no se intentó volver a aplicarla.
- npmci offline/check/test/build/diffcheck PASS. Build16archivos públicos. LocalNode26 warning por engine24; VercelNode24 previsto.
- Mensaje de inicio corregido: indica Supabase cuando hay configuración cloud y reconoce audio pre-generado sin pedir ElevenLabskey.
- Portless nuevamente EPERM abriendo ~/.portless/proxy.log; no se pudo iniciar servidor ni E2E HTTP/browser completo. No publicar ni afirmar URL local funcionando. Config/code listo para Vercel; variables de Vercel y deploy siguen pendientes.

## Preparación Vercel y Supabase — 2026-10-09

- Actualización: usuario vinculó la CLI. supabase/.temp/project-ref coincide con aitxhgxmiwfazynmcchs; pooler registrado sin contraseña embebida. db push --dry-run sigue Access token not provided en esta sesión. Prueba segura con contraseña vault hacia pooler5432 timeout, también resolviendo IPv4 separadamente. No migración ni writes remotos realizados.

- Código preparado: funciones API separadas, almacenamiento Supabase persistente con deduplicación/baja por token hash, límites compartidos e IP HMAC. Vercel sin credenciales responde 503; nunca escribe una waitlist efímera. Migración SQL namespaced lista, todavía no aplicada.
- Build público explícito en dist: runtime Rive 2.44.0/WASM locales, RIV compilado v43, MP3 ElevenLabs ya generado y assets reales. No llamadas pagas durante build/visitas. vercel.json y Node24 configurados.
- supabase init completado. Proyecto solicitado aitxhgxmiwfazynmcchs. Link intentado con CLI actual/legacy: Access token not provided; el login de cuenta no está accesible en esta sesión. Usuario informó login; se pidió confirmar salida sin token. No afirmar vínculo ni migración aplicados.
- Vault confirma ambas claves; chequeo seguro remoto REST devolvió404 para tabla aún inexistente. PostgreSQL directo timeout; no se modificó la base. vault-env local EPERM por red, por lo tanto .env no provisionado.
- npm check/test/build y arnés real RiveWASM/PCM PASS; transportes API simulados. E2E navegador+HTTP+Supabase pendiente: Portless EPERM, Docker socket bloqueado, Chrome desconectado. scripts/verify-deployment.mjs listo para comprobación real con alta descartable y limpieza. No publicación ni commits.
- Próximos pasos: sesión CLI efectiva, link, db push --dry-run y revisar historia, aplicar única migración sin reset, configurar dos variables en Vercel y validar preview. Ver docs/DEPLOY_VERCEL.md.


## Estado vigente — ojos Rive en pose pulgar v43

- Pedido: mismos ojos animados en imagen de pulgar. Se incorpora cuarto ImageAsset0:64 + poseThumb0:1710 dentro del mismo Rive. scripts/generate-thumbs-rig.py clona exactamente ambos nodos de ojo frontal (iris74x88, piel/esclerótica/párpados/binds comunes); sólo reemplaza asset de muestreo, IDs/nombres y compensa altura de PNG1px. Mismo seguimientoX/Y y blink sin duplicar ojos. Pose completa respira en Breath; cabeza frontal mientras foco, sin rotar imagen del pulgar a 3/4.
- HTML elimina img overlay y CSS su escondido de canvas. window.naniPose.setThumbsUp activa exclusivamente poseThumb y apagaFront/Left/Right; blur devuelveFront y trackingnormal. scripts/landing.js conecta focus/blur y también aplica estado si campo ya estaba enfocado al cargar. Audio sigue pausándose al focus. Generador general llama al de thumbs para conservar nueva pose. Fuente PNG intacta, frontal/costados anteriores sin modificar.
- Cache landing-v43/styles/script43. Rive verify/inspect/once PASS2369objetos/6259486bytes. npmcheck/npmtest/diffcheck PASS. Arnés verify-thumbs-v43 realWASM/ElevenLabsPCM PASS ambas pupilasX/Y, blink con foco, exclusividaddepose y retorno normal, más pruebas anteriores de voz/poses/labios. PNGs page-thumbs-right-up/page-thumbs-blink revisados.
- Chrome real cargó v43, sin overlay estático, focus email=>canvasvisible/data-pose thumbs-up. Captura fullpage revisada; ojosalineados y pulgarvisible. Browser se desconectó nuevamente al intentar blur; retorno comprobado por harness, no afirmar blurBrowserE2E de esta versión. Infra/waitlist sin cambios, bloqueoNodePortless anterior persiste.


## Estado vigente — foco de waitlist y ElevenLabs real v42

- Usuario pidió pulgar arriba al enfocar email y eliminar checkbox/copy Email me… y How we use…. Se generó copia frontal transparente nani/gaze/nani-thumbs-up.png con imagegen, autorizada explícitamente. CSS/JS muestran esa imagen sólo con foco en email y vuelven a Rive al blur; esperan carga de imagen y mantienen Rive si falla. Audio se pausa durante foco. Canvas/imagen alternan aria-hidden. Sin modificación al rig/source frontal.
- Form ya envía email/website, server no exige consent ni registra consent:true ficticio; signupMethod waitlist-form. Privacy copy coherente. Tests validan alta sin checkbox y asset.
- Nombre correcto del secreto ELEVEN_LABS_API_KEY confirmado por secret_echo. Código soporta ese nombre y alias anterior. vault-env to.env--append falló por Operation not permitted/red; NO se escribió ni leyó secreto local. secret_http falló por inyección; secret_exec con entorno opaco sí consultó voces y generó TTS real con Sarah (EXAVITQu4vr4xnSDxMaL), multilingual_v2/mp3_44100_128. Audio146747bytes/duración9.102222s guardado audio/nani-welcome.mp3 +metadata pública sin secretos. Texto Your money,your voice.
- Frontend fallback para preview estático: si APIwelcome404 lee audio/nani-welcome.json y usa MP3local; Node mantiene API. Chrome verificó fuente nueva, reproducción real por click, foco email =>thumbvisible/canvasoculto/audioPause, blur=>Rivevisible. Móvil390x844 sin overflow; sin checkbox; viewport restaurado. Captura fullpage muestra thumb y formulario.
- npm run check/npm test/git diff--check PASS. Arnés realRiveWASM con PCM decodificado del MP3ElevenLabs PASS todos los movimientos/amboslabios/silencio/pausa/final/replay. DOM/AudioContext/reloj simulados. No cambio RML en esta tarea.
- Waitlist handler+filesystem real PASS sinconsent; browseraltaexitosa todavía requiere serverNode, no estático4173. SandboxlistenerEPERM ya documentado. Ejecutar portless nana-landing npm run dev fuera del sandbox. Audio ya puede escucharse en4173 sin.env.


## Estado vigente — landing v41, contorno izquierdo y voz ElevenLabs

- Trabajo en directorio original, sin worktree. Nana/Wallet ahora tienen diez letras con flotación CSS suave; reduced motion la desactiva. Eliminados greeting/assurance visibles pedidos por usuario.
- Causa del contorno izquierdo: fuente 10_31_10 es RGB con negro incrustado, mientras frontal/derecha tienen alpha. Ajustar el umbral producía halo negro: descartado. Se obtuvo copia por imagegen con transparencia en nani/gaze/pose-left-transparent-v41.png, mismas dimensiones1026x1533/pose. Original intacto. Asset0:61 usa esa copia; mismos masks/eye rig/lip binds, frontal/derecha conservadas. Un edit generativo puede variar levemente color/textura de la copia, no afirmar igualdad de píxeles. Chrome muestra contorno y hueco exterior de anteojos limpio sobre fondo claro.
- Integración real de código: scripts/generate-welcome.mjs elige voz femenina inglesa si no hay VOICE_ID, llama ElevenLabs TTS, valida respuesta audio y escribe MP3/metadata. server carga.env mediante npm dev/start, genera una sola vez al inicio si existe clave y falta audio, sirve GET/api/nani/welcome. Frontend usa setSource+analizador anterior, autoplay con gesto click/Enter/Espacio en Nani cuando hay audio; sin controles/textos eliminados. Sin audio generado responde503 y no reproduce demo española. .env ignorado y no público.
- Credencial: secret_vault.secret_echo informó ELEVENLABS_API_KEY inexistente. Usuario va a agregarla al vault; pidió preparar todo el código para pasarla al.env después. No leer/mostrar valores. Provisionar con vault-env to .env --names ELEVENLABS_API_KEY; si hay configuración previa usar --append.
- Checks: npm run check, npm test, git diff--check; Rive verify/inspect/once sin warnings (2134objetos,4648212bytes); arnés v41 realWASM/PCM PASS mirada ambos lados, blink, idle, lips/silencio/pausa/replay. Chrome escritorio/móvil390x844 PASS versión/ready/letras animadas/textos eliminados/sin overflow; izquierda visual revisada, viewport restaurado.
- Waitlist tests con handler real y persistencia real PASS signup/dedup/consent/origin/privacidad/baja; transporte simulado. Browser en servidor estático4173 confirmó error de guardado: NO tiene API. E2E éxito browser+API aún bloqueado: Portless normal EPERM al abrir ~/.portless/proxy.log; estado temporal listenerEPERM127.0.0.1/::1:1366. No afirmar waitlist disponible en4173. Para servidor completo: portless nana-landing npm run dev fuera del sandbox.
- ElevenLabs contrato/proveedor simulado PASS, sin llamada real/gasto. Esperar clave para generar/audio+E2Evoz. docs/VOICE_INTEGRATION.md y docs/LANDING.md contienen comandos actuales.

## Ajuste vigente — hero sin copy inferior ni controles de voz

- Pedido: quitar Say or type…/Nani prepares…, Replay y You can type, too. Eliminados párrafo intro y bloque de controles de index.html. Handler de audio tolera ausencia del botón, conserva API/bienvenida y animación.
- Sintaxis y diff limpios. Arnés Rive WASM/PCM PASS también con getElementById(speech) devolviendo null. E2E navegador de esta modificación pendiente por bloqueo de control de Dia/Chrome registrado en v40.

## Estado vigente — hero con profundidad y assets reales v40

- Usuario entregó assets en raíz y pidió Nani más grande/arriba con Nana Wallet y Your money./Your way. detrás a ambos lados. Se reorganiza hero: canvas 450x710.62 px (antes310x490) y top -34 px, título dos filas en z-index1 y Nani z-index2. Fondo de marca lilac-bubble y disco lavanda. Mobile canvas310px frente al anterior270px, filas de texto posteriores y copy fuera de la cara.
- Cuatro JPGs reales de app reemplazan mocks HTML: home/command/review/confirmed. Avatar logo original incorporado en encabezado. Assets originales intactos; server/landing.mjs permite los seis archivos usados y mime image/jpeg.
- Cache landing-v40/styles?v=40. npm run check y git diff --check PASS; arnés Rive WASM/PCM PASS sin modificaciones al rig. Handler checks PASS para todos los assets y MIME además de waitlist. Transporte simulado, archivos reales.
- Revisión E2E visual de esta versión bloqueada: Chrome cerrado/sin browser surface; Dia muestra aún v39, teclado de navegación no cambia AX y clic en barra falla ScreenCaptureKit -3811. No afirmar revisión visual v40 ni mobile E2E actual. URL para revisar: http://127.0.0.1:4173/?v=landing-v40. Backend waitlist sigue pendiente de iniciar fuera del sandbox según docs/LANDING.md; servidor4173 estático.

## Histórico — landing Nana Wallet en inglés v39

- Usuario pidió landing con paleta brand.html, Nani central animada, bienvenida, waitlist y pantallas/brief. Confirmó inglés; va a pasar logos/pantallas. Se usa brand.html como fuente canónica y copy breve según avoid-ai-writing. Trabajo en directorio original según autorización previa, sin worktree.
- index.html ahora es landing; styles/landing.css usa crema/violetas/Fredoka y disco lavanda, responsive. Logos referidos por brand.html no existen: lockup tipográfico provisional. Tres vistas de concepto HTML rotuladas, pendientes de reemplazar con imágenes reales. Nani conserva los ojos v37 y ambos labios v35; sólo se quitó Fill Background del artboard para que sea transparente. Build 4,610,155 bytes/2147 objetos, cache landing-v39.
- Bienvenida intenta audio actual al cargar; si el navegador requiere un gesto, timeout 1.5s libera el botón. Reduced motion omite autoplay. Audio actual sigue siendo la demo en español sobre preparar café. Futuro saludo inglés y ElevenLabs propuestos en docs/VOICE_INTEGRATION.md; setSource(url) permite audio del mismo origen sin cambiar el AnalyserNode/rig. No se solicitaron secretos ni se generó audio.
- server/landing.mjs es servidor Node sin dependencias; POST/DELETE /api/waitlist valida JSON/email/consent/origin, honeypot, límite por IP, deduplicación, persistencia atómica en data/waitlist.json (Git ignore), token de baja hasheado. Sin envío de correo ni publicación. scripts/landing.js sólo confirma éxito si responde la API; maneja errores y baja desde navegador.
- npm run check y git diff --check PASS; Rive verify/inspect/once PASS. Arnés real Rive WASM/MP3 PCM PASS mirada/poses/blink/voz/ambos labios. Handler de waitlist con transporte simulado + filesystem real PASS validación/persistencia/duplicados/baja/rutas privadas.
- Chrome real abrió http://127.0.0.1:4173/?v=landing-v1 (servidor estático existente): visual desktop + 390x844, sin overflow global, fondo transparente, Rive ready, audio por click -> Pause/Replay PASS. Override viewport restaurado. E2E browser+API POST/DELETE pendiente: Portless bloqueado EPERM al crear log e intentar listeners; Unix socket también EPERM. No afirmar signup E2E completo. El servidor 4173 NO soporta API. Para activar waitlist: portless nana-landing node server/landing.mjs. docs/LANDING.md registra esto.

## Histórico — mismo rig suave en ambos costados v37

- Usuario pidió aplicar exactamente el método aprobado de frontal/derecha a la izquierda porque el contorno de v36 tenía menor calidad.
- Eliminado el trazado de iris por píxeles y la ampliación exclusiva del backplate izquierdo. Ambos costados usan el mismo recorte elíptico suave 50x80/x=-4, esclerótica 120, capas de piel con dimensiones idénticas, mismos binds de mirada/apertura y mismos párpados. Escalas de ojo cercano/lejano 1.07/0.60 y verticales 1/0.90 en ambos lados. Sólo posición, muestreo de textura y color de piel corresponden a cada fuente.
- Cache `same-eyes-v37`, build 4,610,189 bytes, 2149 objetos; verify/inspect/once limpios. Comparación XML confirma frontal y derecha intactas. Checks de geometría compartida PASS. Arnés Rive WASM/PCM PASS mirada, poses, blink, voz y ambos labios; capturas abiertas/cerradas izquierdas revisadas.
- Navegador E2E pendiente por bloqueo EPERM de Portless/localhost ya registrado; arnés con DOM/AudioContext/reloj simulados y Rive/PCM reales. Directorio original; sin worktree ni nuevas imágenes.

## Histórico — ojos de pose izquierda v36

- Usuario indicó piel en iris, ojo original visible al parpadear y desalineación en pose izquierda; frontal y derecha aprobadas.
- Se reemplazan sólo los recortes de iris izquierdos por contornos trazados sobre píxeles oscuros de sus iris originales. Se corrigen centros de muestreo (201/389) y centros de ojos (208/410). Esto conserva el ancho original del iris lejano en perspectiva sin arrastrar piel.
- Esclerótica izquierda 126 px locales; cobertura permanente de piel 12 px más ancha, con apertura/parpadeo frontal compartidos. Frontal y derecha comparadas por árbol XML normalizado: intactas. Boca de ambos labios v35 conservada.
- Cache `left-eyes-v36`. Rive verify/inspect/once sin errores: 2265 objetos, build 4,611,891 bytes. Generador idempotente por SHA256. Arnés HTML/Rive WASM/PCM PASS para mirada X/Y, ambas poses, blink, voz y ambos labios. Capturas izquierdas abiertas/cerradas revisadas y presencia de cabeza comprobada por píxeles.
- No es E2E navegador: DOM/AudioContext/reloj simulados. Validación en navegador sigue pendiente por EPERM de localhost/Portless en este entorno. Cambios en directorio original, sin worktree ni edición de PNGs fuente.

## Histórico — ambos labios animados v35

- El usuario pidió probar movimiento de los labios superior e inferior. Se conserva la textura de cada PNG original: el labio superior ahora tiene seis máscaras con bordes suaves y una traslación `upperLipLift`; el inferior mantiene su rig de mandíbula. Aplicado a frontal/izquierda/derecha.
- El audio mueve el superior hacia arriba hasta 6.6 px locales (`-mouthOpen*12`) y el inferior hacia abajo hasta 38.5 px (`mouthOpen*70`). `mouthTop` enlaza el borde superior de la cavidad; los dientes acompañan al superior. Ambos vuelven al reposo al pausar, terminar o entrar en silencio.
- Cache `both-lips-v35`. Build 4,610,189 bytes, 2149 objetos; Rive verify/inspect/once sin errores. Generador idempotente por SHA256 y enlaces de ambos bordes comprobados en las tres poses. PNGs originales intactos; trabajo en directorio original, sin worktree.
- Arnés temporal `verify-both-lips-v35.cjs` PASS con HTML actual, Rive WASM real y MP3 PCM real: movimiento superior/inferior, aperturas 8/22/38 px, audio/pause/resume/end/replay/silence, mirada, poses y blink. Capturas de ambas poses hablando y frontal de apertura máxima revisadas. DOM/AudioContext/reloj simulados, no navegador E2E.
- E2E navegador continúa bloqueado por EPERM al abrir el listener de Portless en localhost; no se afirma validación en navegador. Los ojos conservan el método frontal de v34.

## Histórico — método frontal aplicado a costados v34

- Se comparó el rig frontal aceptado con los laterales: el frontal mantiene la placa de piel siempre visible detrás de la esclerótica; los laterales la mostraban sólo al cerrar. Esa diferencia permitía que asomara el ojo estático.
- Los cuatro ojos laterales ahora mantienen la placa de piel opaca y usan los mismos binds frontales `apertureHeight`/`apertureY` y curvas de párpado. Se eliminaron `sideBlink` y las alturas laterales con cierre cuadrático. Se conserva el recorte estrecho del iris, el seguimiento X/Y, el color de piel muestreado de cada pose y la perspectiva.
- Generador idempotente comprobado por SHA256. Assertions de estructura confirman cobertura permanente y binds frontales en los cuatro ojos. Rive verify/inspect/once: sin errores, 1903 objetos; build 4,603,116 bytes; cache `side-eyes-v34`.
- Arnés de HTML/Rive WASM/PCM: PASS mirada X/Y, poses, parpadeos, respiración, voz y boca. Capturas abiertas/cerradas de ambos lados y frontal revisadas. DOM, AudioContext y reloj simulados: no es E2E de navegador.
- E2E en navegador pendiente: Portless con estado temporal falla al escuchar en localhost (`EPERM` en IPv4/IPv6); screenshot nativo Rive bloqueado por Metal no disponible. Los PNGs revisados se renderizaron con Rive WASM real. Se trabaja en el directorio original, sin worktree ni cambios de imágenes fuente.

## Histórico — ojos laterales de pose izquierda v33

- El usuario indicó que en pose izquierda los ojos quedaban bajos y se veía piel, mientras que la pose derecha ya estaba bien. El desplazamiento adicional del rig izquierdo había desalineado el ojo móvil de la imagen fuente y dejaba ver el iris original por debajo.
- Se vuelve a alinear el rig izquierdo con el ojo de la imagen fuente y se amplía sólo su esclerótica a 132x104; la pose derecha se conserva en 120x90. La máscara de parpadeo cubre ambas poses y el seguimiento X/Y del iris sigue activo.
- Cache `side-eyes-v33`; URL `http://127.0.0.1:4173/?v=side-eyes-v33`. Build 4,603,302 bytes; verify/inspect/once sin errores, 1907 objetos.
- Arnés Rive WASM/PCM PASS para poses, mirada X/Y, parpadeos, respiración, voz y boca. Capturas laterales abiertas/cerradas revisadas: la izquierda tapa el iris de la imagen fuente sin una segunda forma blanca debajo; la derecha conserva su aspecto anterior.
- Navegador local no disponible desde esta sesión: puerto 4173 no responde y Portless falla con EPERM al crear su log.

## Histórico — cobertura ocular lateral v26

- El usuario indicó que el ojo lateral no cubría toda la zona original. `generate-pose-rig.py` sube cada ojo lateral 4 px y aumenta el óvalo de esclerótica de 112x82 a 120x90; el parpadeo usa altura base 90. Conserva iris móvil, placa de piel activada sólo durante el cierre y máscara de cierre 148x180.
- Cache `side-eyes-v26`; URL `http://127.0.0.1:4173/?v=side-eyes-v26`. Build 4,603,257 bytes; verify/inspect/once sin errores, 1907 objetos.
- Arnés funcional HTML/Rive WASM/PCM PASS para seguimiento X/Y, ambos parpadeos, poses, respiración, audio y boca. Capturas `page-side-right-up.png`, `page-side-left-up.png`, `page-blink-right.png` y `page-blink-left.png` revisadas: ojo algo más alto y grande en ambos costados, sin perder el cierre.
- No se pudo verificar navegador local en esta sesión: puerto 4173 inaccesible y Portless falla con EPERM al crear su log.

## Histórico — parpadeo lateral v25

- El usuario indicó que al parpadear de costado quedaba visible el ojo original debajo. Se recupera el método frontal: placa de piel muestreada detrás del ojo, con opacidad ligada a `sideBlink`, invisible al abrir y completa al cerrar.
- La máscara de la placa ahora cubre el interior completo del lente (148x180); la esclerótica se mantiene pequeña en reposo (112x82) y su altura usa una curva cuadrática para desaparecer antes de cerrar. Movimiento X/Y del iris conservado.
- Cache `side-eyes-v25`; URL `http://127.0.0.1:4173/?v=side-eyes-v25`. Build 4,603,257 bytes; verify/inspect/once sin errores, 1907 objetos.
- Arnés HTML + Rive WASM + PCM PASS en ambos lados: mirada, parpadeo y reapertura, poses, respiración, audio y boca. Capturas `nani/build/page-blink-left.png` y `page-blink-right.png` revisadas: el ojo de la foto queda cubierto al cerrar y no queda blanco inferior.
- Navegador local no verificado en esta sesión: puerto 4173 no responde desde aquí y Portless falla con EPERM al crear `~/.portless/proxy.log`.

## Histórico — esclerótica lateral v24

- El usuario indicó que tras quitar la piel alrededor de los ojos, quedó demasiado blanco alrededor. El blanco estaba llenando gran parte de los lentes (140x170).
- `scripts/generate-pose-rig.py` reduce la esclerótica a un óvalo de 112x82 y la centra en y=-8; la guarda lateral pasa a 120x96. El bind de parpadeo usa altura base 82. El iris sigue usando su recorte estrecho y enlazado a la mirada.
- Cache `side-eyes-v24`; URL local `http://127.0.0.1:4173/?v=side-eyes-v24`. Build 4,594,209 bytes; verify/inspect/once sin errores, 1563 objetos.
- Arnés Rive WASM PASS: seguimiento X/Y en ambos costados, transiciones, parpadeo, respiración, voz/PCM y bocas. Captura `nani/build/page-side-right-up.png` revisada: el blanco queda como óvalo del ojo en vez de llenar el lente. PNGs fuente intactos.
- El navegador local continúa sin validar en esta sesión: puerto 4173 no responde desde aquí y Portless falla con EPERM al crear `~/.portless/proxy.log`.

## Histórico — ojos laterales v23

- La mancha color piel restante venía del recorte de iris, que incluía píxeles de la cara. `generate-pose-rig.py` estrecha y desplaza el límite del iris (50x80, x=-4) y elimina la reparación de piel lateral que interfería con el ojo abierto.
- La esclerótica lateral usa un degradado blanco neutro y ocupa mejor el lente (140x170, desplazada -24); la máscara de lente es 148x180. La altura se anima con `sideApertureHeight` para conservar el parpadeo. PNGs fuente intactos.
- Cache `side-eyes-v23`; URL local `http://127.0.0.1:4173/?v=side-eyes-v23`. Build 4,594,209 bytes; verify/inspect/once sin errores, 1563 objetos.
- Arnés `verify-side-eyes-v23.cjs` PASS para seguimiento X/Y en ambos costados, transiciones, parpadeo, respiración, voz/PCM y bocas. Capturas reales de Rive WASM revisadas: la zona blanca ya no contiene la mancha de piel.
- No pude verificar la página en el navegador: puerto 4173 no responde en esta sesión y Portless falla con EPERM al crear `~/.portless/proxy.log`.

## Estado vigente — bocas laterales originales v7

- Usuario aprobó frontal v6 y pidió aplicar mismo tratamiento a los costados. Generador original-lip ahora reemplaza Speech Mouth Left/Right además de frontal.
- Boca izquierda x302,y856 y derecha x721,y874; geometría sx.735/sy.9, comisuras y centro asimétricos adaptados a sonrisa real de cada PNG. Textura inferior propia (0:61 izquierda,0:62 derecha), con transformadas inversas para conservar perspectiva/color de la imagen. Fuente tomada 6px debajo para excluir línea oscura original; máscara curva y elipses suaves, apertura hacia abajo.
- Frontal conserva geometría y muestreo aceptados (nuevo contenedor identidad). PNGs intactos; no generación de imágenes, mesh, uploads, ni worktree. Audio/mirada/poses conservados.
- Cache `mouth-sides-v7`; URL http://127.0.0.1:4173/?v=mouth-sides-v7. Build4,603,181bytes; 3ImageAssets/30Images/121clips. Verify/inspect/once limpios. Generador idempotente por hash.
- Arnés temporal verify-original-mouth.cjs: real HTML/Rive WASM/PCM, DOM/AudioContext/reloj simulados. PASS mirada lateralX/Y, blink, poses, apertura de ambos nodos Side Jaw, cierre en silencio, pause/resume/end/replay/buffering. Capturas finales page-audio-speaking-left/right.png revisadas (esperar final de harness para evitar archivos viejos).
- E2E real Dia: navegación mediante paste a v7 exitosa, URL y Nani visible confirmadas. AX click de Hablar no cambió estado; teclado posterior bloqueado por cambio activo de app. Prueba de voz/poses laterales en navegador pendiente, no afirmar E2E visual hablando. Render real WASM sí revisado.
- Nota operativa: native typeText no navegó en intentos anteriores; paste después cmd+l sí. No reutilizar índices AX ni coordenadas si cambia ventana.

---

## Estado vigente — quitar línea duplicada inferior v6

- Usuario vio mejora v5, pero señaló otra boca debajo. El recorte inferior incluía la línea oscura de la sonrisa cerrada original.
- `generate-textured-mouth-rig.py`: imagen del labio inferior cambia y-990 a y-996 dentro de la máscara; toma textura 6px por debajo de la línea original y alinea la parte rosada con el nuevo borde inferior. Misma apertura/recorrido, sin modificar PNGs ni poses laterales.
- Cache `mouth-seam-v6`; URL http://127.0.0.1:4173/?v=mouth-seam-v6. Build4,598,400bytes. Verify/inspect/once0errores/advertencias, arnés verify-original-mouth.cjs PASS y captura wide final revisada: línea oscura duplicada bajo la cavidad retirada.
- E2E UI intentado en Dia: Nani v5 visible en reposo; recarga sin confirmación de versión en AX. Clic para hablar volvió a fallar noWindowsAvailable. No afirmar verificación visual v6 con voz en navegador; render WASM/PCM real con DOM/reloj simulado sí pasó.

---

## Estado vigente — apertura sobre sonrisa original v5

- Usuario pidió más apertura y quitar el aspecto de transparencia pegada sobre la boca. Frontal ahora abandona atlas generado (0:63 eliminado del .riv); assets anteriores se conservan como historial.
- `generate-textured-mouth-rig.py` ahora construye cavidad vectorial nativa anclada exactamente a sonrisa original (x490,y990, curva central24), dientes sencillos curvos y recortes de textura del labio inferior original (asset0:60). No agrega piel generada ni una reparación encima de la sonrisa. Upper edge/comisuras originales quedan fijos; sólo labio inferior original baja.
- Capas del labio inferior usan máscara curva + elipses de borde progresivo para evitar rectángulos visibles. Sigue siendo composición local, no mesh anatómico; no afirmar que desaparece toda diferencia visual al abrir mucho. Capturas finales wide revisadas, mejora de bordes comparada con primer prototipo rectangular descartado.
- Intensidad máxima sigue .55; recorrido inferior sube a mouthOpen*70 (máx38.5px), mouthBottom24+70*mouthOpen y jawDrop70*mouthOpen. jawDrop ahora mueve recorte de labio original, no mentón completo. También aumenta mouthBottom de laterales, que conservan rig previo. Estados atlas/prop lipDrop se conservan en JS por compatibilidad, pero no controlan geometría frontal.
- Cache `mouth-original-v5`; URL http://127.0.0.1:4173/?v=mouth-original-v5; build4,598,400bytes, 3ImageAssets,18Images,99clips,0errores/advertencias.
- Verify/inspect/once y syntax/diff checks pasan. Arnés temporal verify-original-mouth.cjs PASS: HTML/WASM/PCM reales con DOM/AudioContext/reloj simulados, regresiones mirada/poses/blink/audio/silencio/pausa/replay, labio inferior y cierre. Capturas de apertura manual no garantizan frames distintos: renderer puede retener cola, por lo que no afirmar comparación visual exacta de los 3 niveles. Se verificó posición de nodo en esos niveles.
- E2E Dia intentado: página v4 visible, navegación v5 no cambió en AX; setValue rechazado (no settable); recarga por coordenadas falló noWindowsAvailable. No afirmar E2E visual v5. Servidor local existente confirmado anteriormente, curl desde sandbox bloqueado.

---

## Estado vigente — posición y anclaje de boca v4

- Usuario pidió boca algo más abajo y apertura desde esa posición. Textured Mouth Front baja de y1007 a y1017 (+10px en artboard). Tres estados alinean su borde superior alpha (umbral100) en el mismo y: offsets Small0, Wide4.02, Round5.34; la abertura crece hacia abajo.
- Reparación de piel original mantiene posición anterior con offset -10. Asset alpha v3 intacto, sin regenerar PNGs; laterales preservadas.
- Cache `mouth-anchor-v4`, build 5,070,382bytes. URL http://127.0.0.1:4173/?v=mouth-anchor-v4.
- Verify/inspect/once limpios. Arnés WASM/PCM PASS incluyendo nuevos asserts de posición y anclaje, regresiones de audio/mirada/poses. Captura wide revisada. E2E CUA intentado: Nani v3 visible; actualizar a v4 volvió a ser rechazado por cambio activo de app del usuario. No afirmar captura v4 en navegador.

---

## Estado vigente — piel original y labios transparentes v3

- El usuario detectó diferencia de color entre el atlas de boca y la cara.
- Asset seleccionado `nani/mouth/front-lips-alpha-v3.png`: PNG RGBA 1254x1254 generado con image_gen built-in como extracción transparente de v2. Prompts en `nani/mouth/prompts.txt`. Fuente en ~/.codex/generated_images/01a11bf3-1222-75e2-a5dd-dd2fa27c3ad9/exec-61cfcfb8-17a1-4150-a118-50ba246a92fa.png.
- Generador texturizado usa sólo labios/interior; ya no superpone piel generada ni rectángulo del labio inferior. Nueva geometría de atlas realineada/comprimida verticalmente en Rive para mantener abertura discreta. Las tres opacidades están vinculadas al estado activo: no queda sonrisa pequeña debajo de la forma redonda.
- La sonrisa pintada original se cubre con una franja de piel original cercana debajo de la boca (source y1045, escalaY3) y máscaras nativas suaves. Es una reparación local por composición, no inpainting ni rig anatómico. Mentón original mantiene desplazamiento <=1.1px. lipDrop sigue declarado por compatibilidad, pero ya no mueve un recorte independiente.
- Sólo frontal; laterales sin nuevo atlas. PNGs originales intactos. Trabajo en este directorio, sin worktree.
- Cache `mouth-skin-v3`; URL http://127.0.0.1:4173/?v=mouth-skin-v3. Build 5,070,367 bytes, 28 Images/107 clips, verify/inspect/once 0 errores/advertencias.
- Arnés funcional temporal verify-textured-mouth.cjs PASS: HTML y Rive WASM reales, PCM real con DOM/AudioContext/reloj simulados; mirada, poses, blink, silencio, pausa/resume/end/replay/buffering, estados frontales. Capturas small/round revisadas tras corrección final.
- E2E UI de esta revisión bloqueado por cambio activo de app/tab del usuario: CUA rechazó navegación con “The user changed '/Applications/Dia.app'”. Se dejó su formulario externo intacto. No afirmar validación visual final de navegador; render WASM nativo verificado. curl no pudo conectar desde el entorno, aunque lsof confirma Python PID76676 escuchando 127.0.0.1:4173. Portless vuelve a fallar EPERM en ~/.portless/proxy.log; intento de servidor fallback devuelve Address already in use, por el servidor existente.

---

## Estado vigente — boca frontal texturizada, corrección discreta v2

El usuario aprobó probar primero una boca frontal integrada y luego corrigió la primera
iteración porque parecía demasiado realista y abría demasiado. Estado actual v2:

- `nani/mouth/front-atlas-v2.png` (1254x1254), generado por image_gen built-in usando
  atlas v1 y frontal original como referencias. V1 se conserva como variante descartada.
  Prompts exactos: `nani/mouth/prompts.txt`. Fuente generada original en ~/.codex/generated_images.
  Ningún PNG original fue modificado ni se procesó el raster con Python: sólo análisis
  de coordenadas y composición/máscaras nativas en Rive.
- `scripts/generate-textured-mouth-rig.py`: atlas embebido como ImageAsset 0:63;
  tres recortes locales (abertura pequeña, amplia, redonda), máscaras elípticas de borde
  progresivo, parte inferior del labio móvil y mentón con textura original y unión suave.
  El rig vectorial frontal anterior se elimina; las dos poses laterales conservan el rig previo.
  La sonrisa pintada se cubre localmente al hablar; en reposo se muestra el original.
  No hay una imagen base inpainted ni un mesh completo de mandíbula. El movimiento
  actual es una composición local de texturas; la mandíbula no es una reconstrucción anatómica.
- `generate-mouth-rig.py` vuelve a aplicar esta capa tras regenerar las bocas; por tanto
  `generate-pose-rig.py` también la conserva al terminar. Generador texturizado idempotente.
- Props extras 1810-1814: mouthSmall, mouthWide, mouthRound, jawDrop, lipDrop.
  Estados discretos con histéresis/hold de 90 ms; no se funden dos labios durante intervalos largos.
  Forma redonda seleccionada sólo en voz muy dominada por frecuencias bajas; aproximación
  por timbre/amplitud, no alineación fonética. No afirmar sincronización por fonemas.
- Corrección v2: teeth simplificados, sin lengua detallada. RMS máximo .55 (antes .88).
  Estado amplio entra > .47 y sale < .38. Jaw máximo 1.1 px, lower lip .275 px.
  Apertura visible de textura pequeña reducida aproximadamente de 38 a 22 px y amplia
  de 51 a 32 px según bounding box de píxeles oscuros en atlas, no medición anatómica.
- `index.html` cache `textured-mouth-v2`; build `nani/build/nani.riv` 6,183,904 bytes.
  URL: http://127.0.0.1:4173/?v=textured-mouth-v2. Mismo audio y servidor existente.
- Rive verify/inspect/build sin errores. HTML syntax y diff checks. Arnés temporal
  `/private/tmp/nani-render-tools/verify-textured-mouth.cjs` pasó regresiones y PCM real,
  pausa/repetición/silencio, tres estados de textura frontal, mentón activo y regreso a cero.
  Capturas `nani/build/page-textured-mouth-*.png` revisadas, incluida v2 small/wide.
- E2E Dia/CUA v1 frontal hablando verificado; v2 cargó y reprodujo voz con botón Pausar
  y captura real de pose lateral. El mouse sobre el botón seleccionaba pose lateral;
  el intento de volver frontal encontró noWindowsAvailable. Por eso la frontal v2 se
  revisó con canvas/WASM nativo, no se afirma captura frontal v2 de navegador.
- Próxima decisión: validar gusto del usuario con esta primera pose; sólo después aplicar
  atlas matching a ambos 3/4. Las poses laterales aún usan boca vectorial con intensidad reducida.

---

## Estado vigente — voz fija y boca sincronizada, 8 de octubre de 2026

- `index.html` usa el mismo rig Rive 2D de boca; ahora sólo se anima al reproducir
  `audio/nani-demo.mp3` (9.912 segundos, 79,296 bytes, MP3 mono 24 kHz). Cache `audio-v1`.
- Frase en `audio/nani-demo.txt`: Hola, soy Nani. Hoy se me ocurrió una idea: hacer
  una pausa, preparar un café y charlar un rato. ¿Qué te parece?
- Audio obtenido una vez desde Google Translate TTS en español; se sirve localmente.
  No hay llamadas de síntesis en el navegador, secretos ni API keys en el proyecto.
  Intentos con say/Paulina y Mónica produjeron AIFF sin frames; ElevenLabs vía vault-env
  bloqueado por acceso al vault (EPERM), sin solicitudes de síntesis ni secretos expuestos.
- Reproducción por clic Hablar, pausa/reanudación y Repetir al terminar. Sin autoplay.
  Web Audio MediaElementSource -> AnalyserNode -> destination; RMS de PCM con umbral
  de silencio y suavizado 35/60 ms controla las cinco props de boca. Es sincronización
  por intensidad, no por fonemas. Pausa, fin, buffering/error y pestaña oculta cierran boca.
  La animación de mirada/cabeza/parpadeo continúa.
- API vigente: window.naniSpeech.audio, play(), pause(). Reemplaza la demo setMouthOpen.
- Checks: sintaxis JS, diff, MP3 decodificado por ffmpeg sin errores, señal no silenciosa
  (-19.6 dB mean / -3.8 dB peak) y HTTP 200 audio/mpeg. Arnés temporal verify-audio.cjs
  usa PCM real decodificado + Rive WASM real, simulando DOM/AudioContext/reloj. Pasaron
  regresiones de mirada/poses/parpadeos, boca en las tres poses, silencios, pause/resume,
  ended/replay y buffering. No hay package.json ni suites unit/lint/typecheck/build del HTML.
  El .riv sigue siendo el compilado verificado del turno anterior, sin cambios RML.
- E2E Dia/CUA: página audio-v1 cargada, botón reproducir -> pausar, boca abierta visible
  al reproducir, pausa -> reproducir y reproducción repetida verificadas en UI real.
  La herramienta no captura el sonido para escucharlo; no se afirma escucha auditiva.
- Servidor Python existente del turno anterior sigue en 127.0.0.1:4173, cwd original.
  URL: http://127.0.0.1:4173/?v=audio-v1.
- Referencia técnica: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData
  y https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource

---

## Estado vigente — Nani 2D hablando, 8 de octubre de 2026

El usuario rechazó la aproximación 3D y pidió usar sólo 2D con boca animada.
La landing principal sigue siendo Rive en `index.html`. La prueba 3D queda como
experimento histórico separado; no se integra ni se usa en la landing.

- `scripts/generate-mouth-rig.py` agrega tres bocas vectoriales nativas en Rive,
  una por pose, alineadas a la sonrisa de las imágenes originales. Apertura con
  vértices cúbicos, interior con gradiente, dientes/lengua recortados por la cavidad.
  PNGs intactos. Capas parentadas a cabeza y pose; mismo seguimiento/respiración/parpadeo.
- Props: mouthVisible, mouthTop, mouthBottom, mouthWidth, tongueY (IDs 1800-1804).
  `generate-pose-rig.py` llama al generador de boca al terminar para conservar el rig.
- Habla simulada automática al cargar, aperturas suaves con ritmo irregular y pausa
  entre frases. Botón Hablar/Pausar habla. Reduced motion comienza con habla detenida.
  Sin audio ni sincronización por fonemas. API `window.naniSpeech.setSpeaking(bool)`
  y `setMouthOpen(0..1|null)` preparada para conectar una fuente de voz futura.
- Build `nani/build/nani.riv`: 4,596,079 bytes. Cache `mouth-v1`.
- Verify/inspect/build limpios. Generador de boca idempotente. Checks del HTML inline
  y diff. Arnés `/private/tmp/nani-render-tools/verify-mouth.cjs` ejecuta HTML y WASM
  reales con DOM simulado/canvas nativo; pasaron regresiones de mirada, poses,
  parpadeo, respiración, apertura variable en tres poses, pausa y restauración de sonrisa.
  Capturas `nani/build/page-mouth-*.png` revisadas.
- E2E real en Dia mediante CUA: página cargada, Nani renderizada, botón pausa cambia
  a Hablar y reanuda; captura de pose derecha con boca abierta y parpadeo simultáneo.
  CUA funciona de nuevo en esta continuación; el bloqueo histórico siguiente ya no aplica.
- El servidor anterior había terminado. Portless falló al escribir ~/.portless/proxy.log
  (EPERM); fallback Python iniciado en el directorio original, sesión exec 30623,
  `python3 -m http.server 4173 --bind 127.0.0.1`.
  URL vigente: `http://127.0.0.1:4173/?v=mouth-v1`.

---

## Prueba 3D local — Three.js, 8 de octubre de 2026

El usuario autorizó probar 3D y eligió empezar localmente con Three.js. La prueba
está en `3d/index.html`, URL del servidor existente `http://127.0.0.1:4173/3d/`.
No reemplaza la landing Rive. Trabajo en este directorio, sin worktree.

- `3d/model.mjs`: busto procedural aproximado de Nani, 42 meshes / 68,944 triángulos.
  Geometría volumétrica real, sin proyección de PNG ni crossfade. No es una reconstrucción
  fiel desde las referencias. Tiene cuello/cabeza jerárquicos, ojos con gaze independiente,
  párpados esféricos que cierran, pelo/rodete/anteojos unidos a la cabeza y torso.
- `3d/app.mjs`: renderer WebGL2, seguimiento X/Y, compensación de giro parental para
  mirar un objetivo compartido, giro de cuello/cabeza amortiguado, parpadeos y respiración.
  Botones de seguimiento, demostración del giro y comparación con la referencia.
  Reduced motion desactiva movimiento autónomo, respiración, giro de demo y parpadeos.
- Three.js 0.179.1 copiado de una dependencia local a `3d/vendor/`, con licencia MIT.
  No necesita CDN, cuenta externa ni secretos. No se generó GLB ni rig de Blender todavía.
- `node --check` pasó en ambos módulos; arnés temporal `/private/tmp/nani-3d-check.mjs`
  comprobó rotaciones, mirada X/Y de ambos ojos, límites, cierre/reapertura de párpados,
  respiración, reduced motion y coordenadas finitas. Capturas de proyección CPU de la
  geometría en `/private/tmp/nani-3d-front.png` y `/private/tmp/nani-3d-side.png` revisadas.
  Estas capturas no validan shaders ni iluminación WebGL.
- E2E de navegador pendiente: CUA volvió a fallar con `Sky Computer Use native pipe startup
  failed`, sin navegadores. HTTP 200 verificado con curl para la página y los módulos locales. El proceso Python existente
  sigue escuchando 127.0.0.1:4173 con cwd del proyecto original; Portless previamente EPERM.
  No se afirma validación visual en navegador. No hay suites del proyecto.
- Vault no tiene `MESHY_API_KEY`; no se subieron imágenes ni consumieron créditos.
  Próximo paso: revisar en navegador el movimiento y decidir si refinar este modelo o generar
  una base más fiel y hacer rig facial en Blender.

---

## Estado vigente — poses originales y mirada lateral, 8 de octubre de 2026

Este estado reemplaza el giro por deformación de la cara, rechazado por el usuario,
y las implementaciones históricas siguientes. Trabajo directo en el directorio original,
sin una nueva worktree, por instrucción del usuario.

- `nani/scene.rml`: tres assets originales embebidos: frontal (`gaze/gaze-center.png`),
  izquierda (`../Imagen de Codex 8 oct 2026, 10_31_10.png`) y derecha
  (`../Imagen de Codex 8 oct 2026, 10_30_55.png`). No hay mallas ni proyección de cara.
- Cada pose tiene máscaras vectoriales de cabeza/cuello y de torso, analizadas desde
  los píxeles originales. El torso de cada pose conserva su camisa y collar correspondientes,
  evitando unir un cuello lateral a la camisa frontal. Una base del mismo cuello queda
  detrás del cuello móvil para cubrir la unión durante las inclinaciones. Los PNG no se reescriben.
- Cabeza/cuello se animan desde el pivote a altura de collar; los torsos siguen la respiración.
  El torso también cambia de orientación al seleccionar una pose lateral.
- `index.html`: selección con histéresis (entrada lateral a |X| > 0.28; regreso al frente
  a |X| < 0.18), transición de opacidad de 140 ms que termina en una sola pose.
  Al pasar de izquierda a derecha se atraviesa la frontal. Durante esos 140 ms pueden
  verse ambas imágenes: es una transición entre tres poses, no un modelo 3D interpolado.
- Conserva el rig frontal de pupilas y párpados. Las cuatro pupilas laterales ahora
  tienen seguimiento continuo mediante `sidePupilX`; la mirada vertical y apertura
  siguen los bindings comunes. Las escalas de cada ojo conservan la perspectiva lateral.
  Las texturas de iris provienen de la imagen correspondiente a cada pose.
- El blanco de cada ojo cubre el iris original. La corrección de piel lateral usa colores
  ajustados desde píxeles de la misma imagen y aparece sólo durante el parpadeo vía
  `sideBlink`. Máscaras limitan las capas al interior de los lentes.
- Respiración/inclinación propia en una timeline de Rive de 15 s; miradas laterales
  autónomas breves tras 8 s sin movimiento del mouse. Movimiento de cabeza desde
  el puntero: suavizado 340 ms, desplazamiento máximo 2 px por eje y giro leve 0.018 rad.
- `scripts/generate-pose-rig.py`: generación repetible de contornos cerrados, referencias,
  máscaras, capas y bindings. Después de ejecutarlo, verificar/inspeccionar/compilar
  desde `nani/`. Usa Pillow y NumPy para análisis, sin editar raster ni generar imágenes.
- Build: `nani/build/nani.riv`, 4,594,517 bytes, sin scripts Luau. Cache: `side-gaze-v5`.
- Todas las imágenes descargadas y de `nani/gaze/` permanecen intactas.

Verificación: Rive verify/inspect/build sin problemas. El HTML actual se ejecuta en el
WASM real `@rive-app/canvas@2.44.0` con DOM simulado y canvas nativo. Pasaron selección
frontal/lateral, transición breve normalizada, final de transición con una sola pose,
regreso al centro, mirada frontal y seguimiento X/Y de ambas pupilas en cada pose lateral, cierre/reapertura y parpadeo en ambos lados, respiración
y movimiento propio. Capturas reales del build revisadas en `nani/build/page-*.png`.
Plan de evolución: `NANI_3D_PLAN.md` documenta modelo multivista, rig facial/cuello y GLB
para Three.js, con fuentes primarias y herramientas pendientes. No se creó un modelo 3D.
Arnés: `/private/tmp/nani-render-tools/verify-side-gaze.cjs`; no adapta mallas ni deforma texturas.

E2E de navegador bloqueado: control nativo devuelve `Sky Computer Use native pipe startup
failed`, sin navegadores disponibles. Chromium también falla por permisos de macOS al
iniciar MachPortRendezvous. El arnés simulado no verifica HTTP ni el DOM real del navegador.
El servidor existente escucha en `127.0.0.1:4173` desde el directorio original; Portless
no pudo abrir su proxy (`EPERM`). No existe package.json ni suites de unit/integration,
typecheck o lint. `git diff --check` pasó; el snapshot staged se conserva.

---


Documento de traspaso. Estado real verificado en disco, hallazgos técnicos, mediciones de
assets y tareas pendientes.

---

## 1. Objetivo

Landing que tenga **solamente la figura de Nani centrada**, animada, que **siga el mouse** y
**parpadee**. El usuario eligió explicitamente la ruta **Rive de verdad (CLI + RML)**, no
CSS/JS puro.

---

## 2. Estado actual

### Hecho

| Item | Detalle |
|---|---|
| Rive CLI instalada | `rive 1.5.0` en `/Users/ramiro/.rive/bin/rive` (darwin-arm64) |
| PATH | `export PATH="$HOME/.rive/bin:$PATH"` ya agregado a `~/.zshrc` |
| Proyecto Rive | Nani centrada, view model, binds, máquina de estados, nueve poses de mirada y dos párpados vectoriales |
| Assets | `nani/gaze/*.png`: pose neutra más ocho direcciones, con alpha y lienzo 998x1576 |
| Mirada | `index.html` interpola las nueve poses según el puntero, con desplazamiento, giro y respiración suaves |
| Parpadeo | Animado desde el view model; los óvalos están ubicados sobre los lentes según sus coordenadas medidas |
| Riesgo unsigned | El build no incluye scripts Luau. La vista previa interactiva quedó pendiente en esta continuación |
| Verificación Rive | `--verify`, `inspect --summary` y `--once` limpios; build unsigned de 13.83 MB |

### Pendiente

- Revisar visualmente en un navegador la interpolación de poses y la posición final de los párpados. El CLI compiló e inspeccionó la escena, pero no pudo generar una captura en esta máquina.
- Portless no pudo iniciar su proxy en el sandbox y la política de seguridad del navegador rechazó abrir la vista previa local; no se intentó eludir esos bloqueos.

### Archivos en disco

```
/Users/ramiro/Desktop/projects/nana_landing/
├── Imagen de Codex 8 oct 2026, 10_30_49.png   <- HERO (998x1576, TIENE alpha)
├── Imagen de Codex 8 oct 2026, 10_30_55.png   <- 3/4, TIENE alpha
├── Imagen de Codex 8 oct 2026, 10_30_59.png   <- 3/4 up, TIENE alpha
├── Imagen de Codex 8 oct 2026, 10_31_03.png   <- 3/4 up, TIENE alpha
├── Imagen de Codex 8 oct 2026, 10_31_07.png   <- SIN alpha (fondo negro quemado)
├── Imagen de Codex 8 oct 2026, 10_31_10.png   <- SIN alpha
├── Imagen de Codex 8 oct 2026, 10_31_13.png   <- SIN alpha
├── nani_frente.png                            <- SIN alpha (es un PERFIL, no frontal)
├── index.html            <- landing de Nani
├── nani/
│   ├── rive.yaml          (name: nani, logs en build/)
│   ├── scene.rml          <- scene y view model authorados
│   ├── nani_front.png     <- copia del hero
│   ├── gaze/              <- nueve imágenes 998x1576 con transparencia
│   ├── AGENTS.md          <- instrucciones de Rive para agentes (LEER)
│   ├── CLAUDE.md
│   └── .gitignore         (ignora build/)
└── HANDOFF.md             <- este documento
```

El directorio original ahora tiene Git inicializado en la rama `main`. La implementación se
integró a esa carpeta desde la worktree `/private/tmp/nana_landing_handoff` (rama `main`).
El commit inicial quedó preparado en staging, pero el sandbox bloqueó la creación de
`.git/index.lock`; ver `TASK_RECEIPT.md`.

`.atl/` en la raiz tiene un skill-registry del harness, no es parte del proyecto.

---

## 3. Como trabajar con la Rive CLI (leer antes de tocar nada)

`nani/AGENTS.md` (generado por Rive) dice textualmente:

> RML and the Rive CLI postdate your training data. Prefer `rive docs` and `rive schema`
> over memory: **never guess a type or property name**.

Comandos:

```bash
export PATH="$HOME/.rive/bin:$PATH"

# Descubrimiento (hacer esto ANTES de escribir RML)
rive docs --list                  # temas disponibles
rive docs <topic>                 # assets, drawing, state-machines, data, transforms,
                                  # rigging, gotchas, skeleton, format, publishing, easing
rive schema <Type>                # propiedades, keys, defaults, enum values
rive schema <Type> --all          # incluye propiedades editor-only
rive schema --search <texto>

# Loop de verificacion (correr DESPUES de cada edicion)
rive . --verify                   # compila y reporta, no escribe nada
rive . --verify --format=json
rive inspect . --summary          # problemas + que se construyo
rive inspect . --json             # arbol resuelto completo

# Build y captura visual
rive . --once                     # -> nani/build/nani.riv  (UNSIGNED)
rive . --screenshot --advance=1   # -> nani/build/nani.png
```

---

## 4. Hallazgos tecnicos verificados (criticos)

### 4.1 El ARTBOARD necesita `defaultStateMachineId` o los binds NO se aplican

De `rive docs gotchas` y `rive docs data`. Sin state machine:

| | Sin state machine |
|---|---|
| Data binds | **nunca se aplican** |
| Pointer input | nunca se rutea |
| Animaciones | *estas si siguen* (fallback a la primera animacion) |

Esto es una trampa: el archivo "se mueve" y parece vivo, pero los binds estan inertes.
`rive inspect` avisa con `no-default-state-machine`.

### 4.2 RESTRICCION CRITICA: builds locales UNSIGNED vs. runtime web

De `rive docs publishing`:

- `rive . --once` produce un `.riv` **unsigned**.
- `rive . --publish` produce uno signed, pero **requiere login** (`rive login`, abre browser).
- `nani/AGENTS.md` dice: *"Do not write an HTML page or use a web runtime to preview:
  web runtimes reject the **unsigned scripts** local builds carry."*

**Interpretacion (a verificar empiricamente):** el rechazo es especificamente de los
**scripts Luau** sin firmar, no del archivo entero. Si el `.riv` **no contiene scripts**,
deberia cargar en `@rive-app/canvas`.

**DECISION TOMADA: no usar Luau scripts en absoluto.** Todo se maneja con view model +
data binding, y el host JS escribe las propiedades. Si esta interpretacion es incorrecta,
el plan B es pedirle al usuario `rive login` + `rive publish`.

> **RIESGO ABIERTO #1 — verificar ANTES de invertir en el scene completo.**
> Generar un `.riv` minimo (imagen + state machine, sin scripts), cargarlo en
> `@rive-app/canvas` en el navegador y confirmar que renderiza. Es la premisa mas
> riesgosa de todo el plan.

### 4.3 `Node` ES el grupo

No existe un tipo `Group` (`rive schema Group` -> unknown). `Node` no dibuja nada y
existe para sostener un transform que los hijos heredan.

```xml
<Node x="150" y="100" rotation="0.5235988" name="Dial" id="0:20">
    <Shape name="Hand" id="0:21">...</Shape>
</Node>
```

### 4.4 Propiedades de transform (todas `AB` = animatable + **bindable**)

| Propiedad | propertyKey | Default |
|---|---|---|
| `x` | 13 | 0 |
| `y` | 14 | 0 |
| `rotation` | **15** | 0 (**RADIANES**, vuelta completa = 6.2831855) |
| `scaleX` | 16 | 1 |
| `scaleY` | 17 | 1 |
| `opacity` | **18** | 1 |

`opacity` **multiplica** hacia abajo: un `Node` con opacity 0.5 conteniendo un shape con
opacity 0.5 renderiza a 0.25.

### 4.5 Data binding

`DataBindContext` se anida **bajo el objeto que drivea**:

```xml
<TextValueRun styleId="0:21" text="placeholder" name="Run">
    <DataBindContext sourcePathIds="0:40-0:45" propertyKey="268"/>
</TextValueRun>
```

- `sourcePathIds` es un path **ABSOLUTO** separado por guiones: `<ViewModeId>-<PropertyId>`.
  Los paths relativos **no estan soportados**.
- `propertyKey` = la key de la propiedad destino (13/14/15/16/17/18 para transforms).
- **Un path colgado NO es error de build**: compila, carga y **no hace nada en silencio**.
  Hay que verificar con `rive inspect`, no asumir.
- Hay que bindear la propiedad que **realmente existe en el target** (`width` vive en
  `Rectangle`, no en el `Shape` que lo contiene).
- `converterId` permite meter un converter (ej. `DataConverterRangeMapper` para remapear
  rangos). **Si el JS ya manda valores finales, no hace falta converter.**

### 4.6 View models (la forma moderna, NO usar state machine inputs)

`StateMachineBool` / `StateMachineNumber` / `StateMachineTrigger` estan **deprecados**.
Se usan view models:

```xml
<Artboard viewModelId="0:40" viewModelInstanceId="0:41" width="300" height="120"
          name="Battery" id="0:2"> ... </Artboard>

<ViewModel defaultInstanceId="0:41" name="Battery" id="0:40">
    <ViewModelPropertyNumber name="level" id="0:45"/>
    <ViewModelInstance exports="true" name="Default" id="0:41">
        <ViewModelInstanceNumber propertyValue="72" viewModelPropertyId="0:45"/>
    </ViewModelInstance>
</ViewModel>
```

Tres links obligatorios: artboard -> `viewModelId`; view model -> `defaultInstanceId`;
cada valor de instancia -> `viewModelPropertyId`.

`defaultInstanceId` y `exports` son **editor-only**: `rive schema ViewModel` no los lista,
hay que usar `--all`. Pero son authorables.

Convencion: **PascalCase** para view models, **camelCase** para propiedades. Una propiedad
sin valor de instancia no tiene default y lee vacio.

### 4.7 API del runtime web (JS -> Rive)

`@rive-app/canvas` **v2.44.0**. Verificado en `rive.d.ts`:

```ts
// Rive
setViewModelInstance(vmi: ViewModelInstance | null): void;
bindViewModelInstance(vmi: ViewModelInstance | null): void;   // setViewModelInstance + bind()
get viewModelInstance(): ViewModelInstance | null;
setGlobalViewModelInstance(name: string, vmi: ViewModelInstance): boolean;
globalViewModelInstance(name: string): ViewModelInstance | null;
play(animationNames?, autoplay?): void;

// ViewModelInstance
number(path: string): ViewModelInstanceNumber | null;
boolean(path: string): ViewModelInstanceBoolean | null;
trigger(path: string): ViewModelInstanceTrigger | null;
// ...
```

Patron esperado: `vm.number('mouseX').value = v`.

Tambien existe el API clasico `setInputState(stateMachineName, inputName, value)`.

### 4.8 RML: imagenes

```xml
<Image x="100" y="100" assetId="0:60" name="Logo"/>

<ImageAsset file="logo.png" name="logo" id="0:60"/>
```

- Las **assets son root elements**, hermanas del `Artboard`, dentro de `<Rive>`.
- `Image` **no tiene `width`/`height`**: toma el tamano del asset. `x`/`y` + `originX`/`originY`
  la colocan. `originX`/`originY` son **normalizados** (0.5 = centro), default 0.5/0.5.
- El atributo **`file=` NO aparece en `rive schema`** (es authoring-only). Es valido en
  `ImageAsset`, `FontAsset`, etc. Es la unica excepcion a "no adivines nombres".
- El path de `file=` es **relativo al directorio del proyecto** (puede salir con `../`).
- Para deformar una imagen (no solo moverla) hay que anidarle un `Mesh` y skinnear.
- `PaintImage` tiene `imageOffsetX/Y`, `imageScaleX/Y`, `imageRotation` si se necesita.

### 4.9 Gotchas del formato (leidos de `rive docs gotchas`)

- `rotation` en **radianes**; `LinearAnimation.duration` en **frames**; pero
  `StateTransition.duration` en **MILISEGUNDOS**.
- **`exitTimeIsPercetange` esta mal escrito EN EL FORMATO MISMO.** Hay que escribir el typo.
- Los **states NO llevan `name`** (es error de build). Solo se identifican por id.
- Declarar el `StateMachine` **antes** de cualquier `LinearAnimation`.
- Cada state necesita `x`/`y` (posicion en el grafo del editor) o se apilan todas en (0,0).
- **Los valores de enum SI se validan** (error real con valores aceptados). Preferir nombres
  simbolicos antes que enteros.
- El compilador caza nombres mal escritos, pero **NO** cableado incorrecto. Un `--verify`
  limpio no significa que el archivo haga lo pedido.

---

## 5. Mediciones de los assets (hechas con PIL + numpy)

### 5.1 Alpha

| Imagen | Tamano | Alpha |
|---|---|---|
| `10_30_49` | 998x1576 | **SI** (39% pixeles totalmente transparentes) |
| `10_30_55` | 1026x1533 | **SI** (39%) |
| `10_30_59` | 1026x1533 | **SI** (39%) |
| `10_31_03` | 1026x1533 | **SI** (41%) |
| `10_31_07` | 1026x1533 | **NO** (RGB, fondo negro) |
| `10_31_10` | 1026x1533 | **NO** |
| `10_31_13` | 1026x1533 | **NO** |
| `nani_frente` | 998x1576 | **NO** |

Las 4 sin alpha tienen **fondo negro quemado** (esquinas ~(0,0,0)), pero **el sujeto toca
los bordes inferiores** (las esquinas de abajo dieron azul del blazer: ej. `(54,108,216)`).
O sea: no se puede limpiar con un simple threshold global sin comerse el blazer. Si se
necesitan, hay que hacer **flood fill desde los bordes** sobre pixeles casi negros
(threshold ~40-55 en el canal maximo), y despues feather del alpha.

### 5.2 Geometria de los ojos — imagen hero `10_30_49.png` (998x1576)

Detectado por mascara de "esclerotica" (blancos) + escaneo de fila:

| Ojo | Centro | bbox esclerotica |
|---|---|---|
| Izquierdo (vista) | **(326, 803)** | x[288-364] y[758-848] |
| Derecho (vista) | **(661, 802)** | x[632-690] y[759-846] |

Separacion entre ojos: **335 px**.

Escaneo horizontal en `y=803`, x200-470, con threshold de luminancia:
```
x219-236  DARK   <- borde izquierdo del aro
x284-285  dark   <- linea fina
x318-392  DARK   <- iris/pupila (75 px de ancho)
x410-434  DARK   <- borde derecho del aro
```
=> **Interior del lente izquierdo ≈ x[237 .. 409]**, ancho ~173, centro ~323 (coincide con
el centro del ojo).

Simetria => interior del lente derecho ≈ **x[574 .. 747]**, centro ~660.

Como los lentes son **circulares**, el alto interior estimado ≈ ancho ≈ 173 px, centrado en
`y≈803` => **y[716 .. 889]** aprox.

> **INCERTIDUMBRE:** el borde vertical del aro no quedo resuelto limpiamente con thresholds
> (los escaneos verticales en x=326 mostraron oscuros en y694-710 y y743-749 que confunden
> ceja / pestana / aro). **Los limites verticales del lente hay que confirmarlos visualmente.**

### 5.3 Colores muestreados

| Que | Valor |
|---|---|
| Piel del parpado, zona ojo izq | `#E8A87D` (RGB 232,168,125) |
| Piel del parpado, zona ojo der | `#D6966E` (RGB 214,150,110) |
| Aro de los lentes / zona oscura | ~`#201810` (RGB 32,24,16) |

Las dos pieles **difieren** (el render tiene la luz viniendo de un lado). Un parpado de
color plano se va a ver plano contra esa gradiente.

### 5.4 Alineacion entre poses (para el crossfade)

Alineacion por el **torso azul** (la parte mas estable entre poses):

| Imagen | bbox blazer (p1-p99) | centro |
|---|---|---|
| `10_30_49` | x[14-979] y[1237-1573] | (496,1405) |
| `10_30_55` | x[34-954] y[1117-1530] | (494,1324) |
| `10_30_59` | x[42-971] y[1091-1529] | (506,1310) |
| `10_31_03` | x[14-1011] y[1137-1530] | (512,1334) |
| `10_31_07` | x[12-975] y[1145-1530] | (494,1338) |
| `10_31_10` | x[27-998] y[1102-1529] | (512,1316) |
| `10_31_13` | x[24-1011] y[1082-1529] | (518,1306) |
| `nani_frente` | x[139-782] y[1130-1573] | (460,1352) |

El torso esta bastante alineado (los 7 "Codex" bajan hasta y≈1530, centro x≈495-518).
**Pero el tamano de la cara cambia**: alto de cara va de 742 a 919 px entre poses, y el
centro de la cara va de y≈532 a y≈636. O sea: **no alcanza con alinear el torso**; hay
diferencia de escala y de posicion de cabeza. Un crossfade crudo va a hacer *ghosting*.

---

## 6. Diseno implementado

### Arquitectura

```
JS (landing) --pointermove--> pesos de mirada -> opacidades Rive
                         └-> view model -> desplazamiento, giro, respiración y parpadeo
```

Todo el movimiento pasa por el view model. **Cero scripts Luau.**

### Jerarquia del artboard

```xml
<Rive version="1" kind="fragment">
  <Artboard defaultStateMachineId="..." viewModelId="..." viewModelInstanceId="..."
            width="..." height="..." name="Nani" id="0:2">
      <LayoutComponentStyle name="Artboard Style" id="0:5"/>
      <Fill name="Background"><SolidColor colorValue="FF0E1116" name="Color"/></Fill>

      <Node name="Breath" id="...">            <!-- animacion: respiracion (keyframes) -->
        <Node name="Mouse" id="...">           <!-- binds: mouseX/mouseY/rotation -->
          <Image assetId="..." name="Nani" id="..."/>
          <!-- 2 shapes = parpados, binds a `blink` -->
        </Node>
      </Node>

      <StateMachine name="State Machine 1" id="..."> ... </StateMachine>
      <LinearAnimation name="Idle" ...> ... </LinearAnimation>
  </Artboard>

  <ImageAsset file="nani_front.png" name="nani_front" id="..."/>

  <ViewModel defaultInstanceId="..." name="NaniVm" id="..."> ... </ViewModel>
</Rive>
```

**Por que dos `Node` separados:** para no pisar la misma propiedad con una animacion
keyframeada *y* un data bind al mismo tiempo. El de afuera se anima (respiracion), el de
adentro se bindea (mouse).

### View model actual

| Propiedad | Tipo | Uso |
|---|---|---|
| `mouseX` | Number | offset X final en px (lo calcula el JS) |
| `mouseY` | Number | offset Y final en px |
| `rotation` | Number | rotacion en **radianes** |
| `blink` | Number | 0 = abierto, 1 = cerrado |
| `gazeCenter` + 8 direcciones | Number | pesos de opacidad para interpolar las poses |

Que el JS mande **valores finales** (px / radianes) evita necesitar converters.

### Parpadeo — el problema real

**Ninguna de las 8 imagenes tiene los ojos cerrados.** Los ojos estan **quemados en el PNG**.
Rive riggea vectores y huesos; no hay capa de ojo separada. Entonces:

**Opcion A (elegida): parpados como shapes en Rive.**
Dos shapes color piel colocados **dentro del aro del lente**, con `originY=0` (arriba), y
`scaleY` bindeado a `blink` (0 -> 1). Al crecer hacia abajo tapan el ojo. Como quedan
**dentro del lente**, no tapan el aro negro.
*Pro:* animacion real (el parpado barre), vectorial, sin preprocesar imagenes.
*Con:* el color plano puede cantar contra la piel sombreada del render.

**Opcion B: pre-renderizar un frame de ojos cerrados con PIL** y hacer crossfade de opacity
entre dos `Image` en Rive.
*Pro:* control total de pixeles, verificable como PNG antes de tocar RML.
*Con:* hay que dibujar el parpado con shading creible; en Rive queda un dissolve, no un barrido.

**Opcion C: mesh deform.** Rive soporta `Mesh` en imagenes y skinning. Es lo mas "pro" y lo
mas caro: authorar vertices a mano en RML sobre la zona del ojo.

### Seguimiento del mouse

Las nueve imágenes están normalizadas a 998x1576. El JS mapea el puntero a una grilla 3x3 y
suaviza los pesos para mezclar poses adyacentes; también desplaza y gira levemente el grupo.
La respiración y el parpadeo siguen en el view model. Falta confirmar su apariencia en un
navegador interactivo.

---

## 7. Tareas pendientes

| # | Tarea | Estado |
|---|---|---|
| 1 | `.riv` sin scripts Luau | Build e inspect limpios; revisión de navegador pendiente en esta continuación. |
| 2 | Normalizar poses | Hecho: nueve PNG con alpha y lienzo común 998x1576. |
| 3 | Authorar `scene.rml` | Hecho: nueve imágenes, view model, binds, párpados y state machine. |
| 4 | Compilar y verificar | `--verify`, `inspect --summary` y `--once` limpios; build de 13.83 MB. |
| 5 | Landing HTML | Hecho: interpolación de mirada, respiración, parpadeo y seguimiento leve del personaje. |
| 6 | Revisión visual interactiva | Pendiente: CLI sin Metal; Portless no pudo iniciar y el navegador rechazó la vista previa local. |
| 7 | Refinar párpados | Ubicados sobre las lentes según las coordenadas medidas; falta validar visualmente y ajustar si hace falta. |

---

## 8. Codigo de referencia

### Landing implementada

La implementación completa está en `index.html`. Puntos necesarios del runtime 2.44.0:

```js
const player = new window.rive.Rive({
  src: 'nani/build/nani.riv',
  canvas: document.getElementById('nani'),
  autoplay: true,
  autoBind: true,
  stateMachine: 'State Machine 1',
  onLoad() {
    player.resizeDrawingSurfaceToCanvas();
    const vm = player.viewModelInstance;
    player.bind();
    vm.number('mouseX').value = 0;
    vm.number('blink').value = 0;
  },
});
```

`autoBind: true` es necesario para obtener la instancia predeterminada en `viewModelInstance`.
`player.bind()` aplica el view model al state machine después de escribir los valores iniciales.
El nombre del parámetro actual es `stateMachine` (singular); `stateMachines` está deprecado.

El canvas conserva el aspect ratio 998/1576. La landing redimensiona la superficie Rive
cuando cambia el tamaño de la ventana.

### Script de medicion (por si hay que re-medir)

```python
from PIL import Image
import numpy as np
im = Image.open('Imagen de Codex 8 oct 2026, 10_30_49.png').convert('RGBA')
a = np.array(im).astype(int)
rgb, al = a[:,:,:3], a[:,:,3]
# esclerotica
white = (rgb[:,:,0]>195)&(rgb[:,:,1]>185)&(rgb[:,:,2]>175)&(al>128)
# piel
skin = (rgb[:,:,0]>150)&(rgb[:,:,0]>rgb[:,:,1]+18)&(rgb[:,:,1]>rgb[:,:,2]+8)&(al>128)
# blazer azul
blue = (rgb[:,:,2]>rgb[:,:,0]+45)&(rgb[:,:,2]>rgb[:,:,1]+30)&(rgb[:,:,2]>110)&(al>128)
```

Dependencias: `numpy` (se instalo con `pip install numpy`), `PIL` 11.3.0.

---

## 9. Restricciones del entorno

- La revisión visual previa correspondía a la versión de una pose. En esta continuación `rive --screenshot`/`--data-dump` no funcionaron porque el CLI no encontró Metal disponible; la vista previa local también fue rechazada por la política del navegador.
- macOS **arm64**. La Rive CLI solo soporta Apple Silicon en macOS.
- No hay `package.json`; la landing es estática y carga `@rive-app/canvas@2.44.0` desde un CDN.
- El directorio fuente original continúa sin repo Git; esta continuación vive en una copia aislada con Git/Worktrunk.
- Rive CLI **no esta en el PATH por defecto** de un shell nuevo hasta que se recargue
  `.zshrc`, o hay que exportarlo.
- Para que los binds funcionen en el runtime web se debe usar `autoBind: true`; después de asignar valores iniciales, `player.bind()` aplica el view model. En `@rive-app/canvas@2.44.0` se usa `stateMachine` (singular).
