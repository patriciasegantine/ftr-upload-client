# 📦 Upload Widget Client

A modern file upload interface built with React and TypeScript, designed to deliver a smooth, fast, and accessible user experience when interacting with upload APIs.

## ✨ Why this project?

Uploading files sounds simple, but handling validation, progress feedback, and error states in a clean way is where things get interesting.

This project focuses on building a **production-like upload experience**, with strong attention to:

- UX clarity and feedback
- Clean and scalable architecture
- Type safety and maintainability
- Performance and responsiveness

---

## 🚀 What it does

- Upload files to a backend service (Cloudflare R2)
- Show real-time upload progress
- Handle errors and invalid formats gracefully
- Provide clear feedback to users at every step

---

## 🧠 Key Highlights

- Well-structured, component-driven architecture
- Lightweight and efficient state management with Zustand
- Strong focus on accessibility using Radix UI
- Smooth animations with Motion
- Fully typed with TypeScript
- Tested with Vitest and React Testing Library
- CI pipeline with GitHub Actions

---

## 🛠️ Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS + Tailwind Variants
- Zustand
- Radix UI
- Motion
- React Dropzone
- Vitest
- React Testing Library

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/patriciasegantine/ftr-upload-client.git
cd ftr-upload-client
```
### 2. Install dependencies

```bash
npm install
```
### 3.Set environment variables
Create a .env file:
            
```env
VITE_API_BASE_URL=http://localhost:3000
```
### 4. Run the development server

```bash
npm run dev
```
## 💡 Features
- Drag and drop file upload
- Upload progress tracking
- Error handling and validation
- Responsive and accessible UI
- Clean and reusable components

## 🔗 Related Project
This client works alongside the Upload Widget Server, forming a complete upload flow from UI to storage.
- [Upload Widget Server](https://github.com/patriciasegantine/ftr-upload-server)

---

## 💡 Notes

This project was developed as part of a postgraduate programme, with a focus on building a production-ready full-stack application, emphasising scalability, performance, and clean architecture.

---

## 👩‍💻 Author

Created by **Patricia Segantine** — Frontend Engineer
GitHub: https://github.com/patriciasegantine
