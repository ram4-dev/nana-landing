import { mkdir, writeFile, rename } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
export const welcomeText = "Hi, I’m Nani. Welcome to Nana Wallet. Your money, your voice. Tell me what you’d like to do. I’ll prepare it, and you can review the details before confirming.";
export async function generateWelcome({ apiKey, voiceId, request = fetch, outputDir = resolve(dirname(fileURLToPath(import.meta.url)), '../audio') } = {}) {
  if (!apiKey) throw new Error('Missing ELEVEN_LABS_API_KEY. Inject it with vault-env.');
  if (!voiceId) {
    const response = await request('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': apiKey }, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`ElevenLabs voice selection failed (${response.status}).`);
    const { voices } = await response.json();
    const candidates = (voices || []).filter(voice => voice.labels?.gender === 'female' && (voice.labels?.language === 'en' || /american|british|english/i.test(voice.labels?.accent || '')));
    const chosen = candidates.find(voice => /sarah|jessica|rachel/i.test(voice.name)) || candidates[0];
    if (!chosen) throw new Error('No English female voice available. Set ELEVENLABS_VOICE_ID.');
    voiceId = chosen.voice_id;
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(voiceId)) throw new Error('Invalid ELEVENLABS_VOICE_ID.');
  const response = await request(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: welcomeText, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    signal: AbortSignal.timeout(60000)
  });
  if (!response.ok) throw new Error(`ElevenLabs speech generation failed (${response.status}).`);
  const audio = Buffer.from(await response.arrayBuffer());
  if (!response.headers.get('content-type')?.includes('audio/') || audio.length < 1000) throw new Error('ElevenLabs returned invalid audio.');
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'nani-welcome.mp3.tmp'), audio);
  await rename(resolve(outputDir, 'nani-welcome.mp3.tmp'), resolve(outputDir, 'nani-welcome.mp3'));
  await writeFile(resolve(outputDir, 'nani-welcome.json.tmp'), JSON.stringify({ provider: 'elevenlabs', text: welcomeText, generatedAt: new Date().toISOString() }));
  await rename(resolve(outputDir, 'nani-welcome.json.tmp'), resolve(outputDir, 'nani-welcome.json'));
  return { bytes: audio.length };
}
if (resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  try {
    const result = await generateWelcome({ apiKey: process.env.ELEVEN_LABS_API_KEY || process.env.ELEVENLABS_API_KEY, voiceId: process.env.ELEVENLABS_VOICE_ID });
    console.log(`English ElevenLabs welcome saved (${result.bytes} bytes).`);
  } catch (error) {
    // Never print provider bodies, request headers, or raw network errors.
    console.error(error.message?.startsWith('Missing ') || error.message?.startsWith('ElevenLabs ') || error.message?.startsWith('No English ') || error.message?.startsWith('Invalid ') ? error.message : 'Welcome generation failed. Check connectivity and retry.');
    process.exitCode = 1;
  }
}
