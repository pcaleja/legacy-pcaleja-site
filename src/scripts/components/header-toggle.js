import _ from 'lodash';
import anchorScroll from './anchor-scroll';

const body = document.querySelector('body');
const links = document.querySelectorAll('.header a');
const toggle = document.querySelector('.header__toggle');
const initialBodyClass = Array.prototype.slice.call(body.classList);
const targetPosition = {};
let scrollPosition = 0;

const headerToggle = {
  setTargetPosition() {
    _.each(links, (link) => {
      if (link.hash) {
        const target = document.querySelector(link.hash);

        if (target) {
          targetPosition[link.hash.replace('#', '')] = target.offsetTop;
        }
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
    body.classList = initialBodyClass + ' nav-active';
    headerToggle.setMobileAnchorLinks();
  },

  off() {
    const classListArray = Array.prototype.slice.call(body.classList);
    body.classList = initialBodyClass;
    window.scrollTo(0, scrollPosition);
    anchorScroll.init();
  },

  init() {
    toggle.addEventListener('click', () => {
      const classListArray = Array.prototype.slice.call(body.classList);
      return classListArray.indexOf('nav-active') === -1 ? headerToggle.on() : headerToggle.off();
    });
  },
};

export default headerToggle;
