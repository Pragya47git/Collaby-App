# How to Host Collaby on GitHub Pages

This project is pre-configured for GitHub Pages deployment with relative asset resolution (`base: './'`), bundled static images, and an automated GitHub Actions deployment workflow.

---

## Method 1: Automated GitHub Actions (Recommended)

1. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy Collaby to GitHub Pages"
   git push origin main
   # or 'git push origin master' depending on your default branch name
   ```

2. **Enable GitHub Pages via Actions**:
   - Go to your repository on GitHub: `https://github.com/Mridul2214/CollabAi`
   - Click **Settings** (top tab) → **Pages** (left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - That's it! The workflow in `.github/workflows/deploy.yml` will automatically build the project and publish it.
   - Your live URL will appear at:
     ```
     https://<your-username>.github.io/CollabAi/
     ```

---

## Method 2: Manual Deploy with `gh-pages` Branch

If you prefer building locally and pushing the static output:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**:
   ```bash
   npx gh-pages -d dist
   ```

3. **Verify in GitHub Settings**:
   - In **Settings** → **Pages**, set **Source** to **Deploy from a branch**.
   - Select branch `gh-pages` and folder `/ (root)`.

---

## Important Notes for GitHub Pages:
- **Relative Path Compatibility**: In `vite.config.ts`, `base: './'` is configured so that scripts, stylesheets, and images load correctly whether hosted at `https://<username>.github.io/<repo>/` or on a custom domain.
- **Client-Side Resilient AI**: Since GitHub Pages is a static host without a Node server, Collaby includes automatic client-side fallback engines for the AI Co-pilot, Kanban task decomposition, Document summary/polish, and Whiteboard architecture diagram generation so the app works reliably for all visitors.
