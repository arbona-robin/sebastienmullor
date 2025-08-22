const Mustache = require("mustache");
const { marked } = require("marked");
const { loadTemplate } = require("./file-utils");

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

function renderTemplate(template, data, partials = {}) {
  return Mustache.render(template, data, partials);
}

function renderPageWithLayout(pageName, data) {
  const baseLayout = loadTemplate("base-layout");
  const mainContent = loadPartial(`${pageName}-main`);
  
  const partials = {
    "main-content": mainContent
  };
  
  return renderTemplate(baseLayout, data, partials);
}

function loadPartial(name) {
  const fs = require("fs");
  const path = require("path");
  const root = process.cwd();
  const partialsDir = path.join(root, "templates", "partials");
  return fs.readFileSync(
    path.join(partialsDir, name + ".template.html"),
    "utf8"
  );
}

module.exports = {
  renderTemplate,
  renderPageWithLayout,
  paragraphHTML,
  markdownToHTML
};