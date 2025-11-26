# 🎨 ToolNest AI — Full-Stack AI Content & Image Creation Platform

An AI-powered productivity suite offering content generation, image tools, resume analysis, and a social gallery. Built with **React + TypeScript**, **Express + TypeScript**, **Clerk Authentication**, and **Gemini AI**.

---

## 🚀 Features

### 🧠 AI Tools (6 Total)

- **Write Article** – long-form AI articles with length options
- **Blog Title Generator** – catchy titles across categories
- **AI Image Generator** – ClipDrop-powered multi-style image creation
- **Background Remover** – Cloudinary AI background removal
- **Object Remover** – Remove a single object from images
- **Resume Reviewer** – PDF analysis + feedback

### 🔐 Authentication

- Clerk auth (email/password + social)
- Bearer token secured backend routes
- Premium plan support

### 🖼️ Community Gallery

- Publish images
- Like/unlike creations
- Masonry layout

### 📊 Personal Dashboard

- All user creations
- Image + markdown rendering
- Expandable creation items

---

---

## 📸 Screenshots

### 🏠 Home Page

<p align="center">
  <img src="./assets/screenshots/home.png" alt="Home Page" width="850" />
</p>

### 📊 Dashboard

<p align="center">
  <img src="./assets/screenshots/dashboard.png" alt="Dashboard" width="850" />
</p>

### 📝 Article Generator

<p align="center">
  <img src="./assets/screenshots/article-generator.png" alt="Article Generator" width="850" />
</p>

### ✍️ Blog Title Generator

<p align="center">
  <img src="./assets/screenshots/blog-titles.png" alt="Blog Titles Generator" width="850" />
</p>

### 🎨 AI Image Generator

<p align="center">
  <img src="./assets/screenshots/image-generator.png" alt="AI Image Generator" width="850" />
</p>

### 🧽 Background Remover

<p align="center">
  <img src="./assets/screenshots/background-removal.png" alt="Background Removal" width="850" />
</p>

### ✂️ Object Remover

<p align="center">
  <img src="./assets/screenshots/object-removal.png" alt="Object Removal" width="850" />
</p>

### 📄 Resume Reviewer

<p align="center">
  <img src="./assets/screenshots/resume-review.png" alt="Resume Review" width="850" />
</p>

### 🖼️ Community Gallery

<p align="center">
  <img src="./assets/screenshots/community.png" alt="Community Gallery" width="850" />
</p>

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript
- Vite
- Clerk React
- Tailwind CSS
- Axios
- React Router
- React Markdown

### Backend

- Express + TypeScript
- Clerk Express
- PostgreSQL (Neon)
- Multer
- Cloudinary
- OpenAI SDK (Gemini)
- ClipDrop

---

## 📂 Folder Structure

### Client

```
client/
  src/
    components/
    pages/
      Layout.tsx
      Dashboard.tsx
      WriteArticle.tsx
      BlogTitles.tsx
      GenerateImages.tsx
      RemoveBackground.tsx
      RemoveObject.tsx
      ReviewResume.tsx
      Community.tsx
    utils/api.ts
    config/constants.ts
    types/api.ts
    App.tsx
    main.tsx
```

### Server

```
server/
  src/
    controllers/
      aiController.ts
      userController.ts
    routes/
      aiRoutes.ts
      userRoutes.ts
    middleware/auth.ts
    configs/
      db.ts
      cloudinary.ts
      multer.ts
    types/index.d.ts
    server.ts
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK
    (type IN ('article', 'blog-title', 'image', 'resume-review')),
  publish BOOLEAN DEFAULT false,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_id ON creations(user_id);
CREATE INDEX idx_publish ON creations(publish) WHERE publish = true;
CREATE INDEX idx_created_at ON creations(created_at DESC);
```

---

## ⚙️ Environment Variables

### Client

```
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=
```

### Server

```
DATABASE_URL=
CLERK_SECRET_KEY=
GEMINI_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CLIPDROP_API_KEY=

PORT=3000
```

---

## 📡 API Endpoints

### AI

```
POST /api/ai/generate-article
POST /api/ai/generate-blog-title
POST /api/ai/generate-image
POST /api/ai/remove-image-background
POST /api/ai/remove-image-object
POST /api/ai/resume-review
```

### User

```
GET  /api/user/get-user-creations
GET  /api/user/get-published-creations
POST /api/user/toggle-like-creation/:id
```

---

## 🧪 Commands

### Client

```
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
```

### Server

```
pnpm install
pnpm dev
pnpm build
pnpm start
```

---

## 🧠 Core Logic Summaries

### Auth Flow

1. Clerk generates JWT
2. Client sends `Authorization: Bearer <token>`
3. Express middleware validates
4. Adds `req.userId`, `req.plan`, `req.free_usage`
5. Controllers enforce free/premium access

### Image Processing

- ClipDrop → Base64 → Cloudinary → PostgreSQL

### Background Removal

- Multer → Cloudinary AI → URL → DB

### Object Removal

- Cloudinary generative remove → URL → DB

### Resume Review

- PDF → pdf-parse → Gemini → markdown → DB

---

## 🖥️ Local Development

### Frontend

```
cd client
pnpm dev
```

### Backend

```
cd server
pnpm dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3000

---

## 📦 Deployment (Vercel Recommended)

### Backend

```
cd server
vercel --prod
```

### Frontend

```
cd client
vercel --prod
```

---

## 📜 License

MIT License

---

## ⭐ Acknowledgements

- Clerk
- Google Gemini
- Cloudinary
- ClipDrop
- NeonDB
- Vite & React

---

⭐ **If you like this project, consider starring the repository!**
