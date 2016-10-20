import 'codemirror/mode/javascript/javascript';
import codeMirror from 'codemirror';
import headerToggle from './components/header-toggle';
import anchorScroll from './components/anchor-scroll';

headerToggle.init();
anchorScroll.init();

const editor = codeMirror(document.querySelector('.studies__test'), {
  value: 'function myScript(){return 100;};\nmyScript();',
  mode: 'javascript',
  lineNumbers: true,
  tabSize: 2,
  lineWrapping: true,
});
