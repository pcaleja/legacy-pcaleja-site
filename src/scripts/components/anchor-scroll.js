import _ from 'lodash';

const anchorScroll = {
  init() {
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
  },
};

export default anchorScroll;
