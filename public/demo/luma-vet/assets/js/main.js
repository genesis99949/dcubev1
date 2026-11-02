/**
 * Atelier themes — the only script, shared by all three themes. No dependencies.
 *
 * Each feature looks for its own markup and does nothing when it is absent:
 *   initMenu        .menu-toggle + #site-nav   phone menu: open/close, focus trap, Escape
 *   initSearch      .search-toggle + #site-search  desktop search panel under the header
 *   initFilters     [data-filters]             collection filters by item type
 *   initGallery     [data-gallery]             property photos in a dialog (VELORA)
 *   initEasterEgg   [data-easter-egg]          the spinning cat over the process photo (Luma)
 *   initReveal      .reveal                    sections fade in on scroll
 *   initForms       [data-inquiry]             contact form sent with fetch (Atelier Companion)
 *
 * Users who ask for reduced motion get no reveal animation and no easter egg.
 */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initMenu() {
    const menu = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#site-nav');
    // Position of each item, used by every theme's CSS to stagger the opening animation (--i).
    nav?.querySelectorAll(':scope > .nav-list > li, :scope > .header-cta').forEach((item, i) => item.style.setProperty('--i', i));

    // The button reads "Meniu" when closed and "Închide" when open (data-label-close).
    const label = menu?.querySelector('span');
    const labels = {open: label?.textContent, close: menu?.dataset.labelClose || label?.textContent};
    const setLabel = open => {
      if (label) label.textContent = open ? labels.close : labels.open;
    };

    const closeMenu = (restoreFocus = false) => {
      menu?.setAttribute('aria-expanded', 'false');
      setLabel(false);
      nav?.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      if (restoreFocus) menu?.focus();
    };

    menu?.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      setLabel(open);
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));

    // While open: Escape closes, Tab cycles between the button and the menu links.
    document.addEventListener('keydown', event => {
      if (menu?.getAttribute('aria-expanded') !== 'true') return;
      if (event.key === 'Escape') closeMenu(true);
      if (event.key === 'Tab') {
        const links = [menu, ...nav.querySelectorAll('a,button')].filter(el => el.getClientRects().length);
        const last = links.at(-1);
        if (event.shiftKey && document.activeElement === menu) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menu.focus();
        }
      }
    });

    // Close when the window grows to the desktop layout, or on a click outside the header.
    window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
    document.addEventListener('click', event => {
      if (nav?.classList.contains('is-open') && !event.target.closest('.site-header')) closeMenu();
    });
  }

  function initSearch() {
    const toggle = document.querySelector('.search-toggle');
    const panel = document.querySelector('#site-search');
    if (!toggle || !panel) return;
    const setOpen = (open, restoreFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      if (open) panel.querySelector('input[type="search"]')?.focus();
      else if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) setOpen(false, true);
    });
    document.addEventListener('click', event => {
      if (!panel.hidden && !event.target.closest('#site-search, .search-toggle')) setOpen(false);
    });
  }

  function initFilters() {
    document.querySelectorAll('[data-filters]').forEach(bar => {
      const cards = [...bar.parentElement.querySelectorAll('[data-type]')];
      bar.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
        bar.querySelectorAll('[data-filter]').forEach(other => {
          other.classList.toggle('is-active', other === button);
          other.setAttribute('aria-pressed', String(other === button));
        });
        let count = 0;
        cards.forEach(card => {
          const visible = button.dataset.filter === 'all' || card.dataset.type === button.dataset.filter;
          card.hidden = !visible;
          if (visible) {
            count++;
            card.classList.add('is-visible');
          }
        });
        bar.querySelector('[data-count]').textContent = `${count} ${count === 1 ? 'rezultat' : 'rezultate'}`;
      }));
    });
  }

  // The gallery links open the full photo in a dialog with previous/next; without JS they open the file.
  function initGallery() {
    document.querySelectorAll('[data-gallery]').forEach(gallery => {
      const links = [...gallery.querySelectorAll('a')];
      if (!links.length || !window.HTMLDialogElement) return;

      const dialog = document.createElement('dialog');
      dialog.className = 'lightbox';
      dialog.innerHTML = '<img alt=""><button class="lightbox-close" type="button"></button><button class="lightbox-prev" type="button">‹</button><button class="lightbox-next" type="button">›</button><p class="lightbox-count" aria-live="polite"></p>';
      const [image, close, prev, next, count] = dialog.children;
      // Button labels come from the template, so they can be translated.
      close.setAttribute('aria-label', gallery.dataset.labelClose || 'Close');
      close.textContent = '×';
      prev.setAttribute('aria-label', gallery.dataset.labelPrev || 'Previous');
      next.setAttribute('aria-label', gallery.dataset.labelNext || 'Next');
      document.body.append(dialog);

      let index = 0;
      const show = i => {
        index = (i + links.length) % links.length;
        image.src = links[index].href;
        image.alt = links[index].querySelector('img')?.alt || '';
        count.textContent = `${index + 1} / ${links.length}`;
      };
      links.forEach((link, i) => link.addEventListener('click', event => {
        event.preventDefault();
        show(i);
        dialog.showModal();
      }));
      prev.addEventListener('click', () => show(index - 1));
      next.addEventListener('click', () => show(index + 1));
      close.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') show(index - 1);
        if (event.key === 'ArrowRight') show(index + 1);
      });
      dialog.addEventListener('close', () => links[index].focus());
    });
  }

  // A cat cut out of its green screen (tools/brand/luma-easter-egg.py). The MP4 holds the picture
  // on top and its transparency mask underneath; each frame is recombined on the canvas.
  function initEasterEgg() {
    document.querySelectorAll('[data-easter-egg]').forEach(figure => {
      const video = figure.querySelector('.egg-video');
      const canvas = figure.querySelector('.egg-canvas');
      if (!video || !canvas || reducedMotion.matches) return;

      const view = canvas.getContext('2d');
      const buffer = document.createElement('canvas');
      const work = buffer.getContext('2d', {willReadFrequently: true});
      let running = false;
      let frame = 0;

      const draw = () => {
        if (!running) return;
        const w = video.videoWidth;
        const h = video.videoHeight / 2;
        if (w && h && video.readyState >= 2) {
          if (canvas.width !== w) {
            canvas.width = buffer.width = w;
            canvas.height = h;
            buffer.height = h * 2;
          }
          work.drawImage(video, 0, 0);
          const picture = work.getImageData(0, 0, w, h);
          const mask = work.getImageData(0, h, w, h).data;
          const px = picture.data;
          for (let i = 3; i < px.length; i += 4) px[i] = mask[i - 3];
          view.putImageData(picture, 0, 0);
        }
        frame = requestAnimationFrame(draw);
      };
      const start = () => {
        if (running) return;
        running = true;
        figure.classList.add('is-egg');
        // With sound when the browser allows it, otherwise silently.
        video.muted = false;
        video.play().catch(() => {
          video.muted = true;
          return video.play();
        }).catch(() => {});
        frame = requestAnimationFrame(draw);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(frame);
        figure.classList.remove('is-egg');
        video.pause();
      };

      // Mouse: while hovering. Touch and pen: a tap starts, the next tap stops.
      figure.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') start();
      });
      figure.addEventListener('pointerleave', event => {
        if (event.pointerType === 'mouse') stop();
      });
      figure.addEventListener('pointerup', event => {
        if (event.pointerType !== 'mouse') (running ? stop : start)();
      });
      reducedMotion.addEventListener('change', event => {
        if (event.matches) stop();
      });
    });
  }

  // Sections below the first screen fade in as they scroll into view (.will-reveal → .is-visible).
  function initReveal() {
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.08, rootMargin: '0px 0px 30px 0px'});
    document.querySelectorAll('.reveal').forEach((element, i) => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add('will-reveal');
      element.style.transitionDelay = `${(i % 3) * 45}ms`;
      observer.observe(element);
    });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        observer.disconnect();
        document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('is-visible'));
      }
    });
  }

  // The companion plugin's form, sent without leaving the page. The static previews
  // (data-preview="static") only validate it.
  function initForms() {
    document.querySelectorAll('[data-inquiry]').forEach(form => {
      form.addEventListener('submit', async event => {
        if (!window.fetch || !form.reportValidity()) return;
        event.preventDefault();
        const button = form.querySelector('[type=submit]');
        const status = form.querySelector('[data-form-status]');
        const originalText = button.textContent;

        if (form.dataset.preview === 'static') {
          status.hidden = false;
          status.textContent = 'Formular validat. Aceasta este o previzualizare; nu s-a trimis niciun e-mail.';
          status.focus();
          return;
        }

        button.disabled = true;
        button.textContent = 'Se trimite…';
        status.hidden = false;
        status.textContent = 'Se verifică solicitarea…';
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 20000);
          let response;
          try {
            response = await fetch(form.getAttribute('action'), {method: 'POST', body: new FormData(form), headers: {Accept: 'application/json'}, signal: controller.signal});
          } finally {
            clearTimeout(timeout);
          }
          const result = await response.json();
          status.textContent = result.data?.message || 'Cererea nu a putut fi procesată. Te rugăm să încerci din nou.';
          if (result.success) form.reset();
        } catch {
          status.textContent = 'Nu am putut confirma trimiterea. Verifică conexiunea sau contactează-ne direct.';
        } finally {
          button.disabled = false;
          button.textContent = originalText;
          status.focus();
        }
      });
    });
  }

  initMenu();
  initSearch();
  initFilters();
  initGallery();
  initEasterEgg();
  initReveal();
  initForms();
})();

