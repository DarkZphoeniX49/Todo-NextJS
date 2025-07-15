# ✅ Todo App – Next.js 14, MongoDB & Google Auth

This is a modern full-stack Todo application built with the Next.js App Router. It allows users to log in using Google, manage their tasks (create, toggle, and sort them), and share task views via URL parameters.

---

## 🛠 Tech Stack

- **Next.js 14+** (App Router): For full-stack capabilities with Server Components, routing, and SSR.
- **MongoDB** + **Mongoose**: For document-based storage and data modeling.
- **NextAuth.js**: For secure, built-in authentication with Google OAuth.
- **TypeScript**: For type safety and better developer experience.
- **Inline Styles**: used for more facility in the developpement

> This stack showcases modern, production-ready technologies commonly used in React-based applications.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-app-nextjs.git
cd todo-app
```


### 2. Install dependencies
   
```bash
npm install
```

### 3. Environment variables

Create a .env.local file at the root of the project:
```bash

DATABASE_URL="mongodb+srv://admin:admin@cluster0.vjfxpdd.mongodb.net/todo?retryWrites=true&w=majority"
GOOGLE_CLIENT_ID=922260146867-3ehg8f6jhak8557j08jgio890vs1nnj7.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET=55f10c05e5db3d769580bcbf65c7c81b
NEXTAUTH_URL=http://localhost:3000

```
### 4. Run the app
```bash
npm run dev
```

The app will be available at: http://localhost:3000

🔐 Authentication
Authentication is handled with Google using NextAuth.

Users are redirected to /login if unauthenticated.

After login, they are redirected to /todo, where their tasks are fetched.

⚙️ Where SSR, Caching & Auth Are Applied
✅ SSR (Server-Side Rendering)
The TodoPage (/todo) uses getServerSession() in a Server Component to validate the session.

The tasks are fetched client-side for sorting and interactivity.

✅ Authentication
Pages like /todo are protected and only accessible after login.

Auth session is handled securely server-side using next-auth.

⚠️ Caching
No caching strategy was applied, but the architecture supports future implementation (SWR or server cache).

✨ Features
✅ Google Login

✅ Add Task (Title + Description)

✅ Toggle Completion

✅ Sorting by Date / Completion

✅ Shareable URLs with query string (e.g. ?sort=completed)

✅ Server-side auth enforcement

✅ Clean and responsive UI