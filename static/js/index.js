/* ─────────────────────────────────────────────
   GS-Diff Project Page  –  Interactive JS
   ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Video tabs with auto-rotation ── */
  const tabBtns   = document.querySelectorAll('.video-tab-btn');
  const tabPanels = document.querySelectorAll('.video-panel');
  const scenes    = Array.from(tabBtns).map(b => b.dataset.scene);
  let currentIndex = 0;
  let autoRotateTimer = null;
  let userInteracted = false;

  function activateTab(scene) {
    currentIndex = scenes.indexOf(scene);
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.scene === scene));
    tabPanels.forEach(p => {
      const isActive = p.dataset.scene === scene;
      p.classList.toggle('active', isActive);
      const vid = p.querySelector('video');
      if (vid) {
        if (isActive) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    });
  }

  function nextTab() {
    if (userInteracted) return;
    currentIndex = (currentIndex + 1) % scenes.length;
    activateTab(scenes[currentIndex]);
  }

  function startAutoRotate() {
    if (autoRotateTimer) clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(nextTab, 15000); // 15 seconds
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      userInteracted = true;
      if (autoRotateTimer) {
        clearInterval(autoRotateTimer);
        autoRotateTimer = null;
      }
      activateTab(btn.dataset.scene);
    });
  });

  // activate first tab (Zen) on load and start rotation
  if (scenes.length > 0) {
    activateTab(scenes[0]);
    startAutoRotate();
  }

  /* ── BibTeX copy button ── */
  const copyBtn = document.getElementById('copy-bibtex');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const text = document.getElementById('bibtex-text').innerText;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      }).catch(() => {
        copyBtn.textContent = 'Error';
      });
    });
  }

  /* ── Navbar burger (mobile) ── */
  const burger = document.querySelector('.navbar-burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const menu = document.getElementById(burger.dataset.target);
      burger.classList.toggle('is-active');
      if (menu) menu.classList.toggle('is-active');
    });
  }

  /* ── Smooth scroll for navbar links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
