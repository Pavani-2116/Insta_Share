# Insta Share React App

React/Vite implementation scaffold for the CCBP Insta Share assessment.

## Run

```bash
npm install
npm run dev
```

## Structure

All React components are under `src/components` as required by the project brief.
The app includes login/JWT cookie authentication, protected routes, stories, posts, likes, profile pages, search, loading/failure states, 404 handling, and responsive CSS.

## Test login

Example credential from the brief:
- username: `rahul`
- password: `rahul@2021`

## Main routes

- `/login`
- `/`
- `/my-profile`
- `/users/:id`
- `*` -> Not Found
