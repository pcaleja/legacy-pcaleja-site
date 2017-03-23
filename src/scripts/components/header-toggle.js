import _ from 'lodash';
import anchorScroll from './anchor-scroll';

const body = document.querySelector('body');
const links = document.querySelectorAll('.header a');
const toggle = document.querySelector('.header__toggle');
const targetPosition = {};
let scrollPosition = 0;

const headerToggle = {
  setTargetPosition() {
    _.each(links, (link) => {
      if (link.hash) {
        const target = document.querySelector(link.hash);
        targetPosition[link.hash.replace('#', '')] = target.offsetTop;
      }
    });
  },

  setMobileAnchorLinks() {
    _.each(links, (link) => {
      if (link.hash) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const source = link;
          const sourceOffset = source.offsetTop;
          body.classList = '';
          const targetOffset = targetPosition[link.hash.replace('#', '')];
          const equalizer = 0.1;
          const sourceEqualized = sourceOffset * equalizer;
          const offsetDiff = Math.abs(targetOffset - sourceEqualized - 10);
          window.scrollTo(0, offsetDiff);
        });
      }
    });
  },

  on() {
    scrollPosition = window.scrollY;
    headerToggle.setTargetPosition();
    body.classList = 'nav-active';
    headerToggle.setMobileAnchorLinks();
  },

  off() {
    body.classList = '';
    window.scrollTo(0, scrollPosition);
    anchorScroll.init();
  },

  init() {
    toggle.addEventListener('click', () => {
      return body.classList.value === '' ? headerToggle.on() : headerToggle.off();
    });
  },
};

export default headerToggle;
