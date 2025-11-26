# ToolNest AI 🚀

> A comprehensive AI-powered creative toolkit built with the MERN stack, featuring intelligent content generation, advanced image processing, and professional resume analysis.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://toolnestai.vercel.app)
[![API Status](https://img.shields.io/badge/api-active-blue)](https://buzz-connect-server.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)

---

## 🌟 Overview

**ToolNest AI** is a production-ready, enterprise-grade SaaS platform that democratizes AI-powered content creation. It provides creators, marketers, and professionals with an intuitive suite of tools to generate articles, create stunning visuals, process images, and enhance resumes—all powered by cutting-edge AI models.

### 🎯 Key Highlights

- **Full-Stack TypeScript**: End-to-end type safety with strict mode enabled
- **Microservices Architecture**: Scalable, maintainable, and production-ready
- **Enterprise Authentication**: Clerk integration with role-based access control
- **Cloud-Native Infrastructure**: Deployed on Vercel with NeonDB (PostgreSQL)
- **Freemium Model**: Usage-based limits with premium tier upgrades
- **Real-Time Processing**: Async handling with progress indicators
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[React 19 + TypeScript]
        B[Tailwind CSS]
        C[React Router]
        D[Clerk Auth SDK]
    end

    subgraph "API Gateway"
        E[Express.js Server]
        F[Clerk Middleware]
        G[CORS Handler]
        H[Error Handler]
    end

    subgraph "Service Layer"
        I[AI Controller]
        J[User Controller]
        K[Auth Middleware]
        L[Usage Tracker]
    end

    subgraph "External Services"
        M[Google Gemini API]
        N[Cloudinary CDN]
        O[Clerk Auth]
        P[ClipDrop API]
    end

    subgraph "Data Layer"
        Q[(NeonDB PostgreSQL)]
    end

    A --> E
    B --> A
    C --> A
    D --> A
    E --> F
    F --> G
    G --> H
    H --> I
    H --> J
    I --> K
    J --> K
    K --> L
    I --> M
    I --> N
    I --> P
    J --> Q
    K --> O
    L --> O

    style A fill:#61dafb
    style E fill:#68a063
    style Q fill:#336791
    style M fill:#4285f4
    style O fill:#6c47ff
```

---

## 🔄 Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client (React)
    participant A as API Gateway
    participant Auth as Clerk Auth
    participant S as Service Layer
    participant AI as AI Services
    participant DB as NeonDB
    participant CDN as Cloudinary

    U->>C: Initiates AI Request
    C->>A: HTTP Request + JWT
    A->>Auth: Validate Token
    Auth-->>A: User Context
    A->>S: Process Request

    alt Premium Feature
        S->>Auth: Check Plan Status
        Auth-->>S: Plan Details
    end

    S->>S: Check Usage Limits

    alt Text Generation
        S->>AI: Send Prompt
        AI-->>S: Generated Content
    end

    alt Image Generation
        S->>AI: Generate Image
        AI-->>S: Image Binary
        S->>CDN: Upload Image
        CDN-->>S: Public URL
    end

    S->>DB: Save Creation
    DB-->>S: Success
    S->>Auth: Update Usage Count
    Auth-->>S: Updated Metadata
    S-->>A: Response
    A-->>C: JSON Response
    C-->>U: Display Result
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    CREATIONS {
        int id PK
        string user_id FK
        string prompt
        text content
        enum type
        boolean publish
        string[] likes
        timestamp created_at
        timestamp updated_at
    }

    CLERK_USERS {
        string id PK
        string email
        string first_name
        string last_name
        json public_metadata
        json private_metadata
    }

    CLERK_USERS ||--o{ CREATIONS : creates

    PUBLIC_METADATA {
        string plan
    }

    PRIVATE_METADATA {
        int free_usage
    }

    CLERK_USERS ||--|| PUBLIC_METADATA : contains
    CLERK_USERS ||--|| PRIVATE_METADATA : contains
```

### Database Tables

#### `creations` Table

| Column       | Type               | Description                                       |
| ------------ | ------------------ | ------------------------------------------------- |
| `id`         | SERIAL PRIMARY KEY | Auto-incrementing unique identifier               |
| `user_id`    | VARCHAR(255)       | Clerk user ID (foreign reference)                 |
| `prompt`     | TEXT               | User's input prompt or description                |
| `content`    | TEXT               | Generated content or image URL                    |
| `type`       | ENUM               | `article`, `blog-title`, `image`, `resume-review` |
| `publish`    | BOOLEAN            | Public visibility flag (default: false)           |
| `likes`      | TEXT[]             | Array of user IDs who liked the creation          |
| `created_at` | TIMESTAMP          | Creation timestamp                                |
| `updated_at` | TIMESTAMP          | Last modification timestamp                       |

---

## 🎨 System Design

### Component Architecture

```mermaid
graph TB
    subgraph "Frontend Architecture"
        App[App.tsx]

        subgraph "Public Routes"
            Home[Home Page]
            NotFound[404 Page]
        end

        subgraph "Protected Routes"
            Layout[Layout Component]
            Dashboard[Dashboard]
            WriteArticle[Write Article]
            BlogTitles[Blog Titles]
            GenerateImages[Generate Images]
            RemoveBackground[Remove Background]
            RemoveObject[Remove Object]
            ReviewResume[Review Resume]
            Community[Community]
        end

        subgraph "Shared Components"
            Navbar[Navbar]
            Sidebar[Sidebar]
            Footer[Footer]
            Hero[Hero]
            AiTools[AI Tools Grid]
            Testimonial[Testimonials]
            Plan[Pricing Table]
            CreationItem[Creation Item]
        end

        subgraph "State Management"
            ClerkProvider[Clerk Provider]
            Router[React Router]
        end
    end

    App --> ClerkProvider
    ClerkProvider --> Router
    Router --> Home
    Router --> NotFound
    Router --> Layout

    Home --> Navbar
    Home --> Hero
    Home --> AiTools
    Home --> Testimonial
    Home --> Plan
    Home --> Footer

    Layout --> Sidebar
    Layout --> Dashboard
    Layout --> WriteArticle
    Layout --> BlogTitles
    Layout --> GenerateImages
    Layout --> RemoveBackground
    Layout --> RemoveObject
    Layout --> ReviewResume
    Layout --> Community

    Dashboard --> CreationItem

    style App fill:#61dafb
    style ClerkProvider fill:#6c47ff
    style Layout fill:#fbbf24
```

### API Request Flow

```mermaid
graph LR
    subgraph "Client Request"
        A[User Action] --> B[React Component]
        B --> C[API Utility]
    end

    subgraph "Network Layer"
        C --> D[Axios Instance]
        D --> E[Add Auth Header]
        E --> F[HTTP Request]
    end

    subgraph "Server Middleware Stack"
        F --> G[CORS Middleware]
        G --> H[Clerk Middleware]
        H --> I[Body Parser]
        I --> J[Route Handler]
    end

    subgraph "Business Logic"
        J --> K[Auth Middleware]
        K --> L{Check Plan}
        L -->|Free| M[Check Usage Limit]
        L -->|Premium| N[Proceed]
        M -->|Exceeded| O[Return 403]
        M -->|Allowed| N
        N --> P[Controller Logic]
    end

    subgraph "External Integration"
        P --> Q{Request Type}
        Q -->|Text| R[Gemini AI]
        Q -->|Image| S[ClipDrop]
        Q -->|Upload| T[Cloudinary]
    end

    subgraph "Data Persistence"
        P --> U[Save to NeonDB]
        P --> V[Update Clerk Metadata]
    end

    subgraph "Response Pipeline"
        U --> W[Success Response]
        V --> W
        W --> X[JSON Response]
        X --> Y[Error Handler]
        Y --> Z[Client Receives]
    end

    style A fill:#61dafb
    style P fill:#68a063
    style U fill:#336791
    style R fill:#4285f4
```

---

## ⚙️ Tech Stack

### Frontend

- **React 19.1** - UI library with latest features
- **TypeScript 5.7** - Type-safe development
- **Vite 7** - Next-generation build tool
- **Tailwind CSS 4.1** - Utility-first styling
- **React Router 7.6** - Client-side routing
- **Clerk React 5.35** - Authentication SDK
- **React Markdown 10.1** - Markdown rendering
- **React Hot Toast 2.5** - Toast notifications
- **Axios 1.10** - HTTP client
- **Lucide React 0.525** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express 4.21** - Web framework
- **TypeScript 5.7** - Type-safe server code
- **Clerk Express 1.7** - Server-side auth
- **Neon Serverless 1.0** - PostgreSQL driver
- **OpenAI 5.10** - Gemini AI integration
- **Cloudinary 2.7** - Cloud storage
- **Multer 2.0** - File upload handling
- **PDF Parse 1.1** - PDF text extraction
- **BCrypt 5.1** - Password hashing
- **Axios 1.7** - HTTP requests
- **CORS 2.8** - Cross-origin handling

### Infrastructure & DevOps

- **Vercel** - Hosting platform
- **NeonDB** - Serverless PostgreSQL
- **Cloudinary** - CDN & image optimization
- **Clerk** - Authentication & user management
- **pnpm** - Fast package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Features

### 🎯 Core AI Tools

#### 1. **AI Article Writer** 📝

Generate comprehensive, SEO-optimized articles on any topic with customizable length options.

- **Lengths**: Short (500-800), Medium (1000-1500), Long (1500+ words)
- **Model**: Google Gemini 2.0 Flash
- **Output**: Markdown-formatted articles

#### 2. **Blog Title Generator** 🏷️

Create catchy, engaging blog titles tailored to specific categories.

- **Categories**: General, Technology, Business, Health, Lifestyle, Education, Travel, Food
- **Smart AI**: Context-aware title generation
- **Quick Results**: Sub-second response time

#### 3. **AI Image Generation** 🎨 (Premium)

Transform text descriptions into stunning visual content.

- **Styles**: Realistic, Ghibli, Anime, Cartoon, Fantasy, 3D, Portrait
- **API**: ClipDrop Text-to-Image
- **Publishing**: Optional community sharing
- **Storage**: Cloudinary CDN hosting

#### 4. **Background Removal** 🖼️ (Premium)

Professional background removal with transparent PNG output.

- **Supported Formats**: JPG, PNG, WEBP
- **Max Size**: 10MB
- **Download**: Instant PNG download
- **Quality**: Production-ready results

#### 5. **Object Removal** ✂️ (Premium)

Remove unwanted objects from images intelligently.

- **Smart Detection**: AI-powered object recognition
- **Clean Results**: Seamless inpainting
- **Simple Input**: Single object description

#### 6. **Resume Reviewer** 📄 (Premium)

Get AI-powered feedback on resume content and structure.

- **Format**: PDF only (max 5MB)
- **Analysis**: Comprehensive review with suggestions
- **Model**: Gemini 2.0 Flash with specialized prompts

### 💎 Premium Features

- **Unlimited Usage**: No daily/monthly caps
- **Priority Processing**: Faster queue times
- **Advanced Tools**: Access to all 6 AI tools
- **Community Publishing**: Share your creations
- **Premium Support**: Priority customer service

### 👥 Community Gallery

- Browse public AI-generated images
- Like and engage with community content
- Filter by popularity and recency
- Discover creative inspiration

---

## 📸 Screenshots

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

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 18+ and **pnpm** installed
- **Clerk** account for authentication
- **NeonDB** PostgreSQL database
- **Cloudinary** account for image storage
- **Google AI Studio** API key (Gemini)
- **ClipDrop** API key (optional, for image generation)

### Environment Variables

#### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

#### Backend (`server/.env`)

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require

# Clerk
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Services
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

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/toolnestai.git
cd toolnestai

# Install dependencies for both client and server
cd client && pnpm install
cd ../server && pnpm install

# Setup environment variables
cp client/.env.example client/.env
cp server/.env.example server/.env
# Edit both .env files with your credentials

# Run database migrations
cd server
pnpm run migrate

# Start development servers
# Terminal 1 - Backend
cd server
pnpm dev

# Terminal 2 - Frontend
cd client
pnpm dev
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 📦 Project Structure

```
toolnestai/
├── client/                          # Frontend React application
│   ├── public/
│   │   ├── favicon_ai.ico
│   │   ├── gradientBackground.png
│   │   └── screenshots/             # App screenshots
│   ├── src/
│   │   ├── assets/                  # Icons, images, constants
│   │   │   └── assets.ts            # Asset exports & data
│   │   ├── components/              # Reusable UI components
│   │   │   ├── AiTools.tsx
│   │   │   ├── CreationItem.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Plan.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Testimonial.tsx
│   │   ├── config/                  # App configuration
│   │   │   └── constants.ts
│   │   ├── pages/                   # Route pages
│   │   │   ├── BlogTitles.tsx
│   │   │   ├── Community.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── GenerateImages.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── RemoveBackground.tsx
│   │   │   ├── RemoveObject.tsx
│   │   │   ├── ReviewResume.tsx
│   │   │   └── WriteArticle.tsx
│   │   ├── routes/                  # Route guards
│   │   │   └── ProtectedRoute.tsx
│   │   ├── types/                   # TypeScript types
│   │   │   ├── api.ts
│   │   │   ├── assets.ts
│   │   │   ├── database.ts
│   │   │   └── footer.ts
│   │   ├── utils/                   # Utility functions
│   │   │   └── api.ts
│   │   ├── App.tsx                  # Root component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── eslint.config.js
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── vercel.json
│   └── package.json
│
└── server/                          # Backend Express application
    ├── src/
    │   ├── configs/                 # Configuration files
    │   │   ├── cloudinary.ts
    │   │   ├── db.ts
    │   │   ├── multer.ts
    │   │   └── validateEnv.ts
    │   ├── controllers/             # Request handlers
    │   │   ├── aiController.ts
    │   │   └── userController.ts
    │   ├── middleware/              # Express middleware
    │   │   ├── asyncHandler.ts
    │   │   ├── auth.ts
    │   │   └── errorHandler.ts
    │   ├── routes/                  # API routes
    │   │   ├── aiRoutes.ts
    │   │   └── userRoutes.ts
    │   ├── types/                   # TypeScript types
    │   │   ├── api.ts
    │   │   ├── database.ts
    │   │   ├── express.d.ts
    │   │   └── pdf-parse.d.ts
    │   ├── utils/                   # Helper functions
    │   │   ├── ai.ts
    │   │   ├── authHelpers.ts
    │   │   ├── files.ts
    │   │   ├── saveCreation.ts
    │   │   └── usage.ts
    │   └── server.ts                # Entry point
    ├── eslint.config.js
    ├── tsconfig.json
    ├── vercel.json
    └── package.json
```

---

## 🔌 API Endpoints

### AI Routes (`/api/ai`)

| Method | Endpoint                   | Auth | Plan    | Description                      |
| ------ | -------------------------- | ---- | ------- | -------------------------------- |
| POST   | `/generate-article`        | ✅   | Free    | Generate article from prompt     |
| POST   | `/generate-blog-title`     | ✅   | Free    | Generate blog title from keyword |
| POST   | `/generate-image`          | ✅   | Premium | Generate image from description  |
| POST   | `/remove-image-background` | ✅   | Premium | Remove background from image     |
| POST   | `/remove-image-object`     | ✅   | Premium | Remove object from image         |
| POST   | `/resume-review`           | ✅   | Premium | Review and analyze resume PDF    |

### User Routes (`/api/user`)

| Method | Endpoint               | Auth | Description                    |
| ------ | ---------------------- | ---- | ------------------------------ |
| GET    | `/creations`           | ✅   | Get user's creations           |
| GET    | `/creations/published` | ✅   | Get public community creations |
| POST   | `/creations/:id/like`  | ✅   | Toggle like on creation        |

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Sign Up/Sign In**: Handled by Clerk's pre-built components
2. **Session Management**: JWT tokens stored in HTTP-only cookies
3. **Token Validation**: Clerk middleware validates on every request
4. **User Context**: User ID and metadata injected into request object

### Authorization Levels

#### Free Tier

- 10 AI generations per account lifetime
- Access to article writer and blog title generator
- View community gallery
- Private creations only

#### Premium Tier

- Unlimited AI generations
- All 6 AI tools unlocked
- Community publishing enabled
- Priority support

### Implementation

```typescript
// Server-side auth middleware
export async function auth(req: Request, res: Response, next: NextFunction) {
  const { userId, sessionId } = getAuth(req);

  if (!userId || !sessionId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const user = await clerkClient.users.getUser(userId);
  const plan = user.publicMetadata?.plan === "premium" ? "premium" : "free";
  const usage = user.privateMetadata?.free_usage || 0;

  req.userId = userId;
  req.plan = plan;
  req.free_usage = plan === "premium" ? 0 : usage;

  next();
}
```

---

## 📊 Usage Tracking

### Free Tier Limits

- **Usage Cap**: 10 AI generations
- **Tracking Method**: Clerk private metadata
- **Reset Policy**: No automatic reset (upgrade to premium)

### Premium Tier

- **Usage Cap**: Unlimited
- **Tracking**: None required
- **Feature Access**: All tools unlocked

### Implementation

```typescript
// Check usage before processing
export function checkUsage(plan?: string, usage?: number) {
  if (plan !== "premium" && (usage ?? 0) >= 10) {
    return {
      allowed: false,
      message: "Free usage limit reached. Upgrade to premium.",
    };
  }
  return { allowed: true };
}

// Increment usage after successful generation
export async function bumpUsage(userId: string, plan?: string, usage?: number) {
  if (plan !== "premium") {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { free_usage: (usage ?? 0) + 1 },
    });
  }
}
```

---

## 🎯 Performance Optimizations

- **Code Splitting**: Dynamic imports for route-based splitting
- **Image Optimization**: Cloudinary automatic format conversion
- **Lazy Loading**: Components and images loaded on-demand
- **Caching**: Browser caching for static assets
- **Compression**: Gzip compression on Vercel
- **CDN**: Global edge network via Vercel and Cloudinary
- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: NeonDB serverless connection management

---

## 🧪 Testing

```bash
# Run TypeScript type checking
cd client && pnpm typecheck
cd server && pnpm typecheck

# Run ESLint
cd client && pnpm lint
cd server && pnpm lint

# Format code
cd client && pnpm format
cd server && pnpm format
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
cd client
vercel --prod
```

**Configuration**: `client/vercel.json` handles SPA routing

### Backend Deployment (Vercel)

```bash
cd server
vercel --prod
```

**Configuration**: `server/vercel.json` sets up serverless functions

### Environment Variables

Set the following in Vercel dashboard:

- All variables from `.env.example` files
- `NODE_ENV=production`
- Update `CLIENT_URL` and `VITE_API_URL` to production URLs

---

## 🐛 Troubleshooting

### Common Issues

1. **401 Unauthorized**

   - Check Clerk API keys
   - Verify token is being sent in Authorization header
   - Ensure Clerk webhook URLs are configured

2. **Image Upload Fails**

   - Verify Cloudinary credentials
   - Check file size (max 10MB)
   - Ensure file type is supported

3. **AI Generation Errors**

   - Verify Gemini API key
   - Check API quota limits
   - Ensure prompt length is reasonable

4. **Database Connection Issues**
   - Verify NeonDB connection string
   - Check firewall rules
   - Ensure SSL mode is enabled

---

## 👨‍💻 Author

**Vikraman R**

- GitHub: [@VIKRAMANR7](https://github.com/VIKRAMANR7)

---

## 🙏 Acknowledgments

- **Google AI** for Gemini API
- **Clerk** for authentication infrastructure
- **NeonDB** for serverless PostgreSQL
- **Cloudinary** for image hosting
- **Vercel** for seamless deployment
- **ClipDrop** for image generation API

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Express**

</div>
