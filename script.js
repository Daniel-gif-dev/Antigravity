document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Typing Animation in Hero Section ---
  const typingElement = document.querySelector('.typing-text');
  const roles = [
    'Front-End Developer',
    'Founder of Sulien Realty Media',
    'Technology Enthusiast',
    'Psychology Student'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Speed up deletion
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingElement) {
    typeEffect();
  }

  // --- 2. Navbar Scroll Styling ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 3. Mobile Navigation Menu Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-item a');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // --- 4. Intersection Observer for Scroll Fade-In ---
  const fadeInUpElements = document.querySelectorAll('.fade-in-up');
  const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, scrollObserverOptions);

  fadeInUpElements.forEach(element => {
    scrollObserver.observe(element);
  });

  // --- 5. Dynamic Skill Bar Load Trigger ---
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillSection = document.querySelector('#skills');

  if (skillSection && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const widthValue = bar.getAttribute('data-width');
            bar.style.width = widthValue;
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillObserver.observe(skillSection);
  }

  // --- 6. Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section');
  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.parentElement.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.parentElement.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(section => {
    activeLinkObserver.observe(section);
  });

  // --- 7. Interactive Contact Form with Success Feedback ---
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.querySelector('.form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic field checking
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.className = 'form-status error';
        return;
      }

      // Simulate a submission progress state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Reset fields and show success alert
        contactForm.reset();
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
        formStatus.className = 'form-status success';

        // Clear feedback message after 6 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
      }, 1500);
    });
  }
});
