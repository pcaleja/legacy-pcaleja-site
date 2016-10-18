const body = document.querySelector('body');
const toggle = document.querySelector('.header__toggle');
let scrollPosition = 0;

const headerToggle = {
  on() {
    scrollPosition = window.scrollY;
    body.classList = 'nav-active';
  },

  off() {
    body.classList = '';
    window.scrollTo(0, scrollPosition);
  },

  init() {
    toggle.addEventListener('click', () => {
      return body.classList.value === '' ? headerToggle.on() : headerToggle.off();
    });
  },
};

export default headerToggle;
