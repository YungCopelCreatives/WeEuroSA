// WeEuroSA: live weather for Europe and South Africa from the 7Timer! API.
// Developed by Cebo Mlotshwa.

const API = 'https://www.7timer.info/bin/api.pl';
const GEO = 'https://nominatim.openstreetmap.org/reverse';
const STORE_KEY = 'weeurosa:city';

// Time zones so each city shows its own local time.
const ZONES = {
  'South Africa': 'Africa/Johannesburg', Netherlands: 'Europe/Amsterdam', Turkey: 'Europe/Istanbul', Sweden: 'Europe/Stockholm',
  Greece: 'Europe/Athens', 'Northern Ireland': 'Europe/London', England: 'Europe/London', Wales: 'Europe/London', Scotland: 'Europe/London',
  Spain: 'Europe/Madrid', Germany: 'Europe/Berlin', Switzerland: 'Europe/Zurich', Belgium: 'Europe/Brussels', Romania: 'Europe/Bucharest',
  Hungary: 'Europe/Budapest', Denmark: 'Europe/Copenhagen', Ireland: 'Europe/Dublin', Italy: 'Europe/Rome', France: 'Europe/Paris',
  Portugal: 'Europe/Lisbon', 'British Territory': 'Europe/Gibraltar', Finland: 'Europe/Helsinki', Ukraine: 'Europe/Kyiv', Norway: 'Europe/Oslo',
  'Czech Republic': 'Europe/Prague', Iceland: 'Atlantic/Reykjavik', Latvia: 'Europe/Riga', Bulgaria: 'Europe/Sofia', Estonia: 'Europe/Tallinn',
  Austria: 'Europe/Vienna', Poland: 'Europe/Warsaw'
};
const CITY_ZONES = { Maspalomas: 'Atlantic/Canary', 'Santa Cruz de Tenerife': 'Atlantic/Canary', Funchal: 'Atlantic/Madeira', 'Santa Cruz das Flores': 'Atlantic/Azores' };

const WEATHER = {
  clear: 'Clear', pcloudy: 'Partly cloudy', mcloudy: 'Mostly cloudy', cloudy: 'Cloudy', humid: 'Humid and hazy', fog: 'Fog',
  lightrain: 'Light rain', oshower: 'Occasional showers', ishower: 'Isolated showers', rain: 'Rain', lightsnow: 'Light snow',
  snow: 'Snow', rainsnow: 'Rain and snow', tsrain: 'Thunderstorms', tstorm: 'Thunderstorms possible'
};
const WIND = ['', 'Calm', 'Light', 'Moderate', 'Fresh', 'Strong', 'Gale', 'Storm', 'Hurricane'];
const WIND_KMH = ['', '0 to 1', '1 to 12', '12 to 29', '29 to 39', '39 to 62', '62 to 88', '88 to 117', 'over 117'];
const DIRS = { N: 'north', NE: 'northeast', E: 'east', SE: 'southeast', S: 'south', SW: 'southwest', W: 'west', NW: 'northwest' };
const CLOUD_PCT = [0, 3, 12, 25, 37, 50, 62, 75, 87, 97];
const RAIN = ['None', 'Under 0.25 mm', '0.25 to 1 mm', '1 to 4 mm', '4 to 10 mm', '10 to 16 mm', '16 to 30 mm', '30 to 50 mm', '50 to 75 mm', 'Over 75 mm'];

const $ = (id) => document.getElementById(id);
const els = {
  city: $('city'), locate: $('locate'), place: $('place'), country: $('country'), date: $('date'), temp: $('temp'), icon: $('icon'),
  cond: $('cond'), range: $('range'), humidity: $('humidity'), wind: $('wind'), windS: $('wind-s'), cloud: $('cloud'), cloudS: $('cloud-s'),
  rain: $('rain'), hours: $('hours'), days: $('days'), status: $('status'), app: document.querySelector('.app')
};
let current = null;
let requestId = 0;

