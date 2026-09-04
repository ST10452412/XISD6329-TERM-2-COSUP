const themeToggleButtons = Array.from(document.querySelectorAll('.mode-toggle'));
const themeToggleIcons = themeToggleButtons.map(btn => btn.querySelector('.toggle-icon'));

const sunIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v3M12 18.5v3M4.5 12h3M16.5 12h3M6.34 6.34l2.12 2.12M15.54 15.54l2.12 2.12M6.34 17.66l2.12-2.12M15.54 8.46l2.12-2.12" />
  </svg>
`;

const moonIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
  </svg>
`;

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);

  themeToggleIcons.forEach((icon) => {
    if (icon) {
      icon.innerHTML = isDark ? sunIcon : moonIcon;
    }
  });

  document.querySelectorAll('.hopeline-image').forEach((img) => {
    const lightSrc = img.dataset.lightSrc || 'images/hopeline.png';
    const darkSrc = img.dataset.darkSrc || 'images/hopeline_final.png';
    img.src = isDark ? darkSrc : lightSrc;
  });

  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initialTheme = savedTheme || preferredTheme;

applyTheme(initialTheme);

themeToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
});

const navToggleButton = document.querySelector('.nav-toggle');
const pageBody = document.body;

navToggleButton?.addEventListener('click', () => {
  const isOpen = navToggleButton.getAttribute('aria-expanded') === 'true';
  navToggleButton.setAttribute('aria-expanded', String(!isOpen));
  pageBody.classList.toggle('menu-open', !isOpen);
});
