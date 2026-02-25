<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,50:7C3AED,100:06B6D4&height=210&section=header&text=OpsMind%20AI&fontSize=56&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Context-Aware%20Enterprise%20SOP%20Agent%20%7C%20RAG%20Pipeline%20%7C%20Zero%20Hallucination&descAlignY=56&descSize=15&descColor=e2e8f0" />

</div>

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=600&size=18&duration=3500&pause=1000&color=38BDF8&center=true&vCenter=true&width=700&height=50&lines=Retrieval-Augmented+Generation+%7C+MongoDB+Atlas;Enterprise+SOP+Agent+%7C+Cloudflare+AI+%26+Ollama;Semantic+Search+%7C+Source+Citation+%7C+No+Hallucination;500%2B+Page+Document+Intelligence+in+Seconds" alt="Typing SVG" />

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Cloudflare AI](https://img.shields.io/badge/Cloudflare%20AI-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](#)
[![Ollama](https://img.shields.io/badge/Ollama%20Offline-000000?style=for-the-badge&logo=ollama&logoColor=white)](#)

<br/>

[![Stars](https://img.shields.io/github/stars/Sainath9391/OpsMind-AI?style=flat-square&color=7C3AED&label=Stars)](https://github.com/Sainath9391/Context-Aware-Corporate-Knowledge-Brain/stargazers)
[![Forks](https://img.shields.io/github/forks/Sainath9391/OpsMind-AI?style=flat-square&color=7C3AED&label=Forks)](https://github.com/Sainath9391/Context-Aware-Corporate-Knowledge-Brain/network)
[![License](https://img.shields.io/badge/License-MIT-7C3AED?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-22D3EE?style=flat-square)](#)
[![RAG](https://img.shields.io/badge/Architecture-RAG%20Pipeline-7C3AED?style=flat-square)](#)

<br/>

[**Live Demo**](#) &nbsp;·&nbsp; [**Report Bug**](#) &nbsp;·&nbsp; [**Request Feature**](#)

</div>

<br/>

---

<div align="center">
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" width="100%"/>
</div>

## &nbsp; Table of Contents

&nbsp;&nbsp;[01 &nbsp; Overview](#-overview) &nbsp;·&nbsp;
[02 &nbsp; Problem Statement](#-problem-statement) &nbsp;·&nbsp;
[03 &nbsp; Solution Architecture](#-solution-architecture) &nbsp;·&nbsp;
[04 &nbsp; System Architecture](#-system-architecture)

&nbsp;&nbsp;[05 &nbsp; Tech Stack](#-tech-stack) &nbsp;·&nbsp;
[06 &nbsp; Core Features](#-core-features) &nbsp;·&nbsp;
[07 &nbsp; Project Structure](#-project-structure) &nbsp;·&nbsp;
[08 &nbsp; Implementation Roadmap](#-implementation-roadmap)

&nbsp;&nbsp;[09 &nbsp; Installation](#-installation) &nbsp;·&nbsp;
[10 &nbsp; Example Query](#-example-query) &nbsp;·&nbsp;
[11 &nbsp; Performance](#-performance) &nbsp;·&nbsp;
[12 &nbsp; Security](#-security)

&nbsp;&nbsp;[13 &nbsp; Future Enhancements](#-future-enhancements) &nbsp;·&nbsp;
[14 &nbsp; Why This Matters](#-why-this-matters) &nbsp;·&nbsp;
[15 &nbsp; License](#-license) &nbsp;·&nbsp;
[16 &nbsp; Author](#-author)

<div align="center">
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" width="100%"/>
</div>

<br/>

## ◈ Overview

**OpsMind AI** is a production-ready, AI-powered Enterprise Knowledge Brain that answers employee queries from corporate SOP documents using a **Retrieval-Augmented Generation (RAG)** pipeline — with strict source citation and hallucination prevention built in.

> _An AI system that reads your 500-page SOP library and answers any question in seconds — with the exact page and section it found the answer on._

<br/>

## ◈ Problem Statement

Enterprise SOPs are buried in large PDF documents, difficult to search semantically, time-consuming to navigate manually, and prone to misinterpretation when employees try to find answers on their own.

```
  Hundreds of SOP documents  →  Employees can't find answers fast
  Manual PDF search          →  Time-consuming and error-prone
  No semantic understanding  →  Wrong sections, wrong answers
  No source verification     →  Hallucinated or misquoted policy
```

Organizations need an AI system that understands natural language queries, retrieves accurate policy sections, provides citation-backed answers, and refuses to answer when information is unavailable.

<br/>

## ◈ Solution Architecture

OpsMind AI implements a full **RAG (Retrieval-Augmented Generation)** pipeline across six stages:

<div align="center">

| Stage | Component | What Happens |
|:---:|:---:|:---|
| 01 | **Document Ingestion & Chunking** | PDFs parsed, split into 1000-char chunks with overlap |
| 02 | **Vector Embedding Generation** | Each chunk converted to a high-dimensional vector |
| 03 | **MongoDB Atlas Vector Search** | Vectors stored and indexed for semantic retrieval |
| 04 | **Context Window Construction** | Top 3–5 relevant chunks assembled into context |
| 05 | **LLM Response Generation** | Gemini 1.5 Flash generates answer from context only |
| 06 | **Source Citation + Hallucination Guard** | Response includes exact doc, page, and section |

</div>

<br/>

## ◈ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      User / Employee                            │
│              Asks: "How do I process a refund?"                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │  Natural Language Query
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Express.js REST API                           │
│                                                                 │
│  ┌──────────────────────┐      ┌──────────────────────────┐    │
│  │   Vector Search       │      │   Context Window Builder │    │
│  │   MongoDB Atlas       │ ───► │   Top 3–5 SOP Chunks     │    │
│  │   Semantic Retrieval  │      │   Assembled for LLM      │    │
│  └──────────────────────┘      └──────────────┬───────────┘    │
└──────────────────────────────────────────────┼─────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Gemini 1.5 Flash (LLM)                         │
│                                                                 │
│  Context-only answer generation                                 │
│  Source citation enforcement                                    │
│  Hallucination refusal when out-of-scope                        │
└──────────────────────────────┬──────────────────────────────────┘
                               │  SSE Streaming Response
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              React Frontend (Server-Sent Events)                │
│    "According to Refund Policy (Page 12, Section 3.1)..."       │
└─────────────────────────────────────────────────────────────────┘
```

<br/>

## ◈ Tech Stack

<div align="center">

| Layer | Technology | Role |
|:---:|:---:|:---|
| **Backend** | Node.js, Express.js | REST API, RAG orchestration, file handling |
| **File Upload** | Multer | PDF ingestion and storage |
| **Database** | MongoDB Atlas (Vector Search) | Vector storage and semantic retrieval |
| **AI — Cloud** | Cloudflare AI Workers | Fast, scalable cloud-based answer generation |
| **AI — Offline** | Ollama (local LLM) | Air-gapped, privacy-first answer generation |
| **Embeddings** | Embedding Model | Text-to-vector conversion for SOP chunks |
| **Frontend** | React.js | Chat UI, admin panel |
| **Streaming** | Server-Sent Events (SSE) | Real-time response delivery |

</div>

<br/>

## ◈ Core Features

**RAG Pipeline** — PDF parsing, text chunking (1000 chars with overlap), vector embedding generation, MongoDB Atlas vector storage, and Top-K semantic retrieval on every query.

**Source Citation** — Every answer includes an exact reference, for example:

```
According to Refund Policy (Page 12, Section 3.1), the refund must be
initiated within 7 working days of the original transaction date...
```

**Hallucination Prevention** — When a query falls outside the SOP documents:

```
"I don't know. This information is not available in the provided documents."
```

**Admin Knowledge Base** — Upload SOP PDFs, delete outdated documents, automatic re-indexing, and vector regeneration on update.

**Streaming Responses** — Real-time answer generation via SSE — reduced perceived latency and better user experience.

<br/>

## ◈ Project Structure

```
Context-Aware-Corporate-Knowledge-Brain/
│
├── backend/
│   ├── config/              # DB connections, Cloudflare AI & Ollama config
│   ├── controllers/         # Route handler logic — query, upload, admin
│   ├── middleware/          # Auth, error handling, file validation
│   ├── models/              # MongoDB schemas — chunks, documents, users
│   ├── routes/              # API route definitions
│   ├── utils/               # Chunking, embedding helpers, citation formatter
│   ├── .env                 # Environment variables (not committed)
│   ├── package.json
│   └── server.js            # Express entry point
│
├── frontend/                # React.js UI — chat, admin, portfolio views
│
├── backup/                  # Snapshot backups of indexed vector data
│
├── .gitignore
├── package.json
└── README.md
```

**Answer Generation Modes**

| Mode | Provider | When to Use |
|:---:|:---:|:---|
| **Cloud** | Cloudflare AI Workers | Fast, scalable — no local GPU required |
| **Offline** | Ollama (local LLM) | Air-gapped or privacy-sensitive enterprise environments |

<br/>

## ◈ Implementation Roadmap

<div align="center">

| Week | Focus | Deliverables |
|:---:|:---:|:---|
| **Week 1** | Knowledge Ingestion | File upload, PDF parsing, chunking, embedding generation, MongoDB vector storage |
| **Week 2** | Retrieval Engine | Vector search pipeline, context window logic, chunk validation |
| **Week 3** | Chat Agent | Gemini integration, context injection, SSE streaming, hallucination testing |
| **Week 4** | UI & Optimization | Source click-to-view, chat history, performance testing, latency optimization |

</div>

<br/>

## ◈ Installation

**1. Clone the Repository**

```bash
git clone https://github.com/Sainath9391/Context-Aware-Corporate-Knowledge-Brain.git
cd Context-Aware-Corporate-Knowledge-Brain
```

**2. Backend Setup**

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_atlas_uri
GEMINI_API_KEY=your_gemini_api_key
```

```bash
npm start
# → http://localhost:5000
```

**3. Frontend Setup**

```bash
cd ../frontend
npm install
npm run dev
# → http://localhost:5173
```

<br/>

## ◈ Example Query

**User Query**

```
How do I process a refund?
```

**OpsMind AI Response**

```
According to Refund Policy (Page 12, Section 3.1), the refund must be
initiated within 7 working days of the original transaction date. The
request must be submitted via the internal portal with the order ID
and reason code attached...

Source: Refund Policy SOP · Page 12 · Section 3.1
```

**Out-of-Scope Query**

```
User:  What is the CEO's personal email?
Agent: I don't know. This information is not available in the provided documents.
```

<br/>

## ◈ Performance

- Optimized vector indexing for sub-second retrieval on large document sets
- Chunk overlap strategy ensures context continuity across section boundaries
- Top-K semantic filtering surfaces only the most relevant chunks
- Context trimming reduces token usage without sacrificing accuracy
- SSE streaming delivers the first tokens immediately — no waiting for full generation

<br/>

## ◈ Security

- Role-based access control — Admin (upload, delete) vs User (query only)
- Secure PDF upload with file type validation via Multer
- API key protection via environment variables — never exposed to frontend
- Data encryption in MongoDB Atlas at rest and in transit

<br/>

## ◈ Future Enhancements

- [ ] Multi-document cross-referencing across related SOPs
- [ ] Hybrid search — keyword + vector for higher precision
- [ ] Role-aware responses — filter answers by user access level
- [ ] Audit logs — track every query, source used, and response generated
- [ ] Fine-tuned enterprise model for domain-specific accuracy
- [ ] Docker deployment with one-command setup

<br/>

## ◈ Why This Matters

<div align="center">

| Capability | What It Demonstrates |
|:---:|:---|
| **RAG Pipeline** | End-to-end retrieval-augmented generation in production |
| **Vector Database** | MongoDB Atlas vector search at enterprise scale |
| **LLM Integration** | Gemini 1.5 Flash with controlled, citation-enforced output |
| **Hallucination Control** | Refusal logic when context doesn't support the query |
| **Full-Stack AI** | React + Node + MongoDB + Python-style AI in a single system |
| **Production Thinking** | Security, streaming, latency optimization, and admin controls |

</div>

<br/>

## ◈ License

MIT License — see [`LICENSE`](LICENSE) for full details.

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,50:7C3AED,100:0EA5E9&height=120&section=footer" />

<div align="center">

**Pendalwar Sainath**  
_B.Tech CSE (Data Science) &nbsp;·&nbsp; AI &nbsp;·&nbsp; Backend Systems &nbsp;·&nbsp; Performance-Oriented Development_

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sainath9391)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/pendalwar-sainath-598169349)
[![Portfolio](https://img.shields.io/badge/Portfolio-7C3AED?style=for-the-badge&logo=vercel&logoColor=white)](https://sainath9391.github.io/SmartPortfolio_Sainath/)
[![Gmail](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sainathpendalwar43@gmail.com)

<br/>

<sub>Built with precision &nbsp;·&nbsp; Designed for enterprise &nbsp;·&nbsp; Engineered for zero hallucination</sub>

</div>