/* ---------- icons ---------- */
const cloudPath = (x, y, s, cls = 'cloud') =>
  `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M14 30h20a8 8 0 0 0 0-16 11 11 0 0 0-21 3 6.5 6.5 0 0 0 1 13z"/>`;
const sun = (cx, cy, r) => {
  let rays = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    rays += `<line class="sun-ray" x1="${(cx + Math.cos(a) * (r + 4)).toFixed(1)}" y1="${(cy + Math.sin(a) * (r + 4)).toFixed(1)}" x2="${(cx + Math.cos(a) * (r + 8)).toFixed(1)}" y2="${(cy + Math.sin(a) * (r + 8)).toFixed(1)}"/>`;
  }
  return rays + `<circle class="sun-core" cx="${cx}" cy="${cy}" r="${r}"/>`;
};
const moon = (cx, cy, r) => `<path class="moon" d="M${cx + r * 0.3} ${cy - r}a${r} ${r} 0 1 0 ${r * 0.7} ${r * 1.55}A${r * 0.82} ${r * 0.82} 0 0 1 ${cx + r * 0.3} ${cy - r}z"/>`;
const drops = (n) => [16, 24, 32].slice(0, n).map((x) => `<line class="drop" x1="${x}" y1="38" x2="${x - 2}" y2="44"/>`).join('');
const flakes = () => [17, 25, 33].map((x, i) => `<circle class="flake" cx="${x}" cy="${40 + (i % 2) * 3}" r="2"/>`).join('');

function icon(code, night) {
  const body = (() => {
    switch (code) {
      case 'clear': return night ? moon(24, 24, 11) : sun(24, 24, 9);
      case 'pcloudy': return (night ? moon(18, 17, 8) : sun(18, 17, 7)) + cloudPath(6, 8, 1);
      case 'mcloudy': return (night ? moon(16, 14, 7) : sun(16, 14, 6)) + cloudPath(2, 6, 1, 'cloud back') + cloudPath(8, 10, 0.95);
      case 'cloudy': return cloudPath(-2, 2, 1, 'cloud back') + cloudPath(5, 8, 1);
      case 'humid':
      case 'fog': return cloudPath(2, -2, 1, 'cloud back') + '<line class="mist" x1="10" y1="34" x2="38" y2="34"/><line class="mist" x1="14" y1="40" x2="34" y2="40"/>';
      case 'lightrain':
      case 'oshower':
      case 'ishower': return (night ? '' : sun(32, 12, 5)) + cloudPath(2, 2, 1) + drops(2);
      case 'rain': return cloudPath(2, 2, 1) + drops(3);
      case 'lightsnow':
      case 'snow': return cloudPath(2, 2, 1) + flakes();
      case 'rainsnow': return cloudPath(2, 2, 1) + '<line class="drop" x1="17" y1="38" x2="15" y2="44"/><circle class="flake" cx="25" cy="42" r="2"/><line class="drop" x1="33" y1="38" x2="31" y2="44"/>';
      case 'tsrain':
      case 'tstorm': return cloudPath(2, 0, 1) + '<path class="bolt" d="M25 30l-6 9h5l-2 8 8-11h-5l3-6z"/>';
      default: return cloudPath(5, 8, 1);
    }
  })();
  return `<svg viewBox="0 0 48 48" role="img" aria-label="${WEATHER[code] || 'Weather'}">${body}</svg>`;
}

/* ---------- helpers ---------- */
const zoneFor = (c) => c.zone || CITY_ZONES[c.city] || ZONES[c.country] || Intl.DateTimeFormat().resolvedOptions().timeZone;
const baseCode = (w) => String(w || '').replace(/(day|night)$/, '');
const isNight = (w) => /night$/.test(String(w || ''));
const pct = (v) => parseInt(String(v), 10);
const local = (date, zone, opts) => new Intl.DateTimeFormat(undefined, { timeZone: zone, ...opts }).format(date);
const localHour = (date, zone) => parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: 'numeric', hour12: false }).format(date), 10) % 24;
const initDate = (init) => new Date(Date.UTC(+init.slice(0, 4), +init.slice(4, 6) - 1, +init.slice(6, 8), +init.slice(8, 10)));
const dayDate = (n) => { const s = String(n); return new Date(Date.UTC(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8), 12)); };

