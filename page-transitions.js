// Script de transitions entre pages
document.addEventListener('DOMContentLoaded', function() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const pageContent = document.querySelector('.page-transition');
  
  // Fonction pour transition sortante
  function transitionOut(url) {
    loadingOverlay.classList.add('active');
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }
  
  // Gestion du smooth scroll pour le CTA
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = ctaButton.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
  
  // Gestion des liens avec transition
  document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (url !== currentPage) {
        transitionOut(url);
      }
    });
  });
  
  // Animation d'entrée au chargement
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.classList.remove('active');
    }, 100);
  });

  // Menu hamburger
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }
});
