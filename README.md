# 🌈 Rainbow Readers

> **A color-coded reading system for CBC learners in Grades 1–3 at Madaraka Primary built so students can practice, teachers can track, and parents can support, at home or on the classroom TV.**

Rainbow Readers organizes foundational reading into three color-coded pathways — **Starting (Blue)**, **Growing (Gold)**, and **Exploring (Green)** — keeping reading practice private, encouraging, and stigma-free between school and home.

---

## 🌟 Key Features

1. **Role-Based Access (3 Portals)**:
   - **Student Portal**: Take a 5-stage baseline assessment, practice pronunciation with audio, read sentences with karaoke-style highlighting, and unlock badges.
   - **Teacher Portal**: Class Overview with 13 learners, "Needs support" tracking, pathway distribution analytics, and TV / Classroom Mode.
   - **Parent Portal**: View child's milestones, earned stickers, and daily home reading audio guides.
2. **Built-in Offline Audio Engine**:
   - Uses Web Speech API for clear letter, syllable, word, and sentence pronunciation.
   - Uses Web Audio API for success chimes and celebratory fanfares.
   - Zero external audio file failures or buffering delays!
3. **Classroom TV / Projector Mode**:
   - High-contrast, large-format display for classroom TVs and projectors.
   - Whole-class audio broadcast and comprehension polls.
4. **Data Persistence**:
   - Stores progress and unlocked badges in `localStorage`.
   - Includes a 1-click **Reset Demo Data** button in the footer for repeatable walkthroughs.

---

## 🔑 Demo Accounts (Displayed on Login Screen)

| Role | Username | Password | Profile |
| :--- | :--- | :--- | :--- |
| **Student** | `amani` | `read123` | **Amani Otieno** (Grade 2, Class 2A) |
| **Teacher** | `kamau` | `teach123` | **Mrs. Wanjiru Kamau** (Madaraka Primary) |
| **Parent** | `parent` | `home123` | **Mrs. Otieno** (Parent of Amani) |

*Each login screen provides a 1-click **"⚡ 1-Click Sign In"** button for instant demonstration.*

---

## 🚀 Running Locally

Rainbow Readers has **zero external dependencies** and runs with pure modern web standards.

```bash
# Start the local server
node server.js
```

Open your browser at:  
👉 **`http://localhost:3000`**

---

## 🌐 Deploying to GitHub Pages (Free Online Hosting)

Because Rainbow Readers uses **100% relative paths (`./`)** and client-side hash routing (`#/`), it is completely ready for GitHub Pages:

1. **Create a new repository** on [GitHub](https://github.com/new) (e.g., named `rainbow-readers`).
2. In your terminal inside this project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Rainbow Readers CBC web app"
   git branch -M main
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/rainbow-readers.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** &gt; **Source**, select **Deploy from a branch**.
   - Select branch: **`main`** and folder: **`/ (root)`**, then click **Save**.
4. Within 1–2 minutes, your live site will be accessible at:  
   👉 `https://<YOUR-GITHUB-USERNAME>.github.io/rainbow-readers/`

---

## 📁 Project Structure

```
rainbow-readers/
├── index.html            # Main HTML shell with SEO meta tags
├── server.js             # Zero-dependency local Node.js server
├── package.json          # Project metadata and run scripts
├── README.md             # Documentation & deployment guide
├── css/
│   └── styles.css        # Complete design system & responsive styling
└── js/
    ├── app.js            # App controller & hash routing
    ├── audio.js          # Web Speech & Web Audio synthesizer engine
    ├── data.js           # Curriculum bank, 13 CBC learners, demo users
    ├── parent.js         # Parent dashboard & Milestones cards
    ├── public.js         # Home, About (exact replica), How It Works, Login
    ├── store.js          # Persistent reactive state store in localStorage
    ├── student.js        # 5-stage comprehension check & badge unlock
    └── teacher.js        # Class Overview, Analytics charts, TV Mode
```
