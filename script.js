/* ============================================================
   ALLU MAHENDRA – PORTFOLIO JS
   Interactive elements, animations, and smooth scrolling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;
  
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  
    function updateThemeIcon(theme) {
      if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
      } else {
        themeIcon.className = 'fas fa-moon';
      }
    }
  
    /* --- Mobile Menu Toggle --- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  
    // Close menu when a link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  
    /* --- Navbar Scroll Effect & Active Link --- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
  
    window.addEventListener('scroll', () => {
      // Navbar shadow
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
  
      // Active link highlighting
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
  
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
          item.classList.add('active');
        }
      });
    });
  
    /* --- Typing Effect --- */
    const typedTextSpan = document.getElementById('typed');
    const textArray = ["AI Enthusiast", "Machine Learning Student", "Problem Solver", "Web Developer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
  
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }
  
    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }
  
    // Start typing effect after initial delay
    if(textArray.length) setTimeout(type, newTextDelay + 250);
  
    /* --- Scroll Reveal Animations --- */
    function reveal() {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, [class^="reveal-delay"]');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('revealed');
        }
      }
    }
  
    // Trigger reveal on load and scroll
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
  
    /* --- Back to Top Button --- */
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
  
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    /* --- Background Particles --- */
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random animation delay and duration
      const delay = Math.random() * 5;
      const duration = 2 + Math.random() * 4;
      
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.setProperty('--delay', `${delay}s`);
      particle.style.setProperty('--dur', `${duration}s`);
      
      particlesContainer.appendChild(particle);
    }
  
    /* --- Simulate Form Submission --- */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Change button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          
          formSuccess.classList.add('show');
          setTimeout(() => {
            formSuccess.classList.remove('show');
          }, 4000);
        }, 1500);
      });
    }
  
    /* --- Setup CGPA Animation --- */
    const cgpaBar = document.querySelector('.cgpa-bar');
    if (cgpaBar) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const percentage = cgpaBar.getAttribute('data-cgpa');
            const fill = cgpaBar.querySelector('.cgpa-fill');
            // Small delay for better UX
            setTimeout(() => {
              fill.style.width = `${percentage}%`;
            }, 300);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(cgpaBar);
    }
  });
