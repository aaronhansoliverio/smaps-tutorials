# SMAPS-SIS Tutorial Portal

Coursera-style online tutorial platform for **St. Michael the Archangel Parochial School**.
Built with **React 18 + Vite + Tailwind CSS + React Router 6**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd smaps-tutorials
npm install
```

### 2. Run locally
```bash
npm run dev
# or
npm start
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
The output goes into the `dist/` folder, ready to deploy.

---

## 🎬 Adding Your Google Drive Videos

Before going live, replace the placeholder video IDs in `src/data/courseData.js`.

**Your folder:** https://drive.google.com/drive/folders/1MAuD9JnTwEsBUFuIecX3gPymKbWol4_O

### Steps per video:
1. Open your Google Drive folder.
2. Right-click a video file → **Share** → **Copy link**.
3. Set the access permission to **"Anyone with the link" → Viewer**.
4. The **file ID** is the long string between `/d/` and `/view` in the URL:
   ```
   https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view
                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ```
5. Open `src/data/courseData.js` and replace `REPLACE_WITH_DRIVE_FILE_ID_X` with the real ID.

```js
// Before
driveId: 'REPLACE_WITH_DRIVE_FILE_ID_1',

// After
driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs',
```

---

## ☁️ Deployment

### Option 1 — Vercel (Recommended, free)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Log in
vercel login

# Deploy (first time sets up project)
vercel

# Deploy to production
vercel --prod
```

> `vercel.json` is already included for correct SPA routing.

---

### Option 2 — Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Log in
firebase login

# Initialize (choose Hosting; set public dir to: dist; configure as SPA: yes)
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

Add this to `firebase.json` under `hosting` for SPA routing:
```json
"rewrites": [{ "source": "**", "destination": "/index.html" }]
```

---

### Option 3 — Netlify (drag & drop)

```bash
npm run build
```
Then drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop).

---

## 📁 Project Structure

```
smaps-tutorials/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx            # Top navigation bar
│   ├── pages/
│   │   ├── HomePage.jsx          # Landing page with role selection
│   │   ├── TeacherDashboard.jsx  # Course modules & video list
│   │   ├── VideoPlayer.jsx       # Embedded video player + sidebar
│   │   └── ComingSoon.jsx        # Placeholder for Admin / Parent
│   ├── data/
│   │   └── courseData.js         # ← ADD YOUR DRIVE FILE IDs HERE
│   ├── App.jsx                   # Route definitions
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind directives + global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
├── vercel.json                   # SPA routing for Vercel
└── README.md
```

---

## ✅ Features

| Feature | Status |
|---|---|
| Role-based landing page (Teacher / Admin / Parent) | ✅ |
| Collapsible course modules | ✅ |
| Embedded Google Drive video player | ✅ |
| Video progress tracking (localStorage) | ✅ |
| Mark as Complete / toggle | ✅ |
| Previous / Next video navigation | ✅ |
| Collapsible transcript per video | ✅ |
| Responsive sidebar (desktop + mobile) | ✅ |
| Admin portal | 🔜 Coming soon |
| Parent portal | 🔜 Coming soon |

---

## 🛠 Tech Stack

- [React 18](https://react.dev/)
- [React Router 6](https://reactrouter.com/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Vite 5](https://vitejs.dev/)
