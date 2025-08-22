# Sébastien Mullor – Static Site (JSON + Decap CMS)

Fully static HTML site generated from JSON content (no SSG framework) using small Node build scripts. Decap CMS (Git-based) edits JSON; build script produces SEO-friendly static pages for GitHub Pages.

## 1. Stack Overview
* Content: `content/*.json`
* Templates: `templates/*.template.html` (simple placeholder replacement)
* Build script: `scripts/build.js` → outputs `index.html`, `architecture.html`, `contact.html`
* Watch/dev: `scripts/dev.js`
* CMS: Decap (in `admin/`) using GitHub backend + OAuth (self-host or any provider)

## 2. Repository Structure
```
admin/              Decap CMS admin + config
assets/             Images (managed by CMS)
content/            JSON source content (edit via CMS)
  site.json         Global site metadata (base URL, schema data)
scripts/            build.js & dev.js
templates/          HTML templates with {{PLACEHOLDERS}}
index.html          Generated (do not edit manually)
architecture.html   Generated (do not edit manually)
contact.html        Generated (do not edit manually)
```

## 3. Prerequisites
* Node.js ≥ 16
* GitHub repo (GitHub Pages enabled)
* (For CMS auth) A GitHub OAuth app + tiny OAuth backend

## 4. Install
```bash
npm install
```

## 5. Development (auto-rebuild)
```bash
npm run dev
```
Edits to anything in `content/` or `templates/` regenerate the HTML pages.

## 6. Manual Build
```bash
npm run build
```
Outputs static HTML with full SEO meta + structured data.

## 7. Deploy (GitHub Pages)
### Option A: Serve from `main`
1. Settings → Pages → Source: `Deploy from a branch`
2. Branch: `main` / root
3. Commit & push generated HTML (ensure you ran `npm run build` before pushing).

### Option B: Separate `gh-pages` branch (build artifact only)
Add a GitHub Action that runs the build and pushes the built files to `gh-pages`. (Not added by default to keep repo minimal.)

## 8. Decap CMS (GitHub Backend) Setup
### 8.1 Create GitHub OAuth App
1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Homepage URL: `https://<your-pages-domain>/` (or custom domain)
3. Authorization callback URL: `https://<your-oauth-domain>/callback`
4. Save; note Client ID & Client Secret.

### 8.2 Self-Host OAuth Provider
You can use an existing lightweight OAuth proxy (e.g. `netlify/netlify-cms-oauth-provider` Docker image) behind your reverse proxy.

Environment variables (example):
```
OAUTH_CLIENT_ID=<github_client_id>
OAUTH_CLIENT_SECRET=<github_client_secret>
REDIRECT_URL=https://oauth.example.com/callback
PORT=3000
```

Expose it at `https://oauth.example.com`. Then in `admin/config.yml` add:
```
backend:
  name: github
  repo: arbona-robin/sebastienmullor
  branch: main
  base_url: https://oauth.example.com
```
(`base_url` not yet set—add it when OAuth server is ready.)

### 8.3 Accessing CMS
Navigate to `https://<your-pages-domain>/admin/` and authenticate.

## 9. Editing Content
* Through CMS: Fields map directly to JSON in `content/`.
* Directly: Edit JSON then run `npm run build`.

## 10. Adding a New Page
1. Create `content/newpage.json` with `meta` + your data structure.
2. Create `templates/newpage.template.html` with placeholders (e.g. `{{PAGE_TITLE}}`, custom tokens).
3. Extend `scripts/build.js`: add a `buildNewPage()` that reads JSON, replaces placeholders, writes `newpage.html`.
4. (Optional) Add a new entry in `admin/config.yml` under `files:` so CMS can manage it.
5. Run `npm run build`.

## 11. Placeholders & Meta
Supported core placeholders inserted by build script:
* `{{PAGE_TITLE}}` – from `meta.title`
* `{{HEAD_META}}` – auto-generated: canonical, OG/Twitter tags, favicons, structured data (index page adds Person schema)
* Custom tokens replaced manually in build functions (see `build.js`).

## 12. Global Metadata (`content/site.json`)
Controls site-wide schema data & base URL. Update if you change the published domain.

## 13. Regenerating SEO Tags
Edit each page's `meta` object (`title`, `description`, `image`, `path`, `type`). Run build.

## 14. Assets / Images
* Managed via Decap (uploads to `assets/`).
* Reference them in JSON (`assets/<file>`). Build script outputs correct `<img>` elements.

## 15. Safety / Gotchas
* Never edit generated root HTML files directly; changes will be overwritten.
* Always run `npm run build` before committing to ensure HTML reflects JSON.
* If adding an Action to auto-build, guard against infinite commit loops by using `[skip ci]` in the autocommit message or filtering paths.

## 16. Reuse for Other Clients
1. Duplicate repo as template.
2. Replace branding in `content/` JSON + `site.json`.
3. Adjust gallery / images.
4. Configure new GitHub OAuth App & update `admin/config.yml` `repo` & `base_url`.

## 17. Troubleshooting
| Issue                 | Fix                                                              |
| --------------------- | ---------------------------------------------------------------- |
| CMS login fails (401) | Verify OAuth server `base_url` and callback URL match OAuth app. |
| Images not showing    | Confirm path starts with `assets/` and file committed.           |
| SEO meta missing      | Ensure `meta` object has `description`, run build.               |
| New page not building | Added function in `build.js` and called it in `buildAll()`?      |

## 18. Future Enhancements (Optional)
* Add minification step.
* Add GitHub Action for automated build.
* Add sitemap generator using JSON content.
* Internationalization by adding locale-specific JSON sets.

## 19. License
Private / client project – add a license here if needed.

---
For questions: open an issue or adjust JSON + run the build.
