
# Fernando Silva — Python Backend & Application Security Portfolio

A single-page portfolio presenting my path toward junior Python backend development and application security. It highlights selected projects, security labs, and academic work without treating every experiment as production-ready. Built as a static site with a restrained, editorial "security dossier" aesthetic.

**Live sections:** Briefing (hero) · Dossier (about) · Operations (projects) · Intel (writing) · Credentials (certifications & stack) · Contact

---

## ⚙️ Tech Stack

| Layer | Choice |
| :--- | :--- |
| **Build Tool** | Vite 5 |
| **Framework** | React 18 *(functional components, hooks only)* |
| **Styling** | Tailwind CSS 3 *(custom theme, no default palette)* |
| **Icons** | `lucide-react` |
| **Fonts** | Space Grotesk *(display)* · JetBrains Mono *(terminal/data)* · Inter *(body)* |
| **Forms** | Formspree *(falls back gracefully if unconfigured)* |

*Output is 100% static — no server, no database, no backend runtime. `npm run build` produces plain HTML/CSS/JS that can be hosted anywhere.*

---

## 🚀 Featured Work & Academic Contributions

The portfolio presents selected security/backend projects and distinguishes personal work from academic team contributions:
* **CodeGuard AI:** Security-analysis experiment; consult its repository for current scope and limitations.
* **NyxOne:** Python AST and CI security-gate experiment; consult its repository for current scope and limitations.
* **CyberReport-Pro:** Python security-reporting automation with study-oriented GDPR/ENS mappings.
* **SecOps Telemetry:** Linux authentication analytics via PostgreSQL and Grafana SIEM.
* **DuckyArenas — DuckyShop & DuckyBank:** Academic team project. My individual contribution focuses on Django shop/catalog and wallet/transaction backend components, purchase coordination, and idempotency. [PR #87](https://github.com/Martret92/duckyarenas-team5/pull/87) is merged; [PR #122](https://github.com/Martret92/duckyarenas-team5/pull/122) is a separate review item and is not described as merged. [Individual contribution case study](DUCKYARENAS_CONTRIBUTION.md).

The DuckyArenas entry describes an individual contribution to a collaborative repository, not ownership of the entire project or a claim that every integration decision is complete.

---

## 💻 Getting Started

```sh
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally

```

---

## 📂 Project Structure

```text
├── index.html              # Entry HTML — meta tags, fonts, JSON-LD
├── tailwind.config.js      # Custom color palette, fonts, animation tokens
├── .env                    # Environment variables (Formspree endpoint)
├── package.json
├── public/
│   ├── favicon.svg
│   ├── profile.jpg         # ← Add your headshot here
│   └── resume.pdf          # ← Add your PDF résumé here
└── src/
    ├── main.jsx            # React root
    ├── index.css           # CSS variables, global styles, grain texture
    └── App.jsx             # Entire site — all sections and components

```

> **Note:** Everything UI-related lives in `App.jsx` by design. It is split into clearly commented blocks (data, utilities, then one component per section) rather than fragmented into micro-files. This optimizes top-to-bottom scanning for a single-page site of this scope.

---

## 🔧 Configuration

All personalize-able content lives at the top of `src/App.jsx`. Nothing else in the file needs to change for day-to-day data updates.

### 1. Links

Update the single source of truth for your profiles:

```javascript
const LINKS = {
  resume: "/resume.pdf", 
  linkedin: "https://www.linkedin.com/in/fernando-silva-83b155a4/",
  github: "https://github.com/silvatechf",
  email: "your-email",
};

```

### 2. Content Arrays

* `NAV_LINKS`: Top navigation and command palette entries.
* `OPERATIONS`: Project/case-study cards (e.g., CodeGuard AI, NyxOne).
* `ARTICLES`: Intel (blog) entries and field notes.
* `CERTIFICATIONS`: Formal certifications. Add a `credentialUrl` to activate the real clickable "Verified" badge.
* `CONTINUING_EDUCATION`: Courses and self-study, rendered with lighter visual weight.
* `STACK`: Capability matrix (level is 0–10, rendered as block characters).

### 3. Contact Form & Environment Variables

To protect your API endpoints, use a `.env` file at the root of the project:

```text
VITE_FORMSPREE_ENDPOINT="[https://formspree.io/f/YOUR_FORM_ID](https://formspree.io/f/YOUR_FORM_ID)"

```

Inside `App.jsx`, this is securely mapped via Vite's import mechanism:

```javascript
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

```

Create a free form at [Formspree](https://formspree.io) and paste your ID into the `.env` file. Until configured, the form runs through its full UX (encrypting → sent) without actually delivering mail, allowing you to test the flow.

### 4. Assets

* **Photo:** Drop a headshot at `public/profile.jpg`. It is automatically desaturated and tinted with the brand palette via CSS. If missing, the site falls back to an abstract gradient placeholder seamlessly.
* **Résumé:** Drop a PDF at `public/resume.pdf` and ensure `LINKS.resume` points to it. The primary button will automatically detect the `.pdf` extension and switch from "open in new tab" to a forced file download.

---

## 🔍 Implementation Details

* **Command Palette (`⌘K` / `Ctrl+K`):** Keyboard-first navigation across sections and external links.
* **Boot Sequence:** One-time system-initialization overlay per browser session (`sessionStorage`), skipped entirely for users with `prefers-reduced-motion`.
* **Scroll Hex Rail:** Desktop-only telemetry readout tied to scroll position — a restrained motion motif instead of a decorative looping animation.
* **Custom Cursor:** Active only on precise-pointer devices (`hover: hover` + `pointer: fine`). Never interferes with touch devices.
* **Accessibility:** All motion strictly respects `prefers-reduced-motion: reduce` across the entire DOM.

---

## ☁️ Deployment

Any static host works. Push the `dist/` directory (or connect the repo directly) to your preferred provider:

* **Vercel:** Run `vercel deploy`, or import the Git repo in the dashboard.
* **Netlify:** Drag-and-drop `dist/`, or connect the repo (Build command: `npm run build`, Publish directory: `dist`).
* **Cloudflare Pages / GitHub Pages:** Same build command and output directory.

---

## 📄 License

Personal project — content and copy are © 2026 Fernando Silva. Code structure is free to reference for your own portfolio.

