/** Inline placeholder used when a remote photo can't be loaded. */
export const PHOTO_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#ECE9FB'/><stop offset='1' stop-color='#D8DEF0'/>
      </linearGradient></defs>
      <rect width='400' height='300' fill='url(#g)'/>
      <text x='200' y='155' font-family='sans-serif' font-size='16'
        fill='#8b8b9c' text-anchor='middle'>photo unavailable offline</text>
    </svg>`
  );

export function streetViewEmbedUrl(lat: number, lng: number) {
  return `https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`;
}

export function mapsLink(lat: number, lng: number) {
  return `https://www.google.com/maps/@${lat},${lng},16z`;
}

export function formatCoord(lat: number, lng: number) {
  return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
}

export function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

export function countdown(expiresAt: number) {
  const diff = expiresAt - Date.now();
  if (diff <= 0) return "expired";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  if (d > 0) return `${d}d ${h}h left`;
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${mins}m left`;
}
