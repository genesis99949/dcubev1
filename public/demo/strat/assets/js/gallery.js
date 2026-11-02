/** STRAT photo viewer. Native dialog handles modal focus, inert background and Escape. */
(() => {
    'use strict';
    const gallery = document.querySelector('[data-strat-gallery]');
    if (!gallery || !window.HTMLDialogElement) return;
    const links = [...gallery.querySelectorAll('.strat-photo-link')];
    const dialog = document.createElement('dialog');
    dialog.className = 'strat-photo-viewer';
    dialog.setAttribute('aria-label', 'Vizualizare fotografie');
    dialog.innerHTML = '<div class="strat-viewer-toolbar"><p class="strat-viewer-title" aria-live="polite"></p><button class="strat-viewer-close" type="button" autofocus>Închide ×</button></div><div class="strat-viewer-stage"><img alt=""><p class="strat-viewer-error" role="status" hidden>Fotografia nu s-a încărcat. Încearcă din nou sau alege alta.</p></div><div class="strat-viewer-controls"><button type="button" class="strat-viewer-prev">← Anterioara</button><p class="strat-viewer-status" aria-live="polite"></p><button type="button" class="strat-viewer-next">Următoarea →</button></div>';
    document.body.append(dialog);
    const image = dialog.querySelector('img');
    const title = dialog.querySelector('.strat-viewer-title');
    const status = dialog.querySelector('.strat-viewer-status');
    const error = dialog.querySelector('.strat-viewer-error');
    let active = [];
    let index = 0;
    let opener;

    const show = next => {
        index = (next + active.length) % active.length;
        const link = active[index];
        error.hidden = true;
        image.hidden = false;
        image.alt = link.querySelector('img').alt;
        image.src = link.href;
        title.textContent = link.dataset.title;
        status.textContent = `Fotografia ${index + 1} din ${active.length}`;
    };
    image.addEventListener('error', () => { image.hidden = true; error.hidden = false; });
    links.forEach(link => link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        active = links.filter(item => !item.closest('figure').hidden);
        show(active.indexOf(link));
        dialog.showModal();
        document.body.classList.add('strat-viewer-open');
    }));
    dialog.querySelector('.strat-viewer-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.strat-viewer-prev').addEventListener('click', () => show(index - 1));
    dialog.querySelector('.strat-viewer-next').addEventListener('click', () => show(index + 1));
    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            show(index + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
        document.body.classList.remove('strat-viewer-open');
        opener?.focus({preventScroll: true});
    });
})();
