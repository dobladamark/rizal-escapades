
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});



const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.title = 'Back to Top';
backToTopBtn.textContent = '↑';
document.body.appendChild(backToTopBtn);

backToTopBtn.style.position = 'fixed';
backToTopBtn.style.bottom = '40px';
backToTopBtn.style.right = '40px';
backToTopBtn.style.display = 'none';
backToTopBtn.style.zIndex = '999';
backToTopBtn.style.padding = '0.7em 1em';
backToTopBtn.style.fontSize = '2rem';
backToTopBtn.style.borderRadius = '50%';
backToTopBtn.style.background = '#7f5af0';
backToTopBtn.style.color = '#fff';
backToTopBtn.style.border = 'none';
backToTopBtn.style.boxShadow = '0 4px 16px 0 rgba(127,90,240,0.18)';
backToTopBtn.style.cursor = 'pointer';
backToTopBtn.style.transition = 'opacity 0.3s';

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


const lightboxModal = document.createElement('div');
lightboxModal.id = 'lightbox-modal';
lightboxModal.style.position = 'fixed';
lightboxModal.style.top = '0';
lightboxModal.style.left = '0';
lightboxModal.style.width = '100vw';
lightboxModal.style.height = '100vh';
lightboxModal.style.background = 'rgba(0,0,0,0.8)';
lightboxModal.style.display = 'none';
lightboxModal.style.justifyContent = 'center';
lightboxModal.style.alignItems = 'center';
lightboxModal.style.zIndex = '10000';

const lightboxImg = document.createElement('img');
lightboxImg.id = 'lightbox-img';
lightboxImg.style.maxWidth = '90vw';
lightboxImg.style.maxHeight = '80vh';
lightboxImg.style.borderRadius = '16px';
lightboxImg.style.boxShadow = '0 8px 32px 0 rgba(127,90,240,0.18)';
lightboxModal.appendChild(lightboxImg);

const lightboxClose = document.createElement('span');
lightboxClose.id = 'lightbox-close';
lightboxClose.textContent = '×';
lightboxClose.style.position = 'absolute';
lightboxClose.style.top = '30px';
lightboxClose.style.right = '60px';
lightboxClose.style.fontSize = '3rem';
lightboxClose.style.color = '#fff';
lightboxClose.style.cursor = 'pointer';
lightboxModal.appendChild(lightboxClose);

document.body.appendChild(lightboxModal);

document.querySelectorAll('.places-tile img, .places_card img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxModal.style.display = 'flex';
  });
});
lightboxClose.addEventListener('click', () => {
  lightboxModal.style.display = 'none';
});
lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) lightboxModal.style.display = 'none';
});

const revealElements = document.querySelectorAll('.places-tile, .places_card, section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  revealObserver.observe(el);
});


const themeToggle = document.createElement('button');
themeToggle.id = 'themeToggle';
themeToggle.title = 'Toggle Dark/Light Mode';
themeToggle.textContent = '🌙';
themeToggle.style.marginLeft = '2rem';
themeToggle.style.fontSize = '1.5rem';
themeToggle.style.background = 'none';
themeToggle.style.border = 'none';
themeToggle.style.cursor = 'pointer';
themeToggle.style.color = '#fff';
themeToggle.style.position = 'relative';
themeToggle.style.top = '4px';

document.querySelector('.navigation').appendChild(themeToggle);

function setTheme(dark) {
  if (dark) {
    document.documentElement.style.setProperty('--background', '#16161a');
    document.documentElement.style.setProperty('--text-dark', '#fffffe');
    document.documentElement.style.setProperty('--paragraph', '#b8c1ec');
    document.body.style.background = 'linear-gradient(135deg, #22223b 60%, #16161a 100%)';
    themeToggle.textContent = '☀️';
  } else {
    document.documentElement.style.setProperty('--background', '#f5f6fa');
    document.documentElement.style.setProperty('--text-dark', '#22223b');
    document.documentElement.style.setProperty('--paragraph', '#72757e');
    document.body.style.background = 'linear-gradient(135deg, #b8c1ec 60%, #fff 100%)';
    themeToggle.textContent = '🌙';
  }
}
let darkMode = true;
themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  setTheme(darkMode);
});
setTheme(darkMode);

