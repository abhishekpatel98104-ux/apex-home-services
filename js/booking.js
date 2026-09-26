/**
 * ApexPro Home Services - Comprehensive Booking Engine & Cost Estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const bookingForm = document.getElementById('apexBookingForm');
  const stepIndicators = document.querySelectorAll('.step-indicator-item');
  const stepPanes = document.querySelectorAll('.step-pane');
  const nextBtns = document.querySelectorAll('.btn-next-step');
  const prevBtns = document.querySelectorAll('.btn-prev-step');
  const confirmationModal = document.getElementById('confirmationModal');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');

  // Summary Sidebar Elements
  const summaryTrade = document.getElementById('summaryTrade');
  const summaryIssue = document.getElementById('summaryIssue');
  const summaryUrgency = document.getElementById('summaryUrgency');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const summaryPrice = document.getElementById('summaryPrice');
  const summaryDiagnostic = document.getElementById('summaryDiagnostic');

  // Hero Quick Widget Elements
  const heroTradeTabs = document.querySelectorAll('.hero-book-widget .widget-tab-btn');
  const heroIssueSelect = document.getElementById('heroIssueSelect');
  const heroUrgencySelect = document.getElementById('heroUrgencySelect');
  const heroQuickBookBtn = document.getElementById('heroQuickBookBtn');
  const heroPriceValue = document.getElementById('heroPriceValue');

  // Booking State
  let currentStep = 1;
  const bookingState = {
    trade: 'plumbing',
    tradeName: 'Plumbing Service',
    issue: 'Pipe Leak / Water Pressure',
    urgency: 'today',
    urgencyName: 'Today (Within 3-4 Hours)',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (8:00 AM - 12:00 PM)',
    address: '',
    zip: '',
    notes: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    diagnosticFee: 89,
    estimatedCostRange: '$140 - $280'
  };

  // Price Calculation Table
  const pricingMatrix = {
    plumbing: {
      diagnostic: 89,
      emergencyDiagnostic: 129,
      issues: {
        'leak': { label: 'Burst Pipe / Active Leak', range: '$160 - $340' },
        'drain': { label: 'Clogged Drain / Sewer Backup', range: '$120 - $260' },
        'heater': { label: 'Water Heater Repair / No Hot Water', range: '$220 - $480' },
        'toilet': { label: 'Running Toilet / Fixture Install', range: '$95 - $210' },
        'other': { label: 'General Plumbing Inspection', range: '$110 - $230' }
      }
    },
    electrical: {
      diagnostic: 95,
      emergencyDiagnostic: 145,
      issues: {
        'panel': { label: 'Breaker Tripping / Fuse Box Upgrade', range: '$250 - $650' },
        'outlets': { label: 'Dead Outlets / Burning Smell', range: '$130 - $270' },
        'lighting': { label: 'Lighting / Fixture Installation', range: '$110 - $240' },
        'ev': { label: 'EV Level 2 Charger Setup', range: '$450 - $950' },
        'other': { label: 'Whole-Home Safety Audit', range: '$140 - $280' }
      }
    },
    ac: {
      diagnostic: 89,
      emergencyDiagnostic: 139,
      issues: {
        'nocooling': { label: 'AC Not Cooling / Warm Air Blowing', range: '$175 - $390' },
        'refrigerant': { label: 'Refrigerant Leak / Coil Icing', range: '$210 - $490' },
        'tuneup': { label: 'Seasonal AC Maintenance Tune-Up', range: '$89 - $149' },
        'thermostat': { label: 'Smart Thermostat Installation', range: '$95 - $190' },
        'other': { label: 'Duct & Airflow Diagnostic', range: '$130 - $280' }
      }
    },
    emergency: {
      diagnostic: 129,
      emergencyDiagnostic: 149,
      issues: {
        'flood': { label: 'Flooding / Burst Water Main', range: '$220 - $550' },
        'smoke': { label: 'Electrical Sparking / Hazard Outage', range: '$250 - $620' },
        'heatstroke': { label: 'AC Breakdown During Heatwave', range: '$210 - $480' }
      }
    }
  };

  // Update Estimated Price & Summary Display
  function recalculatePricing() {
    const tradeData = pricingMatrix[bookingState.trade] || pricingMatrix['plumbing'];
    const isEmergency = bookingState.urgency === 'emergency';
    
    bookingState.diagnosticFee = isEmergency ? tradeData.emergencyDiagnostic : tradeData.diagnostic;
    
    // Check issue cost range
    let issueData = tradeData.issues[bookingState.issueKey];
    if (!issueData) {
      const firstKey = Object.keys(tradeData.issues)[0];
      issueData = tradeData.issues[firstKey];
    }
    
    bookingState.estimatedCostRange = issueData ? issueData.range : '$150 - $350';

    // Update Summary Sidebar
    if (summaryTrade) summaryTrade.textContent = bookingState.tradeName;
    if (summaryIssue) summaryIssue.textContent = bookingState.issue;
    if (summaryUrgency) summaryUrgency.textContent = bookingState.urgencyName;
    if (summaryDate) summaryDate.textContent = bookingState.date || 'Today';
    if (summaryTime) summaryTime.textContent = bookingState.timeSlot;
    if (summaryDiagnostic) summaryDiagnostic.textContent = `$${bookingState.diagnosticFee} (Free with repair)`;
    if (summaryPrice) summaryPrice.textContent = bookingState.estimatedCostRange;

    // Update Hero Widget preview if present
    if (heroPriceValue) {
      heroPriceValue.innerHTML = `$${bookingState.diagnosticFee} <span>diag. fee (Free w/ repair)</span>`;
    }
  }

  // Handle Trade Tiles Selection in Step 1
  const serviceTiles = document.querySelectorAll('.service-tile');
  serviceTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      serviceTiles.forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      
      const trade = tile.getAttribute('data-trade');
      bookingState.trade = trade;
      bookingState.tradeName = tile.querySelector('.service-tile-title').textContent.trim();
      
      // Update issues select dropdown
      updateIssuesDropdown(trade);
      recalculatePricing();
    });
  });

  // Populate Step 1 Issues Select Dropdown
  const stepIssueSelect = document.getElementById('stepIssueSelect');
  function updateIssuesDropdown(tradeKey) {
    if (!stepIssueSelect) return;
    const trade = pricingMatrix[tradeKey] || pricingMatrix.plumbing;
    stepIssueSelect.innerHTML = '';
    
    Object.entries(trade.issues).forEach(([key, info], idx) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = `${info.label} (${info.range})`;
      if (idx === 0) {
        option.selected = true;
        bookingState.issueKey = key;
        bookingState.issue = info.label;
      }
      stepIssueSelect.appendChild(option);
    });
  }

  if (stepIssueSelect) {
    stepIssueSelect.addEventListener('change', (e) => {
      const trade = pricingMatrix[bookingState.trade];
      const issueObj = trade.issues[e.target.value];
      if (issueObj) {
        bookingState.issueKey = e.target.value;
        bookingState.issue = issueObj.label;
        recalculatePricing();
      }
    });
  }

  // Urgency Cards Selection
  const urgencyCards = document.querySelectorAll('.urgency-card');
  urgencyCards.forEach(card => {
    card.addEventListener('click', () => {
      urgencyCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      const urgencyVal = card.getAttribute('data-urgency');
      bookingState.urgency = urgencyVal;
      bookingState.urgencyName = card.querySelector('.urgency-title').textContent.trim();
      recalculatePricing();
    });
  });

  // Step 2 Date & Time Inputs
  const dateInput = document.getElementById('bookingDateInput');
  const timeSelect = document.getElementById('bookingTimeSelect');
  if (dateInput) {
    // Set min date to today
    dateInput.min = new Date().toISOString().split('T')[0];
    dateInput.value = bookingState.date;
    dateInput.addEventListener('change', (e) => {
      bookingState.date = e.target.value;
      recalculatePricing();
    });
  }
  if (timeSelect) {
    timeSelect.addEventListener('change', (e) => {
      bookingState.timeSlot = e.target.value;
      recalculatePricing();
    });
  }

  // Multi-step Navigation Logic
  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > 4) return;
    
    // Basic validation before advancing
    if (stepNumber > currentStep) {
      if (currentStep === 3) {
        const address = document.getElementById('bookingAddressInput');
        const zip = document.getElementById('bookingZipInput');
        if (!address || !address.value.trim()) {
          address.focus();
          address.style.borderColor = 'var(--color-emergency-orange)';
          return;
        }
        if (!zip || !zip.value.trim()) {
          zip.focus();
          zip.style.borderColor = 'var(--color-emergency-orange)';
          return;
        }
        bookingState.address = address.value.trim();
        bookingState.zip = zip.value.trim();
        const notes = document.getElementById('bookingNotesInput');
        if (notes) bookingState.notes = notes.value.trim();
      }
    }

    currentStep = stepNumber;

    // Update Step Indicators
    stepIndicators.forEach((ind, idx) => {
      const stepIdx = idx + 1;
      ind.classList.remove('active', 'completed');
      if (stepIdx === currentStep) {
        ind.classList.add('active');
      } else if (stepIdx < currentStep) {
        ind.classList.add('completed');
      }
    });

    // Update Panes
    stepPanes.forEach(pane => {
      const paneStep = parseInt(pane.getAttribute('data-step'), 10);
      if (paneStep === currentStep) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Scroll booking card into view comfortably
    const bookingSection = document.getElementById('booking');
    if (bookingSection && window.innerWidth < 768) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep + 1);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });

  // Step indicator direct clicking for previously visited steps
  stepIndicators.forEach((ind, idx) => {
    ind.addEventListener('click', () => {
      const targetStep = idx + 1;
      if (targetStep < currentStep) {
        goToStep(targetStep);
      }
    });
  });

  // Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect Contact Info
      const nameInput = document.getElementById('customerNameInput');
      const phoneInput = document.getElementById('customerPhoneInput');
      const emailInput = document.getElementById('customerEmailInput');

      if (!nameInput.value.trim()) {
        nameInput.focus();
        return;
      }
      if (!phoneInput.value.trim()) {
        phoneInput.focus();
        return;
      }

      bookingState.customerName = nameInput.value.trim();
      bookingState.customerPhone = phoneInput.value.trim();
      bookingState.customerEmail = emailInput ? emailInput.value.trim() : '';

      // Generate Reference Code
      const refCode = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
      bookingState.refCode = refCode;
      bookingState.createdAt = new Date().toISOString();

      // Save to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('apex_bookings') || '[]');
        stored.unshift(bookingState);
        localStorage.setItem('apex_bookings', JSON.stringify(stored));
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }

      // Populate Confirmation Modal Details
      const modalRefCode = document.getElementById('modalRefCode');
      const modalCustomerName = document.getElementById('modalCustomerName');
      const modalServiceTrade = document.getElementById('modalServiceTrade');
      const modalScheduledTime = document.getElementById('modalScheduledTime');
      const modalAddress = document.getElementById('modalAddress');
      const modalPhoneNotice = document.getElementById('modalPhoneNotice');

      if (modalRefCode) modalRefCode.textContent = refCode;
      if (modalCustomerName) modalCustomerName.textContent = bookingState.customerName;
      if (modalServiceTrade) modalServiceTrade.textContent = `${bookingState.tradeName} - ${bookingState.issue}`;
      if (modalScheduledTime) modalScheduledTime.textContent = `${bookingState.date} (${bookingState.timeSlot})`;
      if (modalAddress) modalAddress.textContent = `${bookingState.address}, Zip ${bookingState.zip}`;
      if (modalPhoneNotice) modalPhoneNotice.textContent = `Real-time SMS dispatch alerts will be sent to ${bookingState.customerPhone}`;

      // Open Native Dialog Modal
      if (confirmationModal) {
        if (typeof confirmationModal.showModal === 'function') {
          confirmationModal.showModal();
        } else {
          confirmationModal.setAttribute('open', '');
        }
      }

      // Reset form to step 1
      bookingForm.reset();
      goToStep(1);
    });
  }

  // Close Modal Handler
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirmationModal) {
        if (typeof confirmationModal.close === 'function') {
          confirmationModal.close();
        } else {
          confirmationModal.removeAttribute('open');
        }
      }
    });
  });

  // Hero Quick Widget Integration
  heroTradeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTradeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const trade = tab.getAttribute('data-trade');
      bookingState.trade = trade;
      bookingState.tradeName = tab.textContent.trim();
      recalculatePricing();

      // Sync with main booking form tile
      serviceTiles.forEach(tile => {
        if (tile.getAttribute('data-trade') === trade) {
          tile.click();
        }
      });
    });
  });

  if (heroQuickBookBtn) {
    heroQuickBookBtn.addEventListener('click', () => {
      // Scroll to booking section smoothly
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Pre-fill trade from "Book This Service" buttons in services section
  const directBookBtns = document.querySelectorAll('[data-book-trade]');
  directBookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const trade = btn.getAttribute('data-book-trade');
      serviceTiles.forEach(tile => {
        if (tile.getAttribute('data-trade') === trade) {
          tile.click();
        }
      });
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initial population
  updateIssuesDropdown('plumbing');
  recalculatePricing();
});
