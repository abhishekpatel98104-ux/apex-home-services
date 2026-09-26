/**
 * ApexPro Home Services - Interactive Before & After Work Gallery
 */

document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.getElementById('baSliderWrapper');
  const beforeLayer = document.getElementById('baBeforeLayer');
  const handle = document.getElementById('baHandle');
  const beforeImg = document.getElementById('baBeforeImg');
  const afterImg = document.getElementById('baAfterImg');
  
  // Case info elements
  const caseTradePill = document.getElementById('caseTradePill');
  const caseTitle = document.getElementById('caseTitle');
  const caseDescription = document.getElementById('caseDescription');
  const metricIssue = document.getElementById('metricIssue');
  const metricTime = document.getElementById('metricTime');
  const metricSavings = document.getElementById('metricSavings');
  const metricWarranty = document.getElementById('metricWarranty');
  const tabBtns = document.querySelectorAll('.gallery-tab-btn');

  // Case Studies Database
  const caseStudies = {
    plumbing: {
      trade: 'Master Plumbing',
      title: 'Corroded Copper Main Line Replaced with PEX Manifold',
      desc: 'Homeowner reported severe low water pressure, pinhole leaks, and water pooling in basement utility room. Our master plumbers excised 40 feet of degraded copper and built a clean, labeled dual-zone PEX manifold with emergency master ball valves.',
      beforeImg: 'assets/images/before-leak.jpg',
      afterImg: 'assets/images/after-leak.jpg',
      issue: 'Catastrophic Pinholes & Corrosion',
      time: '3.5 Hours Total Fix',
      savings: '$3,800 Water Damage Prevented',
      warranty: 'Lifetime Fitting Guarantee'
    },
    ac: {
      trade: 'HVAC & Climate',
      title: 'Severe Coil Grime Extraction & High-Efficiency Restorations',
      desc: 'Central AC system was short-cycling, producing insufficient cooling, and driving monthly electric bills up by 45%. We completed comprehensive acid-free coil foam cleansing, comb-straightened collapsed aluminum fins, and recharged eco-refrigerant.',
      beforeImg: 'assets/images/before-ac.jpg',
      afterImg: 'assets/images/after-ac.jpg',
      issue: 'Clogged Condenser & Bent Fins',
      time: '2 Hours Precision Clean',
      savings: '35% Electric Bill Reduction',
      warranty: '2-Year Seasonal Coverage'
    },
    electrical: {
      trade: 'Licensed Electrical',
      title: 'Outdated Overloaded Fuse Box Upgraded to 200A Pro Panel',
      desc: 'Frequent breaker trips and burning smell detected during AC startup. We eliminated dangerous aluminum branch connections, upgraded service entrance to 200 Amps with whole-home surge suppression, and created clean color-coded circuit labels.',
      beforeImg: 'assets/images/electrical.jpg',
      afterImg: 'assets/images/electrical.jpg',
      issue: 'Overheating 100A Fire Risk',
      time: '5 Hours Same-Day Switch',
      savings: '100% Home Insurance Compliant',
      warranty: '10-Year Workmanship Warranty'
    }
  };

  let isDragging = false;
  let sliderWidth = sliderWrapper ? sliderWrapper.offsetWidth : 600;

  function updateSliderPosition(clientX) {
    if (!sliderWrapper) return;
    const rect = sliderWrapper.getBoundingClientRect();
    let x = clientX - rect.left;
    
    // Clamp within 0% to 100%
    x = Math.max(0, Math.min(x, rect.width));
    const percentage = (x / rect.width) * 100;

    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
    
    // Ensure the inner before-image matches wrapper width
    if (beforeImg) {
      beforeImg.style.width = `${rect.width}px`;
    }
  }

  if (sliderWrapper) {
    // Mouse events
    sliderWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    sliderWrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Handle Window Resize to keep beforeImg scaled accurately
    window.addEventListener('resize', () => {
      if (sliderWrapper && beforeImg) {
        beforeImg.style.width = `${sliderWrapper.offsetWidth}px`;
      }
    });

    // Initial setup width
    setTimeout(() => {
      if (sliderWrapper && beforeImg) {
        beforeImg.style.width = `${sliderWrapper.offsetWidth}px`;
      }
    }, 100);
  }

  // Switch Case Studies on Tab Click
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const caseKey = btn.getAttribute('data-case');
      const data = caseStudies[caseKey];
      if (!data) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update images
      beforeImg.src = data.beforeImg;
      afterImg.src = data.afterImg;

      // Reset slider to center 50%
      beforeLayer.style.width = '50%';
      handle.style.left = '50%';

      // Update text details
      caseTradePill.textContent = data.trade;
      caseTitle.textContent = data.title;
      caseDescription.textContent = data.desc;
      metricIssue.textContent = data.issue;
      metricTime.textContent = data.time;
      metricSavings.textContent = data.savings;
      metricWarranty.textContent = data.warranty;
      
      // Update image width matching container
      if (sliderWrapper && beforeImg) {
        beforeImg.style.width = `${sliderWrapper.offsetWidth}px`;
      }
    });
  });
});
