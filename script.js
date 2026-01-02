// Initialize libraries and UI when DOM is ready
document.addEventListener('DOMContentLoaded', function(){
  // AOS (guarded)
  try{ if(window.AOS && typeof AOS.init === 'function') AOS.init({duration:1200}); }
  catch(e){ console.warn('AOS init failed:', e); }

  // Typed.js (guarded)
  try{
    if(window.Typed){
      new Typed('.typed', {
        strings: ['Web Developer', 'Programmer', 'UI/UX Enthusiast'],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
      });
    }
  } catch(e){ console.warn('Typed.js init failed:', e); }

  // Dark Mode Toggle - Simplified and Reliable
  const darkToggle = document.getElementById('darkModeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  if (darkToggle && iconSun && iconMoon) {
    function applyTheme(theme) {
      const root = document.documentElement;
      const body = document.body;

      if (theme === 'dark') {
        root.classList.add('dark');
        body.classList.add('dark');
        iconSun.style.display = 'none';
        iconMoon.style.display = 'inline-block';
        darkToggle.setAttribute('aria-pressed', 'true');
      } else {
        root.classList.remove('dark');
        body.classList.remove('dark');
        iconSun.style.display = 'inline-block';
        iconMoon.style.display = 'none';
        darkToggle.setAttribute('aria-pressed', 'false');
      }

      // Save preference
      localStorage.setItem('theme', theme);
    }

    // Initialize theme
    const stored = localStorage.getItem('theme');
    if (stored) {
      applyTheme(stored);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Toggle on click
    darkToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
  // Contact Form
  try{
    const contactForm = document.getElementById('contactForm');
    if(contactForm){
      contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name=this.name.value, email=this.email.value, message=this.message.value;
        if(name && email && message){
          // Build a mailto link so the message goes to Harsh's inbox
          const subject = encodeURIComponent('New portfolio contact from ' + name);
          const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n\n' +
            message
          );
          window.location.href = 'mailto:harshyjethwa2020@gmail.com?subject=' + subject + '&body=' + body;
          const msg = document.getElementById('formMessage');
          if(msg) msg.innerText="Your mail client will open with the message. Thank you!";
          this.reset();
        } else { const msg = document.getElementById('formMessage'); if(msg) msg.innerText="Please fill all fields!"; }
      });
    }
  }catch(e){ console.warn('contactForm init failed', e); }

  // Project Filter
  try{
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    if(filterBtns.length && projects.length){
      // Show all by default
      projects.forEach(p=>p.style.display='block');
      filterBtns.forEach(btn=>{
        btn.addEventListener('click',()=>{
          filterBtns.forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          const category = (btn.getAttribute('data-category') || 'all').trim().toLowerCase();
          projects.forEach(project=>{
            const raw = (project.getAttribute('data-category') || '').trim().toLowerCase();
            const categories = raw.split(/\s+/).filter(Boolean);
            const match = category === 'all' || categories.includes(category);
            project.style.display = match ? '' : 'none'; // let CSS handle layout
          });
        });
      });
      // Apply initial active state once to ensure correct visibility
      const activeBtn = document.querySelector('.filter-btn.active') || filterBtns[0];
      if(activeBtn) activeBtn.click();
    }
  }catch(e){ console.warn('project filter init failed', e); }

  // Navbar active on scroll
  try{
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section=>{
        const sectionTop = section.offsetTop-70;
        if(window.scrollY >= sectionTop) current = section.getAttribute('id');
      });
      navLinks.forEach(link=>link.classList.remove('active'));
      if(current){
        const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if(activeLink) activeLink.classList.add('active');
      }
    });
  }catch(e){ console.warn('navbar scroll init failed', e); }

  // Animate skill meters on scroll
  try{
    const meters = document.querySelectorAll('.meter-bar');
    if(meters.length){
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const level = el.dataset.level ? `${el.dataset.level}%` : '0%';
            el.style.setProperty('--level', level);
            el.setAttribute('data-animated','true');
          }
        });
      }, { threshold: 0.4 });
      meters.forEach(bar => {
        if(bar.dataset.level && bar.querySelector('span') && !bar.querySelector('span').textContent.includes('%')){
          bar.querySelector('span').textContent = `${bar.dataset.level}%`;
        }
        observer.observe(bar);
      });
    }
  }catch(e){ console.warn('skill meters init failed', e); }

});