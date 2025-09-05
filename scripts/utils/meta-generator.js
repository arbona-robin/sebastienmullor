const fs = require("fs");
const path = require("path");

function absoluteUrl(rel, baseUrl) {
  if (!rel) return baseUrl;
  if (/^https?:\/\//i.test(rel)) return rel;
  return baseUrl.replace(/\/$/, "/") + rel.replace(/^\//, "");
}

function metaTags(page, site) {
  const m = page.meta;
  const canonical = absoluteUrl(m.path || "", site.baseUrl);
  const imageAbs = absoluteUrl(m.image, site.baseUrl);
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

  // Favicons
  meta.push(
    '<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon.png" />'
  );
  meta.push(
    '<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon.png" />'
  );
  meta.push('<link rel="apple-touch-icon" href="assets/favicon.png" />');

  return meta.join("\n    ");
}

function structuredDataPerson(site) {
  const p = site.person;
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.description,
    url: site.baseUrl,
    image: absoluteUrl(p.image, site.baseUrl),
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

module.exports = {
  metaTags,
  structuredDataPerson,
  absoluteUrl,
};
