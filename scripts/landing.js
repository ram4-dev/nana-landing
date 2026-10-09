(() => {
  const form = document.getElementById('waitlist-form');
  const status = document.getElementById('waitlist-status');
  const submit = document.getElementById('waitlist-submit');
  const email = document.getElementById('email');
  function updateEmailPose() {
    const active = document.activeElement === email;
    window.naniPose?.setThumbsUp(active);
    if (active) window.naniSpeech?.pause();
  }
  email.addEventListener('focus', updateEmailPose);
  email.addEventListener('blur', updateEmailPose);
  updateEmailPose();
  const endpoint = form.getAttribute('action');
  const tokenKey = 'nana.waitlist.token';
  let busy = false;
  const tell = (message, state) => { status.textContent = message; status.dataset.state = state; };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    busy = true; submit.disabled = true; submit.textContent = 'Saving…';
    tell('', '');
    try {
      const data = new FormData(form);
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: data.get('email'), website: data.get('website') }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'We couldn’t save your email. Please try again.');
      if (result.token) { try { localStorage.setItem(tokenKey, result.token); } catch {} }
      tell('You’re on the list. We’ll let you know when you can try Nana.', 'success');
      form.reset();
    } catch (error) {
      tell(error instanceof TypeError ? 'We couldn’t connect. Please try again in a moment.' : error.message, 'error');
    } finally {
      busy = false; submit.disabled = false; submit.textContent = 'Join the waitlist ↗';
    }
  });
  document.getElementById('unsubscribe').addEventListener('click', async event => {
    event.preventDefault();
    form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    let token; try { token = localStorage.getItem(tokenKey); } catch {}
    if (!token) { tell('There’s no signup saved in this browser.', 'error'); return; }
    if (busy) return;
    busy = true;
    try {
      const response = await fetch(endpoint, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
      if (!response.ok) throw new Error('We couldn’t remove your email. Please try again.');
      try { localStorage.removeItem(tokenKey); } catch {}
      tell('Your email has been removed from the waitlist.', 'success');
    } catch (error) { tell(error.message, 'error'); }
    finally { busy = false; }
  });
  // Audio is generated once on the server; page views do not call the provider.
  const welcome = fetch('/api/nani/welcome').then(async response => {
    if (!response.ok) {
      // Static previews can serve the generated file without the Node API.
      if (response.status !== 404) return null;
      const file = await fetch('/audio/nani-welcome.json');
      if (!file.ok) return null;
      const metadata = await file.json();
      return metadata.provider === 'elevenlabs' ? { ...metadata, source: '/audio/nani-welcome.mp3?v=' + encodeURIComponent(metadata.generatedAt) } : null;
    }
    const result = await response.json();
    return result.provider === 'elevenlabs' && result.source ? result : null;
  }).catch(() => null);
  let tries = 0;
  const ready = setInterval(async () => {
    if (window.naniSpeech) {
      clearInterval(ready);
      document.getElementById('character-stage').dataset.ready = 'true';
      updateEmailPose();
      const metadata = await welcome;
      if (!metadata) return;
      window.naniSpeech.setSource(metadata.source);
      const canvas = document.getElementById('nani');
      canvas.setAttribute('role', 'button');
      canvas.setAttribute('tabindex', '0');
      canvas.setAttribute('aria-label', 'Play Nani’s welcome');
      const play = () => window.naniSpeech.play();
      canvas.addEventListener('click', play);
      canvas.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); play(); }
      });
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && document.visibilityState === 'visible' && document.activeElement !== email) window.naniSpeech.play({ quiet: true });
    } else if (++tries > 200) clearInterval(ready);
  }, 100);
})();
