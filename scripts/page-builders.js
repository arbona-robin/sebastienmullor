const { metaTags, structuredDataPerson } = require("./utils/meta-generator");
const { renderTemplate, paragraphHTML, markdownToHTML } = require("./utils/template-renderer");
const { readJSON, loadTemplate, writePage } = require("./utils/file-utils");

function buildIndex(site) {
  const data = readJSON("index");
  const template = loadTemplate("index");
  const headMeta = metaTags(data, site) + "\n    " + structuredDataPerson(site);
  
  const templateData = {
    ...data,
    PAGE_TITLE: data.meta.title,
    HERO_CTA: data.hero.cta_text,
    HEAD_META: headMeta
  };
  
  const html = renderTemplate(template, templateData);
  writePage("index", html);
}

function buildArchitecture(site) {
  const data = readJSON("architecture");
  const template = loadTemplate("architecture");
  const headMeta = metaTags(data, site);
  
  const templateData = {
    ...data,
    PAGE_TITLE: data.meta.title,
    HEAD_META: headMeta,
    NAME: data.intro.name,
    ROLE: data.intro.role,
    // Support both old paragraphs array and new content markdown
    INTRO_PARAGRAPHS: data.intro.content ? markdownToHTML(data.intro.content) : paragraphHTML(data.intro.paragraphs || []),
    QUOTE: data.intro.quote,
    INTRO_IMAGE: data.intro.image,
    FORMATION_PARAGRAPHS: data.formation.content ? markdownToHTML(data.formation.content) : paragraphHTML(data.formation.paragraphs || []),
    PHILOSOPHY_PARAGRAPHS: data.philosophy.content ? markdownToHTML(data.philosophy.content) : paragraphHTML(data.philosophy.paragraphs || []),
    VISION_PARAGRAPHS: data.vision.content ? markdownToHTML(data.vision.content) : paragraphHTML(data.vision.paragraphs || [])
  };
  
  const html = renderTemplate(template, templateData);
  writePage("architecture", html);
}

function buildContact(site) {
  const data = readJSON("contact");
  const template = loadTemplate("contact");
  const headMeta = metaTags(data, site);
  
  const templateData = {
    ...data,
    PAGE_TITLE: data.meta.title,
    HEAD_META: headMeta,
    ADDRESS: data.address.lines.join("<br />"),
    PHONE: data.phone,
    EMAIL: data.email,
    EMAIL_LINK: data.email,
    WEBSITE_URL: data.website.url,
    WEBSITE_LABEL: data.website.label,
    PROJECTS_TITLE: data.projects.title,
    PROJECTS_TEXT: data.projects.text,
    CONTACT_IMAGE: data.image.path,
    CONTACT_IMAGE_ALT: data.image.alt
  };
  
  const html = renderTemplate(template, templateData);
  writePage("contact", html);
}

module.exports = {
  buildIndex,
  buildArchitecture,
  buildContact
};