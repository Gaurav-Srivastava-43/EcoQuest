# 🌱 EcoQuest

An interactive eco-education web platform designed to spread environmental awareness through multimedia learning, interactive modules, and an AI-powered sustainability companion.

---

## 📖 Overview

**EcoQuest** gamifies and simplifies environmental education. By combining curated educational videos, interactive platforms, and real-time AI assistance, EcoQuest helps learners understand pressing ecological challenges—such as water scarcity, waste management, and carbon footprints—while adopting sustainable daily habits.

---

## ✨ Features

- **🎓 Eco-Education Hub (`EcoEducationPlatform.jsx`)**: Comprehensive interactive modules exploring vital environmental topics, conservation strategies, and sustainable practices.
- **🎥 Multimedia Learning (`Videos.jsx`)**: Video-based learning modules featuring curated educational media (including topics like water scarcity and resource management).
- **🤖 EcoPal AI Assistant (`Chatbox.jsx`)**: An integrated client-side chatbot powered by the **Google Gemini API** (`@google/genai`) and grounded with custom sustainability guidelines (`ecoquestContext.js`).
- **📱 Responsive UI**: Styled with modern, accessible UI components and icons from **Lucide React**.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI / LLM**: [Google Gen AI SDK](https://www.npmjs.com/package/@google/genai) (`gemini-3.5-flash-lite`)
- **Markdown Parsing**: `react-markdown` & `remark-gfm`
- **State & Storage**: React Hooks (`useState`, `useEffect`, `useRef`) & `localStorage`

---

## 📁 Project Structure

```text
EcoQuest/
├── public/
│   ├── EcoQuestLogo.png
│   ├── Water_Scarcity_Video.mp4
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Chatbox.jsx             # AI chatbot widget (EcoPal)
│   ├── EcoEducationPlatform.jsx    # Main education platform component
│   ├── Videos.jsx                  # Video learning showcase component
│   ├── ecoquestContext.js          # System prompt & knowledge base for EcoPal
│   ├── App.css
│   ├── index.css                   # Global styles & Tailwind directives
│   └── main.jsx                    # Application entry point
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine (v18 or higher recommended).

### 1. Clone the Repository

```bash
git clone [https://github.com/Gaurav-Srivastava-43/EcoQuest.git](https://github.com/Gaurav-Srivastava-43/EcoQuest.git)
cd EcoQuest

```

### 2. Install Dependencies

```bash
npm install

```

*(If you haven't installed `@google/genai`, `react-markdown`, or `remark-gfm` yet, install them via:)*

```bash
npm install @google/genai react-markdown remark-gfm

```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here

```

> **Note:** Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).

### 4. Run the Development Server

```bash
npm run dev

```

Navigate to `http://localhost:3000` (or the URL shown in your terminal) to explore the platform.

### 5. Build for Production

```bash
npm run build

```

Preview the production build locally:

```bash
npm run preview

```

---

## 🤖 EcoPal Chatbot Integration

The chatbot widget connects directly to the **Gemini 3.5 Flash Lite** model via the official Google Gen AI SDK:

* **Grounding**: Uses `ecoquestContext.js` to ensure advice remains strictly focused on practical sustainability and platform guidance.
* **Chat History**: Preserves multi-turn sessions locally using `localStorage`.
* **Rich Formatting**: Parses lists, code, bold, and italic text cleanly through `react-markdown`.

---

## 📄 License

This project is developed for educational and project purposes.