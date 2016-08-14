const path = {
  images: {
    glob: ['src/images/*.jpg', 'src/images/*.png'],
    src: ['src/images/*.jpg', 'src/images/*.png'],
    dest: './public/images',
  },
  css: {
    glob: ['src/styles/**/*.scss', './src/data/images.json'],
    src: ['src/styles/*.scss', 'src/styles/pages/*.scss'],
    dest: './public/styles',
  },
  js: {
    glob: 'src/scripts/**/*.js',
    src: 'src/scripts/{_single,}/*.js',
    dest: './public/scripts',
  },
  pug: {
    glob: ['./src/views/**/*.pug', './src/data/*'],
    src: ['./src/views/**/*.pug', '!./src/views/{**/_*,_**/*}'],
    dest: './public/',
  },
};

module.exports = path;