// The dedicated FAQ remains readable without JavaScript; search progressively narrows it.
(() => {
  const init=()=>{
    const hub=document.querySelector('[data-faq-hub]');if(!hub)return;
    const input=hub.querySelector('[data-faq-search]'),clear=hub.querySelector('[data-faq-clear]'),status=hub.querySelector('[data-faq-status]'),empty=hub.querySelector('[data-faq-empty]');
    const items=[...hub.querySelectorAll('[data-faq-item]')],groups=[...hub.querySelectorAll('[data-faq-group]')];
    const normalize=value=>value.toLocaleLowerCase('ro').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const update=()=>{
      const terms=normalize(input.value.trim()).split(/\s+/).filter(Boolean);let count=0;
      items.forEach(item=>{const text=normalize(item.textContent),match=terms.every(term=>text.includes(term));item.hidden=!match;item.open=terms.length>0&&match;if(match)count++;});
      groups.forEach(group=>{group.hidden=![...group.querySelectorAll('[data-faq-item]')].some(item=>!item.hidden);});
      clear.hidden=!terms.length;empty.hidden=count>0;status.textContent=terms.length?`${count} ${count===1?'răspuns găsit':'răspunsuri găsite'}`:`${items.length} răspunsuri, organizate pe teme`;
    };
    input.addEventListener('input',update);clear.addEventListener('click',()=>{input.value='';update();input.focus();});
    hub.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{input.value='';update();}));
    update();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
