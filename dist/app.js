const services = {
  manicura: [
    { id: 'esencial', name: 'Manicura esencial', description: 'Limpieza, forma, cuidado de cutícula y tu esmalte favorito.', price: 350, duration: 45 },
    { id: 'gel', name: 'Gel de larga duración', description: 'Color y brillo impecables. Preparación delicada y acabado en gel.', price: 480, duration: 60, badge: 'THE EVERYDAY FAVORITE' },
    { id: 'rubber', name: 'Rubber base', description: 'Refuerzo flexible para tu uña natural, con un acabado suave y uniforme.', price: 580, duration: 75 }
  ],
  extensiones: [
    { id: 'softgel', name: 'Soft gel', description: 'Extensiones ligeras, forma a tu medida y color sólido incluido.', price: 750, duration: 100, badge: 'SOFT & EFFORTLESS' },
    { id: 'acrilico', name: 'Escultura en acrílico', description: 'Estructura personalizada para crear el largo y la forma que imaginas.', price: 850, duration: 120 },
    { id: 'retoque', name: 'Retoque de estructura', description: 'Balance, mantenimiento y nuevo color para volver a enamorarte.', price: 600, duration: 90 }
  ],
  pedicura: [
    { id: 'pedicura', name: 'Pedicura esencial', description: 'Limpieza, limado y esmalte. El cuidado que tus pies merecen.', price: 450, duration: 60 },
    { id: 'spapies', name: 'Ritual de pies & spa', description: 'Exfoliación suave, mascarilla, masaje y esmalte de tu elección.', price: 650, duration: 80, badge: 'THE SLOW MOMENT' },
    { id: 'duo', name: 'El dúo perfecto', description: 'Manicura y pedicura esenciales para una pausa completa.', price: 720, duration: 105 }
  ],
  extras: [
    { id: 'nailart', name: 'Nail art de autor', description: 'Detalles a mano, acentos sutiles o una idea completamente tuya. Desde dos uñas.', price: 100, duration: 20, badge: 'MAKE IT YOURS' },
    { id: 'retiro', name: 'Retiro cuidadoso', description: 'Retiro profesional de gel. Para acrílico o extensiones, consultar en el atelier.', price: 150, duration: 30 },
    { id: 'spamanos', name: 'Ritual de manos', description: 'Exfoliación, mascarilla hidratante y masaje para un extra de cariño.', price: 200, duration: 20 }
  ]
};
const allServices = Object.values(services).flat();
const money = value => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value);
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = prefersReducedMotion.matches;
const video = $('#cloud-video');
function updateMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  $('#motion-toggle').setAttribute('aria-pressed', String(motionPaused));
  $('#motion-label').textContent = motionPaused ? 'Activar fondo' : 'Pausar fondo';
  $('#motion-icon').textContent = motionPaused ? '▷' : 'Ⅱ';
  if (motionPaused) video.pause(); else video.play().catch(() => { motionPaused = true; updateMotion(); });
}
$('#motion-toggle').addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
prefersReducedMotion.addEventListener('change', e => { motionPaused = e.matches; updateMotion(); });
updateMotion();
if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .08 });
  $$('.reveal').forEach(el => revealObserver.observe(el));
}
const menuToggle = $('.menu-toggle');
function closeMenu() { $('.navigation').classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Abrir menú'); }
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  $('.navigation').classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
$$('.navigation a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
matchMedia('(min-width: 621px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
function renderServices(category) {
  const panel = $('#service-panel');
  panel.setAttribute('aria-labelledby', `tab-${category}`);
  panel.innerHTML = services[category].map(service => `<article class="service-item"><div><h3 class="service-title">${service.name}${service.badge ? `<span class="service-badge">${service.badge}</span>` : ''}</h3><p class="service-description">${service.description}</p><span class="service-time">${service.duration} MIN · UN MOMENTO PARA TI</span></div><div class="service-price"><strong>${money(service.price)}</strong><span>MXN · desde</span><button data-book-service="${service.id}" aria-label="Reservar ${service.name}">↗</button></div></article>`).join('');
  $$('[data-service-tab]').forEach(tab => { const active = tab.dataset.serviceTab === category; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
}
$$('[data-service-tab]').forEach((tab, index, tabs) => {
  tab.addEventListener('click', () => renderServices(tab.dataset.serviceTab));
  tab.addEventListener('keydown', e => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { e.preventDefault(); tabs[next].focus(); renderServices(tabs[next].dataset.serviceTab); }
  });
});
renderServices('manicura');
const booking = $('#booking-dialog');
const lightbox = $('#lightbox');
const bookingForm = $('#booking-form');
const serviceSelect = $('#booking-service');
serviceSelect.innerHTML = Object.entries(services).map(([category, list]) => `<optgroup label="${({manicura:'Manicura',extensiones:'Extensiones',pedicura:'Pedicura & spa',extras:'Pequeños extras'})[category]}">${list.map(service => `<option value="${service.id}">${service.name} · desde ${money(service.price)}</option>`).join('')}</optgroup>`).join('');
const selectedService = () => allServices.find(service => service.id === serviceSelect.value);
function updateService() { const service = selectedService(); $('#booking-price').textContent = `${money(service.price)} MXN`; $('#booking-duration').textContent = `${service.duration} min aprox.`; updateTimes(); }
function localDate(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
const dateInput = $('#booking-date');
const timeSelect = $('#booking-time');
function setDateBounds() { const today = new Date(); dateInput.min = localDate(today); const end = new Date(today); end.setDate(end.getDate() + 90); dateInput.max = localDate(end); }
function parseLocalDate(value) { return new Date(`${value}T12:00:00`); }
function updateTimes() {
  const current = timeSelect.value;
  timeSelect.innerHTML = '<option value="">Elige una hora</option>';
  $('#booking-error').textContent = '';
  dateInput.setCustomValidity('');
  if (!dateInput.value) return;
  const day = parseLocalDate(dateInput.value).getDay();
  if (day === 0) { dateInput.setCustomValidity('Los domingos descansamos. Elige otro día.'); $('#booking-error').textContent = 'Los domingos descansamos. Elige un día de lunes a sábado.'; return; }
  const service = selectedService();
  const closingMinute = day === 6 ? 17 * 60 : 19 * 60;
  const now = new Date();
  for (let minutes = 10 * 60; minutes + service.duration <= closingMinute; minutes += 30) {
    const value = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
    if (dateInput.value === localDate(now) && minutes <= now.getHours() * 60 + now.getMinutes()) continue;
    const option = document.createElement('option'); option.value = value; option.textContent = value; timeSelect.append(option);
  }
  if ([...timeSelect.options].some(option => option.value === current)) timeSelect.value = current;
  if (timeSelect.options.length === 1) $('#booking-error').textContent = 'No quedan horarios para este servicio en ese día. Prueba otra fecha.';
}
serviceSelect.addEventListener('change', updateService);
dateInput.addEventListener('change', updateTimes);
setDateBounds();
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
function openBooking(serviceId) {
  closeMenu();
  if (serviceId && allServices.some(service => service.id === serviceId)) serviceSelect.value = serviceId;
  $('#booking-form-view').hidden = false; $('#booking-success').hidden = true;
  setDateBounds(); updateService(); openDialog(booking);
}
document.addEventListener('click', e => {
  const bookButton = e.target.closest('[data-book], [data-book-service]');
  if (bookButton) openBooking(bookButton.dataset.bookService);
  const closeButton = e.target.closest('[data-close]'); if (closeButton) closeButton.closest('dialog').close();
});
$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => { if (!$$('dialog[open]').length) document.body.classList.remove('modal-open'); });
  dialog.addEventListener('click', e => { if (e.target === dialog) { const rect = dialog.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close(); } });
});
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  $$('[data-filter]').forEach(el => { const active = el === button; el.classList.toggle('active', active); el.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  $$('.gallery-item').forEach(item => { item.hidden = filter !== 'all' && item.dataset.category !== filter; if (!item.hidden) { count++; item.classList.add('visible'); } });
  $('#gallery-count').textContent = `${count} ${count === 1 ? 'idea' : 'ideas'} para inspirarte`;
}));
$$('.gallery-item').forEach(item => item.addEventListener('click', () => {
  const source = item.querySelector('img'); $('#lightbox-image').src = source.src; $('#lightbox-image').alt = source.alt;
  $('#lightbox-title').textContent = item.dataset.title; $('#lightbox-description').textContent = item.dataset.description; openDialog(lightbox);
}));
$('#lightbox-book').addEventListener('click', () => { lightbox.close(); openBooking('nailart'); });
$('#privacy-open').addEventListener('click', () => openDialog($('#privacy-dialog')));
let reminder = null;
bookingForm.addEventListener('submit', e => {
  e.preventDefault(); updateTimes();
  if (!bookingForm.reportValidity()) return;
  const name = $('#booking-name').value.trim();
  if (!name) { $('#booking-error').textContent = 'Escribe tu nombre para crear el ejemplo.'; $('#booking-name').focus(); return; }
  const today = new Date();
  const appointment = new Date(`${dateInput.value}T${timeSelect.value}:00`);
  if (appointment <= today) { $('#booking-error').textContent = 'Elige una fecha y hora futuras.'; return; }
  const service = selectedService();
  reminder = { name, service, date: dateInput.value, time: timeSelect.value, notes: $('#booking-notes').value.trim() };
  $('#success-name').textContent = `${name}, este es el resumen de tu visita de ejemplo.`;
  const dateLabel = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(parseLocalDate(reminder.date));
  const summary = $('#booking-summary'); summary.replaceChildren();
  [['Tu ritual', service.name], ['Tu momento', `${dateLabel} · ${reminder.time} h`], ['Tiempo para ti', `${service.duration} minutos aprox.`], ['Precio ilustrativo', `Desde ${money(service.price)} MXN`]].forEach(([label, value]) => {
    const line = document.createElement('div'); line.className = 'summary-line';
    const key = document.createElement('span'); key.textContent = label;
    const text = document.createElement('span'); text.textContent = value; line.append(key, text); summary.append(line);
  });
  $('#booking-form-view').hidden = true; $('#booking-success').hidden = false; booking.scrollTop = 0; $('#download-calendar').focus();
});
$('#edit-booking').addEventListener('click', () => { $('#booking-form-view').hidden = false; $('#booking-success').hidden = true; serviceSelect.focus(); });
function icsEscape(text) { return text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,'); }
function icsUtc(date) { return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
$('#download-calendar').addEventListener('click', () => {
  if (!reminder) return;
  const [year, month, day] = reminder.date.split('-').map(Number);
  const [hour, minute] = reminder.time.split(':').map(Number);
  // Mexico City is UTC-6 year-round. Calendar times describe the example studio's local time.
  const start = new Date(Date.UTC(year, month - 1, day, hour + 6, minute));
  const end = new Date(start.getTime() + reminder.service.duration * 60000);
  const description = `RECORDATORIO DE DEMOSTRACIÓN. No confirma una cita real. Precio ilustrativo desde ${money(reminder.service.price)} MXN.${reminder.notes ? ` Notas: ${reminder.notes}` : ''}`;
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Nacre//Plantilla Demo//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${crypto.randomUUID ? crypto.randomUUID() : Date.now()}@nacre-demo`,`DTSTAMP:${icsUtc(new Date())}`,`DTSTART:${icsUtc(start)}`,`DTEND:${icsUtc(end)}`,`SUMMARY:${icsEscape(`Ejemplo Nacre · ${reminder.service.name}`)}`,`DESCRIPTION:${icsEscape(description)}`,'LOCATION:Atelier ficticio · Ciudad de México','END:VEVENT','END:VCALENDAR'];
  const blob = new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'mi-momento-nacre-demo.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('#year').textContent = new Date().getFullYear();
