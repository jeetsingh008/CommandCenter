# 🚀 Command Center
### The Developer Productivity & Career Tracking Ecosystem

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Express](https://img.shields.io/badge/Express.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Aggregation-green)

**Command Center** is a full-stack productivity platform engineered specifically for software developers. It solves the problem of fragmented tooling by unifying project management, deep-work tracking, and performance analytics into a single, cohesive ecosystem.

---

## 📸 Screenshots

| **The Dashboard** | **Focus Mode** |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/600x300?text=Dashboard+Heatmap+and+Analytics) | ![Focus Timer](https://via.placeholder.com/600x300?text=Focus+Timer+Widget) |
| *Real-time velocity tracking & GitHub-style heatmap* | *Integrated Pomodoro timer with auto-logging* |

---

## ✨ Key Features

### 📊 **Analytics & Insights**
- **Yearly Contribution Heatmap:** A visual representation of coding consistency (powered by `react-activity-calendar` and MongoDB Aggregation).
- **Velocity Charts:** Interactive visualizations using **Recharts** to track coding minutes vs. goals.
- **Project-Based Metrics:** Deep insights into time spent per specific project or category (Coding, Debugging, Learning).

### ⏱️ **Focus Ecosystem**
- **Integrated Sidebar Timer:** A persistent stopwatch that travels with the user across the app.
- **Auto-Logging:** Sessions are automatically pushed to the database upon completion.
- **Smart Categorization:** Tag sessions by project and activity type.

### 🛡️ **Enterprise-Grade Security**
- **Hybrid Authentication:** Implemented a **Dual-Token Architecture** (Access + Refresh Tokens).
- **XSS Protection:** Tokens are stored exclusively in **HTTP-Only Cookies**.
- **Axios Interceptors:** Automatic silent token refreshing on `401 Unauthorized` responses ensures seamless user sessions.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Animations:** Framer Motion
- **State/Validation:** React Hooks, Zod
- **HTTP Client:** Axios (with Interceptors)

### **Backend (Server)**
- **Runtime:** Node.js
- **Framework:** Express.js (REST API)
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JSON Web Tokens (JWT), Bcrypt, Cookie-parser, CORS

---

## 🏗️ Architecture Highlights

### **1. Data Processing with Aggregation Pipelines**
Instead of fetching raw logs and processing them on the client, Command Center utilizes sophisticated **MongoDB Aggregation Pipelines**.
- **`$match`**: Filters logs by user and date range (current year).
- **`$group`**: Calculates daily totals and session counts server-side.
- **`$project`**: Formats data specifically for the frontend visualization libraries.

### **2. Separation of Concerns**
The application follows a strict separation between the **Next.js Frontend** (Presentation Layer) and the **Express Backend** (Business Logic Layer). This ensures scalability and allows the backend to potentially serve mobile apps or other clients in the future.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone [https://github.com/jeetsingh008/command-center.git](https://github.com/jeetsingh008/command-center.git)
cd command-center
```
## 🛠️ Backend Setup

```bash
cd backend
npm install
```
2️⃣ Environment Variables

Create a .env file inside the backend folder and add the following:
```bash
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
```
## Frontend Setup
1️⃣ Install Dependencies

```bash
cd frontend
npm install
```
2️⃣ Environment Variables

Create a .env.local file inside the frontend folder and add:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/
```
3️⃣ Run the Frontend Client

```bash
npm run dev
```
