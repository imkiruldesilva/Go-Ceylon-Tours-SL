/**
 * GO CEYLON TRAVELS - CORE MAIN JS
 * Navigation, Modal Management, Floating Widgets & Global Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollTop();
  initGlobalModals();
  highlightActiveNavLink();
});

/* -------------------------------------------------------------------
   NAVBAR STICKY STATE
------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* -------------------------------------------------------------------
   MOBILE NAVIGATION DRAWER
------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* -------------------------------------------------------------------
   SCROLL TO TOP BUTTON
------------------------------------------------------------------- */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------
   ACTIVE NAVIGATION LINK HIGHLIGHTING
------------------------------------------------------------------- */
function highlightActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const target = href.split('/').pop();
    if (target === page || (page === '' && target === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------------
   GLOBAL MODALS (Tour Details & Universal Booking Modal)
------------------------------------------------------------------- */
function initGlobalModals() {
  // Close any active modal when clicking overlay or close button
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });

    const closeBtn = backdrop.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(backdrop.id);
      });
    }
  });

  // ESC key closes active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-backdrop.active');
      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });

  // Delegate 'data-open-modal' clicks
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal]');
    if (!trigger) return;
    e.preventDefault();
    const modalId = trigger.getAttribute('data-open-modal');
    const prefillTour = trigger.getAttribute('data-tour-title') || trigger.getAttribute('data-tour');
    openBookingModal(prefillTour);
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function openBookingModal(prefillTourName) {
  const modal = document.getElementById('universalBookingModal');
  if (!modal) {
    // If not on current page, redirect to booking.html with prefill parameter
    const query = prefillTourName ? `?tour=${encodeURIComponent(prefillTourName)}` : '';
    window.location.href = `booking.html${query}`;
    return;
  }

  if (prefillTourName) {
    const tourSelect = modal.querySelector('#bookingTourPackage');
    if (tourSelect) {
      let optionFound = false;
      for (let i = 0; i < tourSelect.options.length; i++) {
        if (tourSelect.options[i].text.toLowerCase().includes(prefillTourName.toLowerCase()) ||
            tourSelect.options[i].value.toLowerCase().includes(prefillTourName.toLowerCase())) {
          tourSelect.selectedIndex = i;
          optionFound = true;
          break;
        }
      }
      if (!optionFound) {
        const customOpt = document.createElement('option');
        customOpt.value = prefillTourName;
        customOpt.textContent = prefillTourName;
        customOpt.selected = true;
        tourSelect.appendChild(customOpt);
      }
    }
  }

  // Set minimum date to today
  const dateInput = modal.querySelector('#bookingTravelDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  openModal('universalBookingModal');
}

/* -------------------------------------------------------------------
   TOAST NOTIFICATION HELPER
------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  
  const icon = type === 'error' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="#10b981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;

  toast.innerHTML = `
    ${icon}
    <div style="font-size:0.92rem; font-weight:500;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
