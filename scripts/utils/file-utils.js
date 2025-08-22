const fs = require("fs");
const path = require("path");

const root = process.cwd();
const templateDir = path.join(root, "templates");
const contentDir = path.join(root, "content");
const distDir = path.join(root, "dist");

function ensureDistDir() {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
}

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
  ensureDistDir();
  const banner =
    "<!-- Generated file. Do not edit directly. Edit templates/" +
    name +
    ".template.html and content/" +
    name +
    ".json -->\n";
  fs.writeFileSync(path.join(distDir, name + ".html"), banner + html, "utf8");
}

async function copyStaticAssets() {
  ensureDistDir();
  
  // Compile Tailwind CSS
  await compileTailwindCSS();
  
  // Copy JS
  const srcJs = path.join(root, "src/scripts/page-transitions.js");
  const distJs = path.join(distDir, "page-transitions.js");
  if (fs.existsSync(srcJs)) {
    fs.copyFileSync(srcJs, distJs);
  }
  
  // Copy assets directory
  const srcAssets = path.join(root, "assets");
  const distAssets = path.join(distDir, "assets");
  if (fs.existsSync(srcAssets)) {
    copyDir(srcAssets, distAssets);
  }
  
  // Copy public files
  const publicDir = path.join(root, "public");
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    files.forEach(file => {
      const src = path.join(publicDir, file);
      const dist = path.join(distDir, file);
      fs.copyFileSync(src, dist);
    });
  }
  
  // Copy admin directory for Decap CMS
  const adminDir = path.join(root, "admin");
  const distAdminDir = path.join(distDir, "admin");
  if (fs.existsSync(adminDir)) {
    copyDir(adminDir, distAdminDir);
  }
}

async function compileTailwindCSS() {
  try {
    const postcss = require('postcss');
    const tailwindcss = require('@tailwindcss/postcss');
    const autoprefixer = require('autoprefixer');
    
    const srcCss = path.join(root, "src/styles/tailwind.css");
    const distCss = path.join(distDir, "styles.css");
    
    if (!fs.existsSync(srcCss)) {
      console.error('Tailwind CSS source file not found:', srcCss);
      return;
    }
    
    const css = fs.readFileSync(srcCss, 'utf8');
    
    try {
      const result = await postcss([
        tailwindcss,
        autoprefixer
      ]).process(css, { from: srcCss, to: distCss });
      
      fs.writeFileSync(distCss, result.css);
      if (result.map) {
        fs.writeFileSync(distCss + '.map', result.map.toString());
      }
      console.log('[build] Tailwind CSS compiled successfully');
    } catch (error) {
      console.error('Failed to compile Tailwind CSS:', error.message);
      // Fallback: copy the source file if compilation fails
      if (fs.existsSync(srcCss)) {
        fs.copyFileSync(srcCss, distCss);
      }
    }
    
  } catch (error) {
    console.error('Failed to load Tailwind CSS dependencies:', error.message);
    // Fallback: copy the source file if dependencies are missing
    const srcCss = path.join(root, "src/styles/tailwind.css");
    const distCss = path.join(distDir, "styles.css");
    if (fs.existsSync(srcCss)) {
      fs.copyFileSync(srcCss, distCss);
    }
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

module.exports = {
  readJSON,
  loadTemplate,
  writePage,
  copyStaticAssets,
  ensureDistDir
};