const Mustache = require("mustache");

function paragraphHTML(arr) {
  return arr
    .map((p) => `            <p>\n              ${p}\n            </p>`)
    .join("\n\n");
}

function renderTemplate(template, data) {
  return Mustache.render(template, data);
}

module.exports = {
  renderTemplate,
  paragraphHTML
};