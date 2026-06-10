import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Notice, AdmissionForm, ContactMessage } from "./src/types";

// Initialize Gemini SDK with custom agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const app = express();
const PORT = 3000;

app.use(express.json());

// Set up JSON file storage boundaries
const NOTICES_FILE = path.join(process.cwd(), "notices.json");
const ADMISSIONS_FILE = path.join(process.cwd(), "admissions.json");
const CONTACT_FILE = path.join(process.cwd(), "contact.json");

// Default initial Notices drawn/extracted from school screenshots
const DEFAULT_NOTICES: Notice[] = [
  {
    id: "1",
    notice: "Puja Vacation Announcement",
    date: "27.09.2025 to 24.10.2025",
    downloadUrl: "#",
  },
  {
    id: "2",
    notice: "Expected date of Madhyamik and H.S. final exam. 2025",
    date: "Last week of November'2025",
    downloadUrl: "#",
  },
  {
    id: "3",
    notice: "Admission session for 2026. Prospectus out soon.",
    date: "15.10.2025",
    downloadUrl: "#",
  },
  {
    id: "4",
    notice: "School reopens post-summer breaks & review rankings.",
    date: "12.06.2026",
    downloadUrl: "#",
  }
];

// Helper to safely read and write items
function readJsonFile<T>(filePath: string, defaultVal: T[]): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2));
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading file:", filePath, err);
    return defaultVal;
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing file:", filePath, err);
  }
}

// ---------------- API ENDPOINTS -----------------

// Notices list API
app.get("/api/notices", (req, res) => {
  const notices = readJsonFile<Notice>(NOTICES_FILE, DEFAULT_NOTICES);
  res.json(notices);
});

// Admin-only post new Notice (Auth checks or simple pass)
app.post("/api/notices", (req, res) => {
  const { notice, date, password } = req.body;
  if (password !== "admin1957") {
    res.status(403).json({ error: "Unauthorized access: Invalid admin PIN" });
    return;
  }
  if (!notice || !date) {
    res.status(400).json({ error: "Missing required fields: notice, date" });
    return;
  }

  const notices = readJsonFile<Notice>(NOTICES_FILE, DEFAULT_NOTICES);
  const newNotice: Notice = {
    id: String(Date.now()),
    notice,
    date,
    downloadUrl: "#",
  };
  notices.unshift(newNotice); // add to top
  writeJsonFile(NOTICES_FILE, notices);
  res.status(201).json(newNotice);
});

// Admin-only delete Notice
app.delete("/api/notices/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.query;
  if (password !== "admin1957") {
    res.status(403).json({ error: "Unauthorized access: Invalid admin PIN" });
    return;
  }

  let notices = readJsonFile<Notice>(NOTICES_FILE, DEFAULT_NOTICES);
  notices = notices.filter(n => n.id !== id);
  writeJsonFile(NOTICES_FILE, notices);
  res.json({ success: true });
});

// Admissions list (Admin dashboard)
app.get("/api/admissions", (req, res) => {
  const { password } = req.query;
  if (password !== "admin1957") {
    res.status(403).json({ error: "Unauthorized access: Invalid admin PIN" });
    return;
  }
  const admissions = readJsonFile<AdmissionForm>(ADMISSIONS_FILE, []);
  res.json(admissions);
});

// Submit admission form API
app.post("/api/admissions", (req, res) => {
  const { studentName, guardianName, targetClass, phone, email, previousSchool, previousPercentage } = req.body;

  if (!studentName || !guardianName || !targetClass || !phone) {
    res.status(400).json({ error: "Please provide all required fields." });
    return;
  }

  const admissions = readJsonFile<AdmissionForm>(ADMISSIONS_FILE, []);
  const newInquiry: AdmissionForm = {
    id: "ADM-" + String(Date.now()).slice(-6),
    studentName,
    guardianName,
    targetClass,
    phone,
    email: email || "N/A",
    previousSchool: previousSchool || "N/A",
    previousPercentage: previousPercentage || "N/A",
    date: new Date().toLocaleDateString("en-IN"),
    status: "Pending",
  };

  admissions.push(newInquiry);
  writeJsonFile(ADMISSIONS_FILE, admissions);
  res.status(201).json({ success: true, inquiry: newInquiry });
});

// Get contact forms (Admin dashboard)
app.get("/api/contact", (req, res) => {
  const { password } = req.query;
  if (password !== "admin1957") {
    res.status(403).json({ error: "Unauthorized access: Invalid admin PIN" });
    return;
  }
  const messages = readJsonFile<ContactMessage>(CONTACT_FILE, []);
  res.json(messages);
});

// Submit contact form
app.post("/api/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !message || !subject) {
    res.status(400).json({ error: "Please provide your Name, Subject, and Message." });
    return;
  }

  const messages = readJsonFile<ContactMessage>(CONTACT_FILE, []);
  const newMessage: ContactMessage = {
    id: "MSG-" + String(Date.now()).slice(-6),
    name,
    email: email || "N/A",
    phone: phone || "N/A",
    subject,
    message,
    date: new Date().toLocaleString("en-IN"),
  };

  messages.push(newMessage);
  writeJsonFile(CONTACT_FILE, messages);
  res.status(201).json({ success: true, message: newMessage });
});

// Gemini AI Virtual School Guide Chatbot API
app.post("/api/chatbot", async (req, res) => {
  const { message, chatHistory } = req.body;

  if (!message) {
    res.status(400).json({ error: "Prompt message cannot be empty." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // If no key is set yet, provide clean, friendly fallback answers using local pattern match!
    const query = message.toLowerCase();
    let responseText = "Hello! I am the Bagdah High School Virtual Guide. ";
    if (query.includes("establish") || query.includes("estd") || query.includes("founded") || query.includes("year") || query.includes("স্থাপিত")) {
      responseText += "Bagdah High School (H.S.) was established in 1957. It has been guiding students with academic excellence for decades!";
    } else if (query.includes("president") || query.includes("paritosh")) {
      responseText += "Our School President is Mr. Paritosh Saha. He states that Bagdah High School is the pride of our locality, guiding generation after generation in knowledge, values, and humanity.";
    } else if (query.includes("teacher") || query.includes("charge") || query.includes("tic") || query.includes("principal") || query.includes("sanjit")) {
      responseText += "Our Teacher-in-Charge is Mr. Sanjit Biswas. He emphasizes that education is a medium to expand students' character, honesty, and self-confidence, preparing them fully for the future.";
    } else if (query.includes("achievement") || query.includes("award") || query.includes("prize")) {
      responseText += "We have many achievements:\n1. 2023: Special District Govt Award for 'Best Performance in taking Initiatives on Eradication of Social Evils' in North 24 Parganas.\n2. scholarship exams (NMMSE, VSO) cleared by several students yearly.\n3. Excellent NAS and SAS ratings.\n4. Clean School Award ('Nirmal Vidyalaya Puraskar') in 2018.\n5. Active implementation of Kanyashree Prakalpa (2016-2024).";
    } else if (query.includes("result") || query.includes("topper") || query.includes("exam") || query.includes("marks")) {
      responseText += "In the last year's board examinations:\n- Madhyamik (Class 10): Aritra Pal scored 1st in the school with a brilliant 659/700 marks.\n- Higher Secondary (H.S. Class 12): Anurag Bhadra topped the school with an excellent 434 marks.";
    } else if (query.includes("vacation") || query.includes("holiday") || query.includes("puja")) {
      responseText += "The Notice Board lists the upcoming Puja Vacation from September 27th, 2025 to October 24th, 2025.";
    } else if (query.includes("exam date") || query.includes("final exam")) {
      responseText += "The final exams are expected to begin around the last week of November 2025.";
    } else if (query.includes("contact") || query.includes("address") || query.includes("location") || query.includes("where")) {
      responseText += "We are located at: Bagdah High School (H.S.), Bagdah East Circle, Bagdah Block, North 24 Parganas, West Bengal, Postal PIN 743232.";
    } else if (query.includes("fee") || query.includes("cost") || query.includes("admission")) {
      responseText += "You can submit an admission inquiry form right here on our website under the 'Enrollment' tab! A school faculty member will reach out to guide you through the documents, syllabus, and enrollment fees.";
    } else {
      responseText += "How can I assist you with Bagdah High School? You can ask me about our rich history (Estd. 1957), dynamic Notice Board updates, contact address, achievements, admission forms, or board exam toppers!";
    }
    res.json({ text: responseText + "\n\n*(Note: Running in local companion mode as no GEMINI_API_KEY environment variable is configured in theSecrets panel.)*" });
    return;
  }

  try {
    const prompt = `You are the Official Virtual assistant and guidance counselor for Bagdah High School (H.S.), established in 1957.
School details:
- Estd: 1957
- Address: Bagdah East Circle, Bagdah Block, North 24 Parganas, West Bengal, PIN: 743232.
- President: Mr. Paritosh Saha. Values spreading knowledge, morals, humanity.
- Teacher-In-Charge: Mr. Sanjit Biswas. Values character growth, honesty, and confidence.
- Achievements: District Govt Award 2023 for "Best Performance on Eradication of Social Evils", Nirmal Vidyalaya Puraskar 2018, remarkable Kanyashree Prakalpa integration (2016-2024), success in VSO & NMMSE scholarship exams, outstanding NAS & SAS stats.
- Toppers last year: Aritra Pal (Madhyamik - 659 marks), Anurag Bhadra (H.S. - 434 marks)
- Notices: Puja Vacation (27.09.2025 to 24.10.2025), Expected final exams (Last week of November 2025).

Answer user questions accurately, politely and in an welcoming academic tone.
Answer in Bengali if the user writes in Bengali/Bengali script, or in English.

User message: "${message}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate chatbot response: " + err.message });
  }
});

// Configure full Express & Vite setup
async function startServer() {
  // Vite dev support
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bagdah High School Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
