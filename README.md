# ToolNest AI

A comprehensive AI-powered creative toolkit built with the MERN stack, featuring intelligent content generation, advanced image processing, and professional resume analysis.

## Live Demo

- **Frontend:** https://toolnestai.vercel.app
- **Backend API:** https://toolnestai-server.vercel.app

## Overview

ToolNest AI is a production-ready SaaS platform that provides creators, marketers, and professionals with an intuitive suite of tools to generate articles, create stunning visuals, process images, and enhance resumes — all powered by cutting-edge AI models.

### Key Highlights

- Full-Stack TypeScript with strict mode enabled
- Enterprise Authentication with Clerk integration
- Cloud-Native Infrastructure deployed on Vercel with NeonDB
- Freemium Model with usage-based limits
- Mobile-first responsive design with Tailwind CSS

## System Architecture

```mermaid
flowchart TB
    subgraph Client
        React[React + TypeScript]
        Clerk_SDK[Clerk Auth SDK]
        Router[React Router]
    end

    subgraph Server
        Express[Express API]
        Auth[Clerk Middleware]
        Controllers[Controllers]
    end

    subgraph Database
        NeonDB[(NeonDB PostgreSQL)]
    end

    subgraph External
        Gemini[Google Gemini AI]
        Cloudinary[Cloudinary CDN]
        ClipDrop[ClipDrop API]
        Clerk_Auth[Clerk Auth]
    end

    React --> Express
    Clerk_SDK --> Clerk_Auth
    Express --> Auth
    Auth --> Controllers
    Controllers --> NeonDB
    Controllers --> Gemini
    Controllers --> Cloudinary
    Controllers --> ClipDrop
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant API
    participant Clerk
    participant AI
    participant DB

    User->>Client: Submit prompt
    Client->>API: POST /api/ai/generate
    API->>Clerk: Validate token
    Clerk-->>API: User context + plan
    API->>API: Check usage limits
    API->>AI: Generate content
    AI-->>API: Generated result
    API->>DB: Save creation
    DB-->>API: Saved
    API->>Clerk: Update usage count
    API-->>Client: Response
    Client-->>User: Display result
```

## Database Schema

```mermaid
erDiagram
    USERS ||--o{ CREATIONS : creates

    USERS {
        string id PK
        string email
        string name
        json public_metadata
        json private_metadata
    }

    CREATIONS {
        int id PK
        string user_id FK
        string prompt
        text content
        string type
        boolean publish
        string[] likes
        timestamp created_at
    }
```

### Creations Table

| Column     | Type               | Description                               |
| ---------- | ------------------ | ----------------------------------------- |
| id         | SERIAL PRIMARY KEY | Auto-incrementing unique identifier       |
| user_id    | VARCHAR(255)       | Clerk user ID                             |
| prompt     | TEXT               | User's input prompt                       |
| content    | TEXT               | Generated content or image URL            |
| type       | ENUM               | article, blog-title, image, resume-review |
| publish    | BOOLEAN            | Public visibility flag                    |
| likes      | TEXT[]             | Array of user IDs who liked               |
| created_at | TIMESTAMP          | Creation timestamp                        |
| updated_at | TIMESTAMP          | Last modification timestamp               |

## Component Architecture

```mermaid
flowchart TB
    App[App.tsx]

    subgraph Public
        Home[Home]
        NotFound[404]
    end

    subgraph Protected
        Layout[Layout]
        Dashboard[Dashboard]
        WriteArticle[Write Article]
        BlogTitles[Blog Titles]
        GenerateImages[Generate Images]
        RemoveBackground[Remove Background]
        RemoveObject[Remove Object]
        ReviewResume[Review Resume]
        Community[Community]
    end

    subgraph Components
        Navbar[Navbar]
        Sidebar[Sidebar]
        Footer[Footer]
        Hero[Hero]
    end

    App --> Home
    App --> NotFound
    App --> Layout
    Layout --> Dashboard
    Layout --> WriteArticle
    Layout --> BlogTitles
    Layout --> GenerateImages
    Layout --> RemoveBackground
    Layout --> RemoveObject
    Layout --> ReviewResume
    Layout --> Community
    Home --> Navbar
    Home --> Hero
    Home --> Footer
    Layout --> Sidebar
```

## API Request Flow

```mermaid
flowchart LR
    subgraph Client
        Action[User Action]
        Component[React Component]
    end

    subgraph Middleware
        CORS[CORS]
        ClerkMW[Clerk Auth]
        AuthMW[Auth Middleware]
    end

    subgraph Logic
        Controller[Controller]
        UsageCheck[Usage Check]
    end

    subgraph Services
        Gemini[Gemini AI]
        ClipDrop[ClipDrop]
        Cloudinary[Cloudinary]
    end

    subgraph Storage
        DB[(NeonDB)]
        Clerk[Clerk Metadata]
    end

    Action --> Component
    Component --> CORS
    CORS --> ClerkMW
    ClerkMW --> AuthMW
    AuthMW --> UsageCheck
    UsageCheck --> Controller
    Controller --> Gemini
    Controller --> ClipDrop
    Controller --> Cloudinary
    Controller --> DB
    Controller --> Clerk
```

