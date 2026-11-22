# Rainbow Readers

Rainbow Readers is a web application for reading practice and progress tracking for CBC learners in Grades 1–3. Students practise activities matched to their grade and color level. Teachers manage learners and review progress, and parents can follow the progress of children linked to their account.

## Main features

- Three private practice levels: Purple (early sounds and short words), Yellow (words and phrases), and Red (sentences and comprehension).
- Read-along activities with browser speech audio, hints, and multiple-choice questions.
- Level Checks, weekly checks, weekly activity pacing, and progress records.
- Free Reading stories, including stories teachers can add for a grade and level.
- Teacher tools for learner and parent accounts, progress review, and classroom TV mode.
- Parent views for linked learners’ levels, activities, and progress reports.

## How it works

The frontend uses plain HTML, CSS, and JavaScript; it does not require Node.js to run. `index.html` loads the app from `styles.css`, `data.js`, and `app.js`.

Netlify or another static host can serve the website files. Supabase is a separate backend: the browser calls Supabase database functions to log in, load learner and class data, and save progress. Activity content is in `data.js`; teacher-added stories and learner records are stored in Supabase.

The current code uses custom login and session functions defined in the database, rather than Supabase Auth. The Supabase project must be active and have the required database tables and functions for login and data features to work.

## Run locally

Open `index.html` in a browser, or serve this folder with any local static web server. The pages can load locally, but login and shared data still require an internet connection and a working Supabase project.

## Backend setup

The Supabase SQL setup script is not currently included in this repository. Ask the project owner for the reviewed setup script and Supabase project access. Do not put a Supabase service-role key, dashboard password, or other secret in the frontend.

## Current implementation notes

- The supplied frontend includes a teacher-administration screen, but its `rr_admin_*` database functions are not included in the SQL setup file previously reviewed. That screen needs matching backend functions before it can be relied on.
- In the SQL setup previously reviewed, teacher data loading returns all learners; grade-restricted teacher access is not implemented there.
- The project has not been load-tested, so no maximum number of simultaneous users or response-time guarantee is claimed.
