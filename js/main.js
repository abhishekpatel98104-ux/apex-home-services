/**
 * ApexPro Home Services - Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3. Services Filter Tabs
  const serviceFilterBtns = document.querySelectorAll('.services-filter .filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'emergency' && card.dataset.emergency === 'true')) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Interactive ZIP Code / Service Area Lookup
  const zipInput = document.getElementById('areasLookupInput');
  const zipBtn = document.getElementById('areasLookupBtn');
  const zipFeedback = document.getElementById('areasFeedback');

  function checkZipCode() {
    if (!zipInput || !zipFeedback) return;
    const val = zipInput.value.trim();

    if (!val) {
      zipInput.focus();
      return;
    }

    // Simulate real-time dispatch network check
    zipFeedback.style.display = 'flex';
    zipFeedback.className = 'areas-feedback success';
    zipFeedback.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span><strong>Territory Confirmed!</strong> 3 service vans currently patrolling near <strong>${val}</strong>. Estimated arrival: <strong>22-30 minutes</strong>.</span>
    `;
  }

  if (zipBtn) zipBtn.addEventListener('click', checkZipCode);
  if (zipInput) {
    zipInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkZipCode();
      }
    });
  }

  // 5. WhatsApp Floating Widget & Quick Chat
  const fabWhatsApp = document.getElementById('fabWhatsApp');
  const waPopup = document.getElementById('whatsappChatPopup');
  const waCloseBtn = document.getElementById('waCloseBtn');
  const waSendBtn = document.getElementById('waSendBtn');
  const waInput = document.getElementById('waChatInput');
  const waBody = document.getElementById('waChatBody');

  if (fabWhatsApp && waPopup) {
    fabWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      waPopup.classList.toggle('active');
    });
  }

  if (waCloseBtn && waPopup) {
    waCloseBtn.addEventListener('click', () => {
      waPopup.classList.remove('active');
    });
  }

  function sendWhatsAppMsg() {
    if (!waInput || !waInput.value.trim()) return;
    const userText = waInput.value.trim();
    waInput.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'wa-message-bubble';
    userMsg.style.alignSelf = 'flex-end';
    userMsg.style.backgroundColor = '#d9fdd3';
    userMsg.style.borderRadius = 'var(--radius-md) 0 var(--radius-md) var(--radius-md)';
    userMsg.innerHTML = `
      ${userText}
      <div class="wa-time">Just now ✓✓</div>
    `;
    waBody.appendChild(userMsg);
    waBody.scrollTop = waBody.scrollHeight;

    // Simulate representative reply
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'wa-message-bubble';
      botMsg.innerHTML = `
        Thank you for contacting ApexPro Dispatch! A licensed technician is on standby. Would you like to schedule an emergency dispatch or regular booking?
        <div class="wa-time">Just now</div>
      `;
      waBody.appendChild(botMsg);
      waBody.scrollTop = waBody.scrollHeight;
    }, 900);
  }

  if (waSendBtn) waSendBtn.addEventListener('click', sendWhatsAppMsg);
  if (waInput) {
    waInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendWhatsAppMsg();
      }
    });
  }

  // 6. Live Technician Count Realistic Fluctuation
  const onDutyCountEls = document.querySelectorAll('.on-duty-count');
  let currentCount = 14;
  setInterval(() => {
    // Random subtle change between 12 and 16
    const delta = Math.random() > 0.5 ? 1 : -1;
    currentCount = Math.max(12, Math.min(16, currentCount + delta));
    onDutyCountEls.forEach(el => {
      el.textContent = `${currentCount} Technicians`;
    });
  }, 18000);

  // 7. Active Navigation Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});
