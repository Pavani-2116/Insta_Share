# Insta Share – React Application

Insta Share is a React and Vite-based social media application developed as part of the CCBP Insta Share assessment. It provides an Instagram-like experience with user authentication, stories, posts, profiles, and search functionality.

## Features

- User login with JWT cookie authentication
- Protected routes and authentication handling
- Home page with stories and posts
- View user posts and profiles
- Like functionality for posts
- Search users
- My Profile page
- Loading and failure states
- Custom 404 Not Found page
- Responsive user interface

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development and build tool |
| JavaScript | Application logic |
| CSS3 | Styling and responsive design |
| React Router | Client-side routing |
| JWT | Authentication |
| Cookies | Authentication token storage |

## Main Routes

| Route | Description |
|---|---|
| `/login` | User login |
| `/` | Home page |
| `/my-profile` | Logged-in user's profile |
| `/users/:id` | View another user's profile |
| `*` | Not Found page |

## Project Structure

```text
Insta_Share/
├── src/
│   └── components/
│       ├── Login/
│       ├── Home/
│       ├── MyProfile/
│       ├── UserProfile/
│       └── ...
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

All React components are organized under `src/components` according to the project requirements.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Pavani-2116/Insta_Share.git
```

### 2. Navigate to the Project Folder

```bash
cd Insta_Share
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## Test Login Credentials

Use the example credentials provided in the assessment brief:

| Field | Value |
|---|---|
| Username | `rahul` |
| Password | `rahul@2021` |

*The test account and authentication API must be available for these credentials to work.*

## Authentication and Routing

- JWT-based authentication using cookies.
- Protected routes restrict access to authenticated users.
- Login and logout flows manage authentication state.
- React Router handles application navigation.
- Loading, failure, and invalid-route states improve the user experience.

## Author

**Pavani Mada**

- GitHub: https://github.com/Pavani-2116
- LinkedIn: https://www.linkedin.com/in/pavani-mada/

---

*Developed as a React application to practice component-based development, authentication, routing, and API integration.*
