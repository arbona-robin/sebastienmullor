#!/usr/bin/env node
/**
 * Simple build script to merge JSON content into HTML templates using Mustache.js.
 * Generated pages: index.html, architecture.html, contact.html
 * Edit templates in templates/ and content in content/.
 */
const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");

const root = process.cwd();
const templateDir = path.join(root, "templates");
const contentDir = path.join(root, "content");
const site = JSON.parse(
  fs.readFileSync(path.join(contentDir, "site.json"), "utf8")
);

function readJSON(name) {
  const p = path.join(contentDir, name + ".json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadTemplate(name) {
  return fs.readFileSync(
    path.join(templateDir, name + ".template.html"),
    "utf8"
  );
}

function writePage(name, html) {
  const banner =
    "<!-- Generated file. Do not edit directly. Edit templates/" +
    name +
    ".template.html and content/" +
    name +
    ".json -->\n";
  fs.writeFileSync(path.join(root, name + ".html"), banner + html, "utf8");
}

function absoluteUrl(rel) {
  if (!rel) return site.baseUrl;
  if (/^https?:\/\//i.test(rel)) return rel;
  return site.baseUrl.replace(/\/$/, "/") + rel.replace(/^\//, "");
}

function metaTags(page) {
  const m = page.meta;
  const canonical = absoluteUrl(m.path || "");
  const imageAbs = absoluteUrl(m.image);
  const meta = [];
  meta.push(`<meta name="description" content="${m.description}" />`);
  if (m.keywords) meta.push(`<meta name="keywords" content="${m.keywords}" />`);
  meta.push(`<meta name="author" content="${site.author}" />`);
  meta.push('<meta name="robots" content="index, follow" />');
  meta.push(`<link rel="canonical" href="${canonical}" />`);
  // Open Graph
  meta.push(`<meta property="og:type" content="${m.type || "website"}" />`);
  meta.push(`<meta property="og:url" content="${canonical}" />`);
  meta.push(`<meta property="og:title" content="${m.title}" />`);
  meta.push(`<meta property="og:description" content="${m.description}" />`);
  meta.push(`<meta property="og:image" content="${imageAbs}" />`);
  meta.push('<meta property="og:image:width" content="1200" />');
  meta.push('<meta property="og:image:height" content="630" />');
  meta.push('<meta property="og:locale" content="fr_FR" />');
  meta.push(`<meta property="og:site_name" content="${site.siteName}" />`);
  // Twitter
  meta.push('<meta name="twitter:card" content="summary_large_image" />');
  meta.push(`<meta name="twitter:url" content="${canonical}" />`);
  meta.push(`<meta name="twitter:title" content="${m.title}" />`);
  meta.push(`<meta name="twitter:description" content="${m.description}" />`);
  meta.push(`<meta name="twitter:image" content="${imageAbs}" />`);
  // Favicons (static)
  meta.push(
    '<link rel="icon" type="image/png" sizes="32x32" href="assets/logo-removebg.png" />'
  );
  meta.push(
    '<link rel="icon" type="image/png" sizes="16x16" href="assets/logo-removebg.png" />'
  );
  meta.push('<link rel="apple-touch-icon" href="assets/logo-removebg.png" />');
  return meta.join("\n    ");
}

function structuredDataPerson() {
  const p = site.person;
  return `<script type=\"application/ld+json\">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.description,
    url: site.baseUrl,
    image: absoluteUrl(p.image),
    address: {
      "@type": "PostalAddress",
      addressLocality: p.addressLocality,
      addressCountry: p.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: p.telephone,
      contactType: "customer service",
      email: p.email,
    },
    knowsAbout: p.knowsAbout,
    sameAs: p.sameAs,
  })}</script>`;
}

function buildIndex() {
  const data = readJSON("index");
  const template = loadTemplate("index");
  const headMeta = metaTags(data) + "\n    " + structuredDataPerson();
  
  const templateData = {
    ...data,
    PAGE_TITLE: data.meta.title,
    HERO_CTA: data.hero.cta_text,
    HEAD_META: headMeta
  };
  
  const html = Mustache.render(template, templateData);
  writePage("index", html);
}

function paragraphHTML(arr) {
  return arr
    .map((p) => `            <p>\n              ${p}\n            </p>`)
    .join("\n\n");
}

function buildArchitecture() {
  const data = readJSON("architecture");
  const template = loadTemplate("architecture");
  const headMeta = metaTags(data);
  
  const templateData = {
    ...data,
    PAGE_TITLE: data.meta.title,
    HEAD_META: headMeta,
    NAME: data.intro.name,
    ROLE: data.intro.role,
    INTRO_PARAGRAPHS: paragraphHTML(data.intro.paragraphs),
    QUOTE: data.intro.quote,
    INTRO_IMAGE: data.intro.image,
    FORMATION_PARAGRAPHS: paragraphHTML(data.formation.paragraphs),
    PHILOSOPHY_PARAGRAPHS: paragraphHTML(data.philosophy.paragraphs),
    VISION_PARAGRAPHS: paragraphHTML(data.vision.paragraphs)
  };
  
  const html = Mustache.render(template, templateData);
  writePage("architecture", html);
}

function buildContact() {
  const data = readJSON("contact");
  const template = loadTemplate("contact");
  const headMeta = metaTags(data);
  
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
  
  const html = Mustache.render(template, templateData);
  writePage("contact", html);
}

function buildAll() {
  buildIndex();
  buildArchitecture();
  buildContact();
  console.log("[build] Completed at", new Date().toISOString());
}

buildAll();