async function fetchJSON(url, tries = 2) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = (await res.text()).replace(/,\s*([}\]])/g, '$1'); // 7Timer sometimes sends trailing commas
      return JSON.parse(text);
    } catch (err) {
      last = err;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw last;
}
const forecast = (c, product) => fetchJSON(`${API}?lon=${c.lon}&lat=${c.lat}&product=${product}&unit=metric&output=json`);

function setStatus(text, err = false) {
  els.status.textContent = text;
  els.status.classList.toggle('err', err);
}

/* ---------- render ---------- */
function setSky(code, night, hour) {
  let sky = 'day';
  if (night || hour < 5 || hour >= 20) sky = 'night';
  else if (hour < 9) sky = 'morning';
  else if (hour >= 17) sky = 'evening';
  if (sky === 'day' && ['cloudy', 'rain', 'tsrain', 'tstorm', 'fog', 'snow', 'rainsnow'].includes(code)) sky = 'grey';
  document.body.dataset.sky = sky;
}

function render(city, civil, light) {
  const zone = zoneFor(city);
  const now = new Date();
  const start = initDate(civil.init);
  const series = civil.dataseries.map((d) => ({ ...d, at: new Date(start.getTime() + d.timepoint * 3600e3) }));
  const idx = Math.max(0, series.findIndex((d) => d.at.getTime() > now.getTime() - 90 * 60e3));
  const cur = series[idx];
  const code = baseCode(cur.weather);
  const night = isNight(cur.weather);
  const today = light.dataseries[0];

  els.place.textContent = city.city;
  els.country.textContent = city.country || '';
  els.date.textContent = local(now, zone, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  els.temp.textContent = `${Math.round(cur.temp2m)}°`;
  els.icon.innerHTML = icon(code, night);
  els.cond.textContent = WEATHER[code] || 'Mixed';
  els.range.textContent = `High ${today.temp2m.max}° · Low ${today.temp2m.min}°`;

  els.humidity.textContent = `${pct(cur.rh2m)}%`;
  const ws = cur.wind10m.speed;
  els.wind.textContent = WIND[ws] || '--';
  els.windS.textContent = `${DIRS[cur.wind10m.direction] ? `From the ${DIRS[cur.wind10m.direction]}` : 'Variable'}, ${WIND_KMH[ws] || '?'} km/h`;
  const cc = CLOUD_PCT[cur.cloudcover] ?? 0;
  els.cloud.textContent = `${cc}%`;
  els.cloudS.textContent = cc < 10 ? 'Clear sky' : cc < 35 ? 'A few clouds' : cc < 65 ? 'Partly cloudy' : cc < 90 ? 'Mostly cloudy' : 'Overcast';
  els.rain.textContent = cur.prec_type === 'none' || !cur.prec_amount ? 'None' : RAIN[cur.prec_amount] || '--';

  els.hours.innerHTML = series.slice(idx, idx + 8).map((d, i) => `
    <div class="hour">
      <span>${i === 0 ? 'Now' : local(d.at, zone, { hour: 'numeric' })}</span>
      <span class="ic">${icon(baseCode(d.weather), isNight(d.weather))}</span>
      <b>${Math.round(d.temp2m)}°</b>
    </div>`).join('');

  const days = light.dataseries.slice(0, 7);
  const lo = Math.min(...days.map((d) => d.temp2m.min));
  const hi = Math.max(...days.map((d) => d.temp2m.max));
  const span = Math.max(1, hi - lo);
  els.days.innerHTML = days.map((d, i) => `
    <li class="day">
      <span class="day-name">${i === 0 ? 'Today' : local(dayDate(d.date), 'UTC', { weekday: 'short', day: 'numeric' })}</span>
      <span class="ic">${icon(d.weather, false)}</span>
      <span class="day-desc">${WEATHER[d.weather] || 'Mixed'}</span>
      <span class="day-min">${d.temp2m.min}°</span>
      <span class="bar"><i style="left:${((d.temp2m.min - lo) / span) * 100}%;right:${100 - ((d.temp2m.max - lo) / span) * 100}%"></i></span>
      <span class="day-max">${d.temp2m.max}°</span>
    </li>`).join('');

  setSky(code, night, localHour(now, zone));
  document.title = `${Math.round(cur.temp2m)}° ${city.city} | WeEuroSA`;
}

async function load(city) {
  const id = ++requestId;
  current = city;
  els.app.classList.add('loading');
  setStatus(`Getting the forecast for ${city.city}…`);
  try {
    const [civil, light] = await Promise.all([forecast(city, 'civil'), forecast(city, 'civillight')]);
    if (id !== requestId) return; // a newer request has started
    render(city, civil, light);
    setStatus('');
  } catch (err) {
    if (id !== requestId) return;
    console.error(err);
    setStatus('The forecast service is not responding right now. Please try again in a minute.', true);
  } finally {
    if (id === requestId) els.app.classList.remove('loading');
  }
}

/* ---------- location ---------- */
function locate() {
  if (!navigator.geolocation) {
    setStatus('Your browser does not share location. Pick a city instead.', true);
    return;
  }
  setStatus('Finding your location…');
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      const here = { city: 'Your location', country: '', lat: +coords.latitude.toFixed(3), lon: +coords.longitude.toFixed(3), zone: Intl.DateTimeFormat().resolvedOptions().timeZone };
      try {
        const geo = await fetchJSON(`${GEO}?format=jsonv2&lat=${here.lat}&lon=${here.lon}`, 1);
        const a = geo.address || {};
        here.city = a.city || a.town || a.village || a.suburb || a.county || here.city;
        here.country = a.country || '';
      } catch (e) { /* keep the generic name */ }
      els.city.value = '';
      load(here);
    },
    () => setStatus('Location access was blocked. Pick a city from the list instead.', true),
    { timeout: 10000, maximumAge: 600000 }
  );
}

