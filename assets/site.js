/* Progressive enhancement: links and page content work without JavaScript. */
(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const narrow = window.matchMedia('(max-width: 600px)');
  document.documentElement.classList.add('js-enabled');
  if (menu && nav) {
    menu.hidden = false;
    const closeMenu = () => {
      nav.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menu.focus();
      }
    });
    narrow.addEventListener('change', () => {
      const focusWasInNav = nav.contains(document.activeElement);
      const focusWasMenu = document.activeElement === menu;
      closeMenu();
      if (narrow.matches && focusWasInNav) menu.focus();
      else if (!narrow.matches && focusWasMenu) nav.querySelector('a').focus();
    });
  }

  const dialog = document.querySelector('#video-dialog');
  const frame = document.querySelector('#video-frame');
  const trigger = document.querySelector('[data-video-trigger]');
  if (dialog && frame && trigger && typeof dialog.showModal === 'function') {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      const player = document.createElement('iframe');
      player.src = 'https://drive.google.com/file/d/1AeRjbi2mrH3NBNo6iH8k7IeOvEV8_F2x/preview';
      player.title = 'Noel Canlas — CS 499 Weight Progress code review video';
      player.allow = 'fullscreen';
      player.allowFullscreen = true;
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.replaceChildren(player);
      document.body.classList.add('modal-open');
      dialog.showModal();
      dialog.querySelector('.dialog-close').focus();
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      frame.replaceChildren(); // Stop playback and unload the third-party frame.
      document.body.classList.remove('modal-open');
      trigger.focus();
    });
  }
})();
