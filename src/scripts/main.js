import _ from 'lodash';

// Header
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


// Anchor Scroll
const anchorLink = document.querySelectorAll('a');
_.each(anchorLink, (val) => {
  if (val.hash) {
    val.addEventListener('click', (e) => {
      e.preventDefault();
      const source = val;
      const target = document.querySelector(val.hash);
      const sourceOffset = source.offsetTop;
      const targetOffset = target.offsetTop;
      const equalizer = 0.1;
      const sourceEqualized = sourceOffset * equalizer;
      const offsetDiff = Math.abs(targetOffset - sourceEqualized);
      window.scrollTo(0, offsetDiff);
    });
  }
});