/* ---------- start ---------- */
function fillPicker() {
  const groups = {};
  CITIES.forEach((c, i) => {
    if (!groups[c.region]) {
      groups[c.region] = document.createElement('optgroup');
      groups[c.region].label = c.region;
    }
    groups[c.region].append(new Option(`${c.city}, ${c.country}`, String(i)));
  });
  const here = new Option('Your location', '');
  here.hidden = true;
  els.city.append(here, groups['South Africa'], groups.Europe);
}

function init() {
  fillPicker();
  let saved = 0;
  try { saved = Math.max(0, CITIES.findIndex((c) => c.city === localStorage.getItem(STORE_KEY))); } catch (e) { /* storage blocked */ }
  els.city.value = String(saved);
  load(CITIES[saved]);

  els.city.addEventListener('change', () => {
    const c = CITIES[+els.city.value];
    if (!c) return;
    try { localStorage.setItem(STORE_KEY, c.city); } catch (e) { /* storage blocked */ }
    load(c);
  });
  els.locate.addEventListener('click', locate);

  // If location was allowed before, use it without asking again.
  if (navigator.permissions && navigator.permissions.query) {
    navigator.permissions.query({ name: 'geolocation' }).then((p) => { if (p.state === 'granted') locate(); }).catch(() => {});
  }
  // Refresh every 15 minutes while the page is open.
  setInterval(() => { if (current && !document.hidden) load(current); }, 15 * 60e3);
}

document.addEventListener('DOMContentLoaded', init);
