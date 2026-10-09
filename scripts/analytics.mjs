import { inject } from '../vendor/vercel-analytics-2.0.1.mjs';

const hostname = window.location.hostname;
const local = hostname === 'localhost' || hostname.endsWith('.localhost') || hostname === '127.0.0.1' || hostname === '[::1]' || window.location.protocol === 'file:';
if (!local) {
  inject({
    mode: 'production',
    beforeSend(event) {
      const url = new URL(event.url, window.location.origin);
      url.search = '';
      url.hash = '';
      return { ...event, url: url.href };
    }
  });
}
