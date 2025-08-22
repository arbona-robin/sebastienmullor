const Mustache = require("mustache");
const { marked } = require("marked");

function paragraphHTML(arr) {
  return arr
    .map((p) => `            <p>\n              ${p}\n            </p>`)
    .join("\n\n");
}

function markdownToHTML(content) {
  if (!content) return '';
  
  // Use marked for proper markdown parsing
  const html = marked(content, {
    breaks: true, // Convert line breaks to <br>
    gfm: true,    // GitHub Flavored Markdown
  });
  
  // Add proper indentation to match template formatting
  return html
    .split('\n')
    .map(line => line.trim() ? `            ${line}` : '')
    .join('\n')
    .trim();
}

function renderTemplate(template, data) {
  return Mustache.render(template, data);
}

module.exports = {
  renderTemplate,
  paragraphHTML,
  markdownToHTML
};