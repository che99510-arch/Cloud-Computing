// In development, requests go to /api (proxied to localhost:8000)
// In production, requests go directly to the Render backend URL
const BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : '';

export function apiUrl(path) {
  if (BASE) {
    // production — direct URL to Render backend
    return `${BASE}${path}`;
  }
  // development — use Vite proxy
  return `/api${path}`;
}
