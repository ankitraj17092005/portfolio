document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Theme toggle (persisted) ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
    });
  }

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('.nav-link');
  if (sections.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------- Animate skill bars into view ---------- */
  var bars = document.querySelectorAll('.skill-bar__fill');
  if (bars.length && 'IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (bar) { barObserver.observe(bar); });
  } else {
    bars.forEach(function (bar) { bar.classList.add('is-visible'); });
  }

  /* ---------- Project gallery filter ---------- */
  var filterTabs = document.getElementById('filterTabs');
  var projectRows = document.querySelectorAll('.project-row');
  if (filterTabs) {
    filterTabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-tab');
      if (!btn) return;

      filterTabs.querySelectorAll('.filter-tab').forEach(function (t) {
        t.classList.remove('is-active');
      });
      btn.classList.add('is-active');

      var filter = btn.getAttribute('data-filter');
      projectRows.forEach(function (row) {
        var match = filter === 'all' || row.getAttribute('data-category') === filter;
        row.classList.toggle('is-hidden', !match);
      });
    });
  }

  /* ---------- Contact form (UI only — no backend call) ----------
     This just validates and shows a confirmation message locally.
     Wire it up to your own endpoint later (fetch/AJAX or a normal
     form POST) once the backend exists. */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#fieldName').value.trim();
      var email = form.querySelector('#fieldEmail').value.trim();
      var message = form.querySelector('#fieldMessage').value.trim();

      if (!name || !email || message.length < 10) {
        status.textContent = 'Please fill in your name, email, and a slightly longer message.';
        status.className = 'form-status is-error';
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simulated delay — replace with a real request once there's a backend.
      setTimeout(function () {
        status.textContent = "Thanks for reaching out! I'll get back to you soon.";
        status.className = 'form-status is-success';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }, 500);
    });
  }

});
