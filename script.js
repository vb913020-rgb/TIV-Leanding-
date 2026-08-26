document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive subsystems
  initMobileMenu();
  initCounterAnimations();
  initFaqAccordion();
  initLeadForm();
  initStickyCTABar();
  initTestimonialCarousel();
  initDashboardInteractions();
});

/* -------------------------------------------------------------
 * 1. Mobile Menu Drawer Navigation
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuDrawer = document.getElementById('mobile-menu-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !menuDrawer) return;

  const openMenu = () => {
    menuDrawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menuDrawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* -------------------------------------------------------------
 * 2. Animated Metric Counters
 * ------------------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-value');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target + suffix;
              clearInterval(timer);
            } else {
              counter.innerText = Math.floor(current) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const trustSection = document.getElementById('trust-section');
  if (trustSection) {
    observer.observe(trustSection);
  }
}

/* -------------------------------------------------------------
 * 3. FAQ Accordion Interaction
 * ------------------------------------------------------------- */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other active items
      accordionItems.forEach(other => {
        other.classList.remove('active');
        const icon = other.querySelector('.accordion-icon');
        if (icon) icon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        item.classList.add('active');
        const icon = item.querySelector('.accordion-icon');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 4. Lead Form Handler & Confirmation Modal
 * ------------------------------------------------------------- */
function initLeadForm() {
  const leadForm = document.getElementById('consultation-form');
  const modal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalWhatsappLink = document.getElementById('modal-whatsapp-link');

  if (!leadForm) return;

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim() || 'Client';
    const phone = document.getElementById('form-phone')?.value.trim() || '';
    const email = document.getElementById('form-email')?.value.trim() || '';
    const business = document.getElementById('form-business')?.value.trim() || '';
    const goal = document.getElementById('form-goal')?.value || 'Digital Business Growth';
    const message = document.getElementById('form-message')?.value.trim() || '';

    // Simple validation check
    if (!name || !phone || !email) {
      alert('Please fill out all required fields (Name, Phone, Email).');
      return;
    }

    // Construct custom WhatsApp Message for instant conversion
    const waText = encodeURIComponent(
      `Hello TIV Digital Marketing Agency!\n\n` +
      `My Name: ${name}\n` +
      `Business: ${business}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Growth Goal: ${goal}\n` +
      `Message: ${message}\n\n` +
      `I would like to schedule my Free Digital Growth Consultation.`
    );

    if (modalWhatsappLink) {
      modalWhatsappLink.href = `https://wa.me/919876543210?text=${waText}`;
    }

    // Show Success Modal
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    // Reset Form
    leadForm.reset();
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  // Close modal when clicking outside box
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  }
}

/* -------------------------------------------------------------
 * 5. Sticky CTA System (Desktop Corner Pill & Mobile Bottom Bar)
 * ------------------------------------------------------------- */
function initStickyCTABar() {
  const desktopSticky = document.getElementById('desktop-sticky-cta');
  const mobileSticky = document.getElementById('mobile-sticky-bar');
  const leadSection = document.getElementById('consultation-section');

  if (!desktopSticky && !mobileSticky) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const heroHeight = 400;

    // Check if form is currently in view
    let formInView = false;
    if (leadSection) {
      const rect = leadSection.getBoundingClientRect();
      formInView = rect.top < window.innerHeight && rect.bottom >= 0;
    }

    // Toggle Desktop Sticky Pill
    if (desktopSticky) {
      if (scrollPos > heroHeight && !formInView) {
        desktopSticky.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
        desktopSticky.classList.add('opacity-100', 'translate-y-0');
      } else {
        desktopSticky.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
        desktopSticky.classList.remove('opacity-100', 'translate-y-0');
      }
    }

    // Toggle Mobile Sticky Bottom Bar
    if (mobileSticky) {
      if (scrollPos > heroHeight && !formInView) {
        mobileSticky.classList.remove('translate-y-full');
      } else {
        mobileSticky.classList.add('translate-y-full');
      }
    }
  });
}

/* -------------------------------------------------------------
 * 6. Testimonial Mobile Carousel Controller
 * ------------------------------------------------------------- */
function initTestimonialCarousel() {
  const container = document.getElementById('testimonials-container');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!container || !prevBtn || !nextBtn) return;

  const cardWidth = 320;

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------
 * 7. Results Section Dashboard Metrics Interaction
 * ------------------------------------------------------------- */
function initDashboardInteractions() {
  const metricTabs = document.querySelectorAll('.metric-tab-btn');
  const metricDisplayValue = document.getElementById('dashboard-main-metric');
  const metricDisplayTitle = document.getElementById('dashboard-main-title');

  if (!metricTabs.length || !metricDisplayValue) return;

  const metricsData = {
    reach: { value: '+250%', title: 'Social & Brand Reach Growth' },
    leads: { value: '+180%', title: 'Qualified Inbound Leads' },
    engagement: { value: '+120%', title: 'Audience Interaction Rate' },
    satisfaction: { value: '+95%', title: 'Client Satisfaction Score' }
  };

  metricTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      metricTabs.forEach(t => {
        t.classList.remove('bg-tiv-orange', 'text-tiv-white');
        t.classList.add('bg-tiv-purple-light', 'text-tiv-muted');
      });
      tab.classList.add('bg-tiv-orange', 'text-tiv-white');
      tab.classList.remove('bg-tiv-purple-light', 'text-tiv-muted');

      const key = tab.getAttribute('data-metric-key');
      if (metricsData[key]) {
        metricDisplayValue.innerText = metricsData[key].value;
        metricDisplayTitle.innerText = metricsData[key].title;
      }
    });
  });
}
