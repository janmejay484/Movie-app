# 🎬 Favorite Movies & TV Shows Web App

A full-stack web application that allows users to manage their favorite movies and TV shows — including adding, editing, and deleting entries.  
Built using **React + Vite + Material UI (frontend)** and **Node.js + Express + Prisma + PostgreSQL (backend)**.

---

## 📂 Project Structure

<img width="595" height="98" alt="image" src="https://github.com/user-attachments/assets/36fbeac8-49cf-4dfd-8a6c-a37a24881bc3" />


---

## 🚀 Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Material UI
- Axios
- Infinite scroll with Intersection Observer

**Backend:**
- Node.js + Express
- Prisma ORM
- PostgreSQL (Render-hosted)
- Zod (for schema validation)
- JWT Auth (for login/signup)

---

## ⚙️ Backend Setup (Server)

### 1️⃣ Navigate & Install
```bash
cd server
npm install
```
2️⃣ Environment Setup

<h1> Create a .env file in /server directory: </h1>  

DATABASE_URL="postgresql://<username>:<password>@<host>:5432/<database>?schema=public" <br>
JWT_SECRET="your_jwt_secret_here"<br>
PORT=4000

<H1>3️⃣ Prisma Setup</H1>

Generate Prisma client and run migrations:

npx prisma generate <br>
npx prisma migrate deploy<br>
npx prisma studio

4️⃣ Start Server
npm run dev

👉 http://localhost:4000

If deployed on Render, your public API will be:
https://your-app-name.onrender.com/api


<h1>🧱 Database Schema (Prisma)</h1>

| Field         | Type     | Attributes                      | Description                        |
| ------------- | -------- | ------------------------------- | ---------------------------------- |
| **id**        | Int      | `@id @default(autoincrement())` | Unique user ID                     |
| **name**      | String   |                                 | User’s full name                   |
| **email**     | String   | `@unique`                       | User’s email (must be unique)      |
| **password**  | String   |                                 | Hashed password                    |
| **createdAt** | DateTime | `@default(now())`               | Timestamp of account creation      |
| **entries**   | Entry[]  | Relation                        | Links to user’s movie/show entries |

| Field         | Type     | Attributes                                      | Description                       |
| ------------- | -------- | ----------------------------------------------- | --------------------------------- |
| **id**        | Int      | `@id @default(autoincrement())`                 | Unique entry ID                   |
| **title**     | String   |                                                 | Movie or TV show title            |
| **type**      | String   |                                                 | Type (e.g., "Movie" or "TV Show") |
| **director**  | String   |                                                 | Director’s name                   |
| **budget**    | String?  | `Optional`                                      | Budget information                |
| **location**  | String?  | `Optional`                                      | Filming or story location         |
| **duration**  | String?  | `Optional`                                      | Duration (in minutes or hours)    |
| **yearTime**  | String?  | `Optional`                                      | Year or release time              |
| **imageUrl**  | String?  | `Optional`                                      | Poster or image URL               |
| **userId**    | Int      | Foreign Key                                     | References the user who added it  |
| **user**      | User     | `@relation(fields: [userId], references: [id])` | Relation to `User` model          |
| **createdAt** | DateTime | `@default(now())`                               | Timestamp of creation             |
| **updatedAt** | DateTime | `@updatedAt`                                    | Auto-updated on modification      |



<h1>🖥️ Frontend Setup (Client)</h1>
1️⃣ Navigate & Install

cd client
npm install

<h1>
2️⃣ Environment Variables</h1>
Create a .env file in /client:<br>
VITE_API_URL=https://your-backend.onrender.com/api
<h1>3️⃣ Run Locally</h1>
npm run dev
<h1>4️⃣ Build for Production</h1>
npm run build
<br>
<h1>Create new Web Service</h1>
<br>
Root Directory → server
<br>
Build Command:
<br>
npm install && npx prisma generate
<br>

Start Command:
<br>
npm run dev
<br>
Add .env variables (DATABASE_URL, JWT_SECRET, etc.)
<br>

<h1>📸 Features</h1>
<br>

✅ Add movies or TV shows<br>
✅ Edit and delete entries<br>
✅ Infinite scrolling<br>
✅ User authentication<br>
✅ Responsive Material UI design

<br>


