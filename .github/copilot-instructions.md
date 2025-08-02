# AI Coding Agent Instructions for camdenebrown.github.io

## Project Overview

This is a Jekyll static site using the Chirpy theme, customized for technical writing and personal branding. The architecture is standard for Jekyll, but leverages theme gem features and custom plugins. Key directories include:

- `_config.yml`: Main site configuration (SEO, analytics, theme, build, comments, etc.)
- `_posts/`, `_tabs/`, `_data/`: Content and data organization
- `_plugins/`: Custom Ruby plugins (e.g., post lastmod hook)
- `assets/`: Static assets (CSS, JS, images)
- `tools/`: Custom shell scripts for build/run/test workflows

## Build, Run, and Test Workflows

- **Local Development:**
  - Use `./tools/run.sh` to start the Jekyll server with live reload.
    - Options: `-p` for production mode, `-H` to set host.
    - Example: `bash ./tools/run.sh -p -H 0.0.0.0`
- **Production Build & Test:**
  - Use `./tools/test.sh` to build and validate the site.
    - Cleans `_site/`, builds with production config, runs `htmlproofer` for link/content validation.
    - Example: `bash ./tools/test.sh`
- **GitHub Pages Deployment:**
  - Automated via `.github/workflows/pages-deploy.yml` on push to `main`/`master`.
  - Uses Ruby 3.3, builds with `bundle exec jekyll b`, tests with `htmlproofer`, deploys to GitHub Pages.

## Key Conventions & Patterns

- **Theme Customization:**
  - Most theme config is in `_config.yml`. Some theme files are copied from the gem for full feature access.
  - Refer to [Chirpy theme docs](https://github.com/cotes2020/jekyll-theme-chirpy/wiki) for advanced options.
- **SEO & Verification:**
  - Site verification codes (`webmaster_verifications`) and analytics IDs are set in `_config.yml`.
- **Content Organization:**
  - Posts: `_posts/` (Markdown)
  - Tabs: `_tabs/` (Markdown)
  - Data: `_data/` (YAML)
- **Plugins:**
  - Custom Ruby plugins in `_plugins/` are loaded automatically by Jekyll.
- **Assets:**
  - Static assets are in `assets/` and referenced via config or Markdown front matter.
- **Exclusions:**
  - Build excludes files/folders as listed in `_config.yml:exclude`.

## Integration Points

- **External:**
  - GitHub Pages for hosting/deployment
  - RubyGems for theme and dependencies
  - htmlproofer for site validation
- **Internal:**
  - Custom shell scripts for local workflows
  - Jekyll plugins for extended functionality

## Example Workflow

1. Edit content in `_posts/` or `_tabs/`.
2. Run `./tools/run.sh` for local preview.
3. Commit and push to `main` for CI/CD deployment.
4. Use `./tools/test.sh` before pushing for local validation.

## References

- `_config.yml`, `tools/run.sh`, `tools/test.sh`, `.github/workflows/pages-deploy.yml`, `README.md`
- [Chirpy theme documentation](https://github.com/cotes2020/jekyll-theme-chirpy/wiki)

---

If any section is unclear or missing, please provide feedback for further refinement.
