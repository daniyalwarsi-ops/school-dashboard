# School Dashboard

A small Next.js registry dashboard (students + teachers), rebuilt with a component-based
structure. Every component lives in its own folder next to its own CSS Module, so styles
never leak between components.

## Structure

```
components/
  Avatar/             Avatar.jsx + Avatar.module.css        (renders a person's photo)
  RegisterButton/     RegisterButton.jsx + RegisterButton.module.css
  RegisterModal/      RegisterModal.jsx + RegisterModal.module.css  (image upload + form)
  PersonTable/        PersonTable.jsx + PersonTable.module.css   (reused for both tables)
data/
  students.js          sample student records (name, email, date, photo url)
  teachers.js           sample teacher records
pages/
  _app.js               loads global styles
  index.js              holds students/teachers state + opens RegisterModal on click
styles/
  globals.css           design tokens (colors, type, radius) as CSS variables
  Home.module.css        page background + centered card layout
```

## How registration works

Clicking **+ Register Student** or **+ Register Teacher** opens `RegisterModal`, pre-set to
that user type (you can still switch the "User Type" dropdown inside the form). The form
collects:

- an optional photo (drag/click "Upload Image" — read client-side with `FileReader`, no
  upload server needed; if you skip it, a generated initials avatar is used instead)
- full name
- email address
- user type (Student / Teacher)

On submit, `pages/index.js` prepends the new person to the right table's state (`students`
or `teachers`), so it appears at the top of the list immediately. This is all in-memory —
refreshing the page resets it. Wire `handleRegister` in `pages/index.js` up to a real API
call when you're ready to persist data.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes

- Each component's CSS file is a **CSS Module** (`*.module.css`), so class names are
  automatically scoped to that component — no naming collisions, no global overrides.
- `PersonTable` is shared between the Students and Teachers sections; it takes `title`,
  `roleLabel`, `people`, and an `onRegister` callback as props.
- Swap the `alert(...)` calls in `pages/index.js` for real navigation/modal logic when you
  wire up an actual registration form.
