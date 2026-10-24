(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const running = new Set();
  const changes = new WeakMap();
  const closing = new WeakMap();
  const canMove = () => !reduced.matches && typeof Element.prototype.animate === 'function';

  function stop(element) {
    for (const animation of running) {
      if (animation.effect?.target === element) animation.cancel();
    }
  }
  async function play(element, frames, options = {}) {
    if (!element || !canMove()) return;
    const animation = element.animate(frames, {duration:360,easing:ease,...options});
    running.add(animation);
    try { await animation.finished; } catch { /* Cancellation is expected for rapid input. */ }
    finally { running.delete(animation); animation.cancel(); }
  }
  function enter(elements, distance = 16) {
    return Promise.all([...elements].map((element, index) => {
      stop(element);
      return play(element, [{opacity:0,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}], {duration:420,delay:Math.min(index * 45,180),fill:'backwards'});
    }));
  }
  function cancelChange(container) {
    changes.set(container, Symbol());
    [container,...container.querySelectorAll('*')].forEach(stop);
  }
  async function change(container, mutate, selector) {
    const token = Symbol();
    changes.set(container, token);
    const items = () => selector ? [...container.querySelectorAll(selector)].filter(el => !el.hidden) : [container];
    const outgoing = items();
    outgoing.forEach(stop);
    await Promise.all(outgoing.map(el => play(el,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}],{duration:145,easing:'ease-in',fill:'forwards'})));
    if (changes.get(container) !== token) return false;
    mutate();
    await enter(items());
    return changes.get(container) === token;
  }
  function openDialog(dialog) {
    stop(dialog);
    dialog.classList.remove('is-closing');
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
    play(dialog,[{opacity:0,transform:'translateY(24px) scale(.975)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:420});
    const contents = dialog.querySelector('.lightbox-copy, #booking-form-view, .booking-success:not([hidden])') || dialog;
    enter([...contents.children].filter(el => !el.hidden && !el.matches('.dialog-close')), 10);
  }
  function closeDialog(dialog) {
    if (closing.has(dialog)) return closing.get(dialog);
    if (!dialog.open) return Promise.resolve();
    cancelChange(dialog);
    dialog.classList.add('is-closing');
    const promise = play(dialog,[{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(16px) scale(.98)'}],{duration:190,easing:'ease-in',fill:'forwards'}).then(() => {
      dialog.close(); dialog.classList.remove('is-closing'); closing.delete(dialog);
    });
    closing.set(dialog,promise);
    return promise;
  }

  document.addEventListener('click', event => {
    const control = event.target.closest('button, a.button, a.text-link, a.back-top');
    if (!control || control.disabled || !canMove()) return;
    play(control,[{transform:'scale(1)'},{transform:`scale(${control.classList.contains('gallery-item') ? .987 : .96})`,offset:.3},{transform:'scale(1)'}],{duration:320});
    if (!control.matches('.button, .gallery-filters button, .service-price button, .back-top')) return;
    const bounds = control.getBoundingClientRect();
    const size = Math.max(bounds.width,bounds.height) * 2;
    const ripple = document.createElement('span'); ripple.className = 'click-wave'; ripple.setAttribute('aria-hidden','true');
    const x = event.detail ? event.clientX - bounds.left : bounds.width / 2;
    const y = event.detail ? event.clientY - bounds.top : bounds.height / 2;
    Object.assign(ripple.style,{width:`${size}px`,height:`${size}px`,left:`${x - size / 2}px`,top:`${y - size / 2}px`});
    control.append(ripple);
    play(ripple,[{opacity:.23,transform:'scale(0)'},{opacity:0,transform:'scale(1)'}],{duration:650}).then(() => ripple.remove());
  },true);

  // Keep details open during their closing animation so content does not disappear abruptly.
  document.querySelectorAll('.faq-list details').forEach(details => {
    const summary = details.querySelector('summary');
    let expanded = details.open;
    let version = 0;
    summary.addEventListener('click',async event => {
      event.preventDefault();
      expanded = !expanded;
      const token = ++version;
      const start = details.getBoundingClientRect().height;
      stop(details);
      details.open = true;
      const end = expanded ? details.scrollHeight : summary.getBoundingClientRect().height;
      await play(details,[{height:`${start}px`},{height:`${end}px`}],{duration:300});
      if (token === version) details.open = expanded;
    });
  });

  const curtain = document.createElement('div');
  curtain.className = 'page-curtain'; curtain.setAttribute('aria-hidden','true');
  curtain.innerHTML = '<span class="wordmark">nacre<span>NAIL ATELIER</span></span>';
  document.body.append(curtain);
  let navigating = false;
  async function sectionArrival(target, keyboard = false) {
    target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    target.scrollIntoView({behavior:'instant',block:'start'});
    if (keyboard) {
      const focus = target.querySelector('h1,h2') || target;
      focus.classList.add('section-arrival');
      focus.setAttribute('tabindex','-1'); focus.focus({preventScroll:true});
      focus.addEventListener('blur',() => {focus.removeAttribute('tabindex');focus.classList.remove('section-arrival');},{once:true});
    }
    enter(target.matches('.hero') ? target.querySelectorAll('.hero-copy > *, .hero-visual') : target.querySelectorAll('.section-heading > *, h2, .philosophy-visual, .studio-visual'),14);
  }
  document.addEventListener('click',async event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download') || link.classList.contains('skip-link')) return;
    const url = new URL(link.href,location.href);
    if (url.origin !== location.origin || !['http:','https:'].includes(url.protocol)) return;
    const sameDocument = url.pathname === location.pathname && url.search === location.search;
    const target = sameDocument && url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
    if (sameDocument && !target) return;
    event.preventDefault();
    if (navigating) return;
    navigating = true;
    await play(curtain,[{opacity:0},{opacity:1}],{duration:180,easing:'ease-in',fill:'forwards'});
    if (target) {
      if (location.hash !== url.hash) history.pushState(null,'',url.hash);
      await sectionArrival(target,event.detail === 0);
      await play(curtain,[{opacity:1},{opacity:0}],{duration:320});
      navigating = false;
    } else {
      curtain.style.opacity = '1'; location.assign(url.href);
    }
  });
  window.addEventListener('popstate',() => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1))) || document.getElementById('contenido');
    enter([target],12);
  });
  function arrive() {
    curtain.style.opacity = '0'; navigating = false;
    document.querySelectorAll('dialog.is-closing').forEach(dialog => dialog.classList.remove('is-closing'));
    enter(document.querySelectorAll('.hero-copy > *, .hero-visual, .page-intro > *'),18);
    play(document.querySelector('.site-header'),[{opacity:0,transform:'translateY(-10px)'},{opacity:1,transform:'translateY(0)'}],{duration:500});
  }
  window.addEventListener('pageshow',arrive);
  reduced.addEventListener('change',() => { if (reduced.matches) for (const animation of running) animation.finish(); });
  window.NacreMotion = {play,enter,change,cancelChange,openDialog,closeDialog,stop,canMove};
})();
