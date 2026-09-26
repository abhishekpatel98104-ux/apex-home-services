# ApexPro™ Home Services Website

A modern, high-performance, conversion-engineered website for home service professionals specializing in **Master Plumbing**, **Licensed Electrical**, and **AC & Climate Repair**.

---

## 📁 Project File & Directory Structure

```text
apex-home-services/
├── index.html                   # Semantic, accessible HTML5 markup
├── README.md                    # Project documentation & feature guide
│
├── css/
│   ├── main.css                 # Design tokens, reset, typography, and layout foundations
│   ├── components.css           # Navigation, hero, cards, badges, dialogs, footer
│   ├── before-after.css         # Split-layer interactive before/after image slider
│   └── responsive.css           # Media queries, mobile sticky bottom bar, drawer
│
├── js/
│   ├── main.js                  # Sticky header, ZIP checker, WhatsApp chat, live counters
│   ├── gallery.js               # Interactive before/after drag slider & case study tabs
│   ├── booking.js               # 4-Step booking engine, dynamic quote calculator, modals
│   └── reviews.js               # Verified reviews renderer, category filters, review submission
│
└── assets/
    ├── images/                  # Real high-resolution photography & work proof
    │   ├── hero.jpg             # Uniformed technicians with service van
    │   ├── plumbing.jpg         # Master plumber fixing copper/PEX piping
    │   ├── electrical.jpg       # Electrician testing 200A breaker panel
    │   ├── ac-repair.jpg        # HVAC technician servicing outdoor condenser
    │   ├── before-leak.jpg      # Corroded leaking copper pipe (Before)
    │   ├── after-leak.jpg       # Pristine PEX manifold installation (After)
    │   ├── before-ac.jpg        # Dirt & grime clogged AC fins (Before)
    │   └── after-ac.jpg         # Gleaming sanitized AC condenser (After)
    └── icons/                   # Inline SVG icons for maximum performance
```

---

## 🌟 Core Features Included

1. **Top Emergency Bar**:
   - Live on-duty technician counter (fluctuating realistically between 12-16 technicians)
   - 24/7 click-to-call hotline `(800) 555-APEX`
   - License and certification numbers prominently displayed

2. **Hero Section with Quick "Book a Service" Widget**:
   - High-conversion headline & subheadline
   - Interactive quick quote estimator (select trade, problem, and urgency to preview diagnostic fee)
   - Real high-definition photography with floating trust badges

3. **Services Cards**:
   - Filterable tabs: *All Services*, *Plumbing*, *Electrical*, *AC & Climate*, *Emergency 24/7*
   - Cards display transparent upfront diagnostic pricing, typical turnaround, bulleted specialties, and direct booking buttons

4. **Why Choose Us**:
   - 6 Core Value Pillars (45-Minute Emergency Response, Upfront Flat-Rate Pricing, Master Licensed Technicians, 1-Year Ironclad Warranty, Clean-Home Pledge, Live SMS/GPS Tracking)
   - 100% Satisfaction Guarantee promise banner

5. **Interactive Before / After Work Gallery**:
   - Genuine interactive drag-and-touch comparison slider
   - Real before/after case studies:
     - Leaking corroded pipe vs. new PEX manifold
     - Grime-clogged AC unit vs. sanitized efficiency coils
     - Outdated fuse box vs. 200A modern breaker panel
   - Key case metrics: turnaround time, dollars saved in water damage, warranty issued

6. **Service Areas & Interactive ZIP Lookup**:
   - Live ZIP code / City availability checker with instant distance and van arrival feedback
   - Sector coverage cards with live van status tags

7. **Verified Customer Reviews**:
   - 4.9★ rating summary with percentage bar breakdown
   - Filter reviews by service category
   - Interactive "Write a Review" native dialog modal

8. **Comprehensive 4-Step Booking & Contact Form**:
   - Step 1: Select trade & specific issue
   - Step 2: Choose urgency (Emergency <45 min, Same-Day, Custom Date)
   - Step 3: Enter location & issue details
   - Step 4: Contact details with automated SMS dispatch simulation
   - Real-time estimated repair range calculator
   - Native dialog confirmation modal with generated Booking Reference ID

9. **WhatsApp & Phone Quick Communication**:
   - Floating WhatsApp button with pulsing animation ring and live quick-chat popup
   - Floating 1-tap call button
   - Sticky mobile bottom bar with quick shortcuts (Call, WhatsApp, Services, Book Now)

10. **Responsive & Accessible**:
    - Mobile-optimized layouts
    - Native `<dialog>` elements for modals
    - Accessible color contrasts and ARIA labels

---

## 🚀 How to Run Locally

You can run this project with any standard local HTTP server:

```bash
# Using Python
cd g:\projects\apex-home-services
python -m http.server 3000

# Or using Node / npx serve
npx serve g:\projects\apex-home-services
```

Then open `http://localhost:3000` in your web browser.
