const body = document.querySelector('body');
const headerToggle = document.querySelector('.header__toggle');
let scrollPosition = 0;

function toggleHeaderOn() {
  scrollPosition = window.scrollY;
  body.classList = 'nav-active';
}

function toggleHeaderOff() {
  body.classList = '';
  window.scrollTo(0, scrollPosition);
}

headerToggle.addEventListener('click', () => {
  return body.classList.value === '' ? toggleHeaderOn() : toggleHeaderOff();
});
