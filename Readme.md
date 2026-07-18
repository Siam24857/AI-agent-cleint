# AI Agent – Intelligent AI Assistant Platform

AI Agent is a full-stack AI-powered assistant platform that enables users to interact with an intelligent chatbot through natural conversations. Powered by Google Gemini AI, the application provides context-aware responses, personalized recommendations, and persistent conversation history for a seamless AI experience. Built with a modern full-stack architecture, it delivers a fast, secure, and responsive interface while demonstrating agentic AI workflows.

## 🌐 Live Demo

**Live Site:** https://ai-agent-cleint.vercel.app

---

## ✨ Features

- 🤖 **Intelligent AI Conversations**
  - Interact with an AI assistant that provides accurate, context-aware answers in real time.

- 🧠 **Context-Aware Memory**
  - Continue conversations naturally as the AI remembers previous interactions and delivers more relevant responses.

- 💡 **Smart Recommendations**
  - Receive personalized suggestions, learning resources, and actionable insights based on your queries.

- 💬 **Persistent Chat History**
  - Save and revisit previous conversations for a seamless user experience.

- 🔒 **Secure Authentication**
  - User authentication with protected routes and personalized chat sessions.

- 📱 **Responsive Design**
  - Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Next.js
- TypeScript
- Tailwind CSS
- TanStack Query
- Recharts

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Better Auth
- JWT Authentication
- REST API

### AI & Tools
- Google Gemini API
- Agentic AI Workflow
- Axios
- Git & GitHub
- Vercel

---

## 🚀 Core Workflow

```
User Input
      │
      ▼
Planner Agent
      │
      ▼
Memory Module
      │
      ▼
Database
      │
      ▼
Google Gemini AI
      │
      ▼
Final Response
      │
      ▼
Save Conversation History
```

---

## 📂 Project Structure

```
client/
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/

server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
└── utils/

agents/
├── planner.ts
├── memory.ts
├── prompt.ts
├── recommendation.ts
└── tools.ts
```

---

## 🔑 Key Features

- AI-powered chatbot with Google Gemini API
- Context-aware conversation memory
- Personalized AI recommendations
- Persistent chat history
- Secure authentication and authorization
- RESTful API architecture
- Responsive and modern UI
- Fast data fetching with TanStack Query
- Data visualization with Recharts
- Scalable full-stack architecture

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/ai-agent.git
```

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in both the client and server.

### Client

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GEMINI_API_KEY=
```

### Server

```env
PORT=
MONGODB_URI=
JWT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GEMINI_API_KEY=
```

---

## 📌 Future Improvements

- Streaming AI responses
- Voice-based conversations
- File upload and AI document analysis
- Multi-model AI support (OpenAI, Claude, Gemini)
- Team workspaces
- AI-generated reports
- Export chat history
- AI memory optimization

---