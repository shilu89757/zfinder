'use strict';
/**
 * markdown2html module
 * @module markdown2html
 * @see module:index
 */
const hljs = require('highlight.js');
const viz = require('viz.js');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt({
  html: true,
  linkify: true,
  typography: true,
  highlight(str, lang) {
    if (lang) {
      const matched = /^viz\-(\w+)/.exec(lang);
      if (matched) {
        const engine = matched[1];
        try {
          const result = viz(str, {
            engine,
            format: 'svg',
          });
          return `<pre></pre><div class="viz-graph">${result}</div>`;
        } catch (e) {
          return `<pre><code>${e}</code></pre>`;
        }
      } else if (hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (e) {
        }
      }
    }
    return ''; // use external default escaping
  }
})
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-checkbox'))
  .use(require('markdown-it-container')) // TODO use this to render viz
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-implicit-figures'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-math'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'));

module.exports = (str) => md.render(str).replace(/<pre><\/pre>/g, ''); // TODO this is far too HACKING