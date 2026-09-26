/**
 * ApexPro Home Services - Customer Reviews & Ratings Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const reviewsContainer = document.getElementById('reviewsContainer');
  const reviewFilterPills = document.querySelectorAll('.review-filter-pill');
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  const reviewModal = document.getElementById('reviewModal');
  const reviewForm = document.getElementById('reviewForm');
  const starRatingInputs = document.querySelectorAll('.star-rating-select svg');

  // Customer Reviews Data
  const initialReviews = [
    {
      id: 1,
      author: 'Marcus Vance',
      initials: 'MV',
      location: 'Westwood Hills',
      trade: 'plumbing',
      tradeLabel: 'Emergency Plumbing',
      stars: 5,
      date: '2 days ago',
      title: 'Saved our basement from 6 inches of water at 11 PM!',
      text: 'A copper water line burst behind our laundry unit late on a Sunday night. I called their 24/7 hotline and technician Dave arrived in exactly 26 minutes with a full truck. Cut the pipe, pressed in new high-temp PEX fittings, and vacuumed up the water. Lifesavers.'
    },
    {
      id: 2,
      author: 'Sarah Jenkins',
      initials: 'SJ',
      location: 'Oakridge Estates',
      trade: 'electrical',
      tradeLabel: 'Electrical Panel Upgrade',
      stars: 5,
      date: '1 week ago',
      title: 'Impeccable craftsmanship and zero power downtime mess.',
      text: 'Upgraded our 1970s fuse box to a 200-amp Siemens breaker panel with EV charger pre-wiring. The electrician, Frank, explained every step, labeled each breaker clearly with a printed directory, and wore boot covers inside. Passed city inspection on the very first try!'
    },
    {
      id: 3,
      author: 'David Chen',
      initials: 'DC',
      location: 'Pinecrest Valley',
      trade: 'ac',
      tradeLabel: 'AC Emergency Repair',
      stars: 5,
      date: '2 weeks ago',
      title: 'AC stopped cooling during a 98°F heatwave.',
      text: 'Our central AC unit started blowing warm air right as our family was hosting weekend guests. ApexPro booked an emergency slot within 2 hours. Elena quickly diagnosed a blown capacitor and dirty condenser fins. Within 45 minutes our house was 71°F again.'
    },
    {
      id: 4,
      author: 'Rebecca Miller',
      initials: 'RM',
      location: 'Metro Downtown',
      trade: 'plumbing',
      tradeLabel: 'Hydro-Jetting Drain Service',
      stars: 5,
      date: '3 weeks ago',
      title: 'Tree roots in main sewer line cleared instantly.',
      text: 'Three other plumbers told us we would need to dig up the entire front yard for $8,000. ApexPro ran a camera snake, showed us the root intrusion on video, and blasted it clear with high-pressure hydro-jetting for a fraction of the cost. Truly honest experts.'
    },
    {
      id: 5,
      author: 'Gregory Ross',
      initials: 'GR',
      location: 'Riverdale Heights',
      trade: 'electrical',
      tradeLabel: 'EV Charger & Surge Defense',
      stars: 5,
      date: '1 month ago',
      title: 'Installed Tesla Wall Connector cleanly.',
      text: 'Clean conduit routing along the garage wall, properly rated breaker, and whole-home surge protector installed as a bundle. Upfront pricing quote was honored to the penny. Will never call another electrician.'
    },
    {
      id: 6,
      author: 'Elena Rostova',
      initials: 'ER',
      location: 'South Bay',
      trade: 'ac',
      tradeLabel: 'Heat Pump Maintenance',
      stars: 5,
      date: '1 month ago',
      title: 'Our monthly electric bill dropped $65!',
      text: 'Signed up for their seasonal AC tune-up. The technician showed me photos before and after cleaning the evaporator coils and adjusted the blower speed. The system is silent now and cooling much faster.'
    }
  ];

  let currentCategory = 'all';

  function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }
    return starsHtml;
  }

  function renderReviews() {
    if (!reviewsContainer) return;
    reviewsContainer.innerHTML = '';

    const filtered = currentCategory === 'all'
      ? initialReviews
      : initialReviews.filter(r => r.trade === currentCategory);

    filtered.forEach(rev => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-card-header">
          <div class="review-author-wrap">
            <div class="review-avatar">${rev.initials}</div>
            <div class="review-author-info">
              <strong>${rev.author}</strong>
              <span class="review-location">${rev.location} • ${rev.date}</span>
            </div>
          </div>
          <span class="verified-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Verified Customer
          </span>
        </div>
        <div class="review-stars">${renderStars(rev.stars)}</div>
        <h4 style="font-size: 1.05rem; margin-top: 4px; color: var(--color-primary);">${rev.title}</h4>
        <p class="review-text">${rev.text}</p>
        <span class="review-service-tag">${rev.tradeLabel}</span>
      `;
      reviewsContainer.appendChild(card);
    });
  }

  // Filter Pills Event Handlers
  reviewFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      reviewFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-filter');
      renderReviews();
    });
  });

  // Open "Leave a Review" Modal
  if (openReviewModalBtn && reviewModal) {
    openReviewModalBtn.addEventListener('click', () => {
      if (typeof reviewModal.showModal === 'function') {
        reviewModal.showModal();
      } else {
        reviewModal.setAttribute('open', '');
      }
    });
  }

  // Interactive Star Selection in Modal
  let selectedRating = 5;
  starRatingInputs.forEach((starSvg, index) => {
    starSvg.addEventListener('click', () => {
      selectedRating = index + 1;
      starRatingInputs.forEach((s, idx) => {
        if (idx < selectedRating) {
          s.style.fill = '#f59e0b';
        } else {
          s.style.fill = '#cbd5e1';
        }
      });
    });
  });

  // Handle Review Submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const authorInput = document.getElementById('reviewAuthorInput');
      const locationInput = document.getElementById('reviewLocationInput');
      const tradeInput = document.getElementById('reviewTradeSelect');
      const titleInput = document.getElementById('reviewTitleInput');
      const textInput = document.getElementById('reviewTextInput');

      const name = authorInput.value.trim() || 'Verified Homeowner';
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'VH';
      const location = locationInput.value.trim() || 'Local Area';
      const trade = tradeInput.value || 'plumbing';
      const tradeLabel = tradeInput.options[tradeInput.selectedIndex].text;
      const title = titleInput.value.trim() || 'Excellent service';
      const text = textInput.value.trim();

      const newReview = {
        id: Date.now(),
        author: name,
        initials: initials,
        location: location,
        trade: trade,
        tradeLabel: tradeLabel,
        stars: selectedRating,
        date: 'Just now',
        title: title,
        text: text
      };

      initialReviews.unshift(newReview);
      renderReviews();

      // Close modal
      if (reviewModal) {
        if (typeof reviewModal.close === 'function') {
          reviewModal.close();
        } else {
          reviewModal.removeAttribute('open');
        }
      }
      reviewForm.reset();
    });
  }

  // Initial render
  renderReviews();
});