## Tech Stack

### Frontend

- React 19.1
- TypeScript 5.7
- Vite 7
- Tailwind CSS 4.1
- React Router 7.6
- Clerk React 5.35
- React Markdown 10.1
- React Hot Toast 2.5
- Axios 1.10
- Lucide React 0.525

### Backend

- Node.js
- Express 4.21
- TypeScript 5.7
- Clerk Express 1.7
- Neon Serverless 1.0
- OpenAI 5.10 (Gemini)
- Cloudinary 2.7
- Multer 2.0
- PDF Parse 1.1

## Features

### AI Tools

| Tool                 | Description                                              | Plan    |
| -------------------- | -------------------------------------------------------- | ------- |
| AI Article Writer    | Generate SEO-optimized articles with customizable length | Free    |
| Blog Title Generator | Create catchy titles by category                         | Free    |
| AI Image Generation  | Transform text to stunning visuals                       | Premium |
| Background Removal   | Professional background removal with PNG output          | Premium |
| Object Removal       | Remove unwanted objects intelligently                    | Premium |
| Resume Reviewer      | AI-powered resume feedback and analysis                  | Premium |

### Premium Benefits

- Unlimited AI generations
- Access to all 6 AI tools
- Community publishing enabled
- Priority support

### Community Gallery

- Browse public AI-generated images
- Like and engage with content
- Discover creative inspiration

## Screenshots

### Home Page

![Home Hero](client/public/screenshots/home_hero.png)

### Dashboard

![Dashboard](client/public/screenshots/dashboard.png)

### AI Article Writer

![Write Article](client/public/screenshots/write_article.png)

### Blog Title Generator

![Blog Titles](client/public/screenshots/blog_titles.png)

### AI Image Generation

![Generate Images](client/public/screenshots/generate_images.png)

### Background Removal

![Remove Background](client/public/screenshots/remove_background.png)

### Object Removal

![Remove Object](client/public/screenshots/remove_object.png)

### Resume Reviewer

![Review Resume](client/public/screenshots/review_resume.png)

### Community Gallery

![Community](client/public/screenshots/community.png)

## API Endpoints

### AI Routes (/api/ai)

| Method | Endpoint                 | Auth | Plan    | Description                      |
| ------ | ------------------------ | ---- | ------- | -------------------------------- |
| POST   | /generate-article        | Yes  | Free    | Generate article from prompt     |
| POST   | /generate-blog-title     | Yes  | Free    | Generate blog title from keyword |
| POST   | /generate-image          | Yes  | Premium | Generate image from description  |
| POST   | /remove-image-background | Yes  | Premium | Remove background from image     |
| POST   | /remove-image-object     | Yes  | Premium | Remove object from image         |
| POST   | /resume-review           | Yes  | Premium | Review and analyze resume PDF    |

### User Routes (/api/user)

| Method | Endpoint             | Auth | Description                    |
| ------ | -------------------- | ---- | ------------------------------ |
| GET    | /creations           | Yes  | Get user's creations           |
| GET    | /creations/published | Yes  | Get public community creations |
| POST   | /creations/:id/like  | Yes  | Toggle like on creation        |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Clerk account
- NeonDB PostgreSQL database
- Cloudinary account
- Google AI Studio API key (Gemini)
- ClipDrop API key (optional)

### Environment Variables

**Client (.env)**

```
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

**Server (.env)**

```
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_key
CLIPDROP_API_KEY=your_clipdrop_key
```

### Database Setup

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('article', 'blog-title', 'image', 'resume-review')),
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_creations_user_id ON creations(user_id);
CREATE INDEX idx_creations_publish ON creations(publish) WHERE publish = TRUE;
CREATE INDEX idx_creations_created_at ON creations(created_at DESC);
```

### Installation

```bash
git clone https://github.com/yourusername/toolnestai.git
cd toolnestai

cd client && pnpm install
cd ../server && pnpm install
```

### Run Development

```bash
cd server && pnpm dev
cd client && pnpm dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
toolnestai/
├── client/
│   ├── public/
│   │   └── screenshots/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── eslint.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── server/
    ├── src/
    │   ├── configs/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── routes/
    │   ├── types/
    │   ├── utils/
    │   └── server.ts
    ├── eslint.config.js
    └── tsconfig.json
```

## Author

**Vikraman R** - [GitHub](https://github.com/VIKRAMANR7)
