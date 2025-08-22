#!/usr/bin/env node
/**
 * Build script - generates static site from templates and content
 */
const { readJSON, copyStaticAssets } = require("./utils/file-utils");
const { buildIndex, buildArchitecture, buildContact } = require("./page-builders");

async function buildAll() {
  // Load site configuration
  const site = readJSON("site");
  
  // Copy static assets (CSS, JS, images, public files)
  await copyStaticAssets();
  
  // Build pages
  buildIndex(site);
  buildArchitecture(site);
  buildContact(site);
  
  console.log("[build] Completed at", new Date().toISOString());
}

buildAll().catch(error => {
  console.error("[build] Error:", error);
  process.exit(1);
});