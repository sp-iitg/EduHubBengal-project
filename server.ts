import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { createServer as createViteServer } from "vite";

interface MaterialItem {
  id: string;
  title: string;
  subject: "Physics" | "Chemistry" | "Mathematics";
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
}

const PORT = 3000;
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
const DATA_FILE = path.join(process.cwd(), "materials.json");
const QUERIES_FILE = path.join(process.cwd(), "queries.json");

// Ensure directory and JSON files exist on startup
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
}

if (!fs.existsSync(QUERIES_FILE)) {
  fs.writeFileSync(QUERIES_FILE, JSON.stringify([], null, 2), "utf-8");
}

function readMaterials(): MaterialItem[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data) as MaterialItem[];
  } catch (error) {
    console.error("Error reading materials.json:", error);
    return [];
  }
}

function readQueries() {
  try {
    const data = fs.readFileSync(QUERIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading queries.json:", error);
    return [];
  }
}

function writeQueries(queries: any[]) {
  try {
    fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to queries.json:", error);
  }
}

function writeMaterials(materials: MaterialItem[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(materials, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to materials.json:", error);
  }
}

async function startServer() {
  const app = express();

  // Support JSON and urlencoded payloads
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set up static serving for uploaded files
  app.use("/uploads", express.static(UPLOADS_DIR));

  // Configure Multer for File Uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
      // Use timestamp + clean filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      cb(null, `${uniqueSuffix}-${cleanName}`);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 15 * 1024 * 1024, // 15MB file size limit
    },
    fileFilter: (req, file, cb) => {
      // Accept pdf, doc, docx, jpeg, png, zip
      const allowedMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "application/zip",
        "application/x-zip-compressed"
      ];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Unsupported file type. Only PDF, Word files, PNG/JPG, and ZIPs are allowed."));
      }
    },
  });

  // --- API ROUTES ---

  // 1. Fetch materials
  app.get("/api/materials", (req, res) => {
    try {
      const materials = readMaterials();
      // Sorted reverse chronologically so newest show up first
      const sorted = [...materials].sort(
        (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
      res.json(sorted);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to read materials lists." });
    }
  });

  // 1b. Fetch student enquiries (Admin Protected)
  app.get("/api/queries", (req, res) => {
    const authHeader = req.headers["x-admin-password"];
    if (authHeader !== "EduHubBengal2026") {
      return res.status(401).json({ error: "Unauthorized access code." });
    }

    try {
      const queries = readQueries();
      // Sort newest first
      const sorted = [...queries].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      res.json(sorted);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch student enquiries list." });
    }
  });

  // 1c. Submit a new student enquiry (Public)
  app.post("/api/queries", (req, res) => {
    try {
      const { name, email, phone, courseId, message } = req.body;

      if (!name || !email || !phone || !courseId) {
        return res.status(400).json({ error: "Name, email, phone, and course selections are required." });
      }

      const queries = readQueries();
      const newQuery = {
        name: name.toString().trim(),
        email: email.toString().trim(),
        phone: phone.toString().trim(),
        courseId: courseId.toString().trim(),
        message: message ? message.toString().trim() : "",
        submittedAt: new Date().toISOString(),
      };

      queries.push(newQuery);
      writeQueries(queries);

      res.status(201).json({ success: true, message: "Enquiry submitted successfully." });
    } catch (err) {
      res.status(500).json({ error: "Failed to submit enquiry to server storage." });
    }
  });

  // 2. Download materials with original name header
  app.get("/api/download/:id", (req, res) => {
    try {
      const { id } = req.params;
      const materials = readMaterials();
      const item = materials.find((m) => m.id === id);

      if (!item) {
        return res.status(404).json({ error: "Material not found" });
      }

      const filePath = path.join(UPLOADS_DIR, item.filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Physical file does not exist on disk" });
      }

      res.download(filePath, item.originalname);
    } catch (err) {
      res.status(500).json({ error: "Failed to download file" });
    }
  });

  // 3. Upload materials (Admin Protected)
  app.post("/api/upload", (req, res, next) => {
    // Simple custom protection check
    const authHeader = req.headers["x-admin-password"];
    if (authHeader !== "EduHubBengal2026") {
      return res.status(401).json({ error: "Unauthorized access code. Please provide correct admin credentials." });
    }
    next();
  }, upload.single("materialFile"), (req, res) => {
    try {
      const file = req.file;
      const { title, subject } = req.body;

      if (!file) {
        return res.status(400).json({ error: "Please upload a file." });
      }

      if (!title || !subject) {
        // Cleanup uploaded file if metadata is bad
        try { fs.unlinkSync(file.path); } catch {}
        return res.status(400).json({ error: "Title and subject fields are required." });
      }

      const validatedSubject = ["Physics", "Chemistry", "Mathematics"].includes(subject)
        ? subject
        : "Physics";

      const materials = readMaterials();
      const newItem: MaterialItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: title.toString().trim(),
        subject: validatedSubject as any,
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      materials.push(newItem);
      writeMaterials(materials);

      res.status(201).json({ success: true, material: newItem });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Something went wrong during file saving." });
    }
  });

  // 4. Delete material (Admin Protected)
  app.delete("/api/materials/:id", (req, res) => {
    const authHeader = req.headers["x-admin-password"];
    if (authHeader !== "EduHubBengal2026") {
      return res.status(401).json({ error: "Unauthorized access code." });
    }

    try {
      const { id } = req.params;
      const materials = readMaterials();
      const itemIndex = materials.findIndex((m) => m.id === id);

      if (itemIndex === -1) {
        return res.status(404).json({ error: "Material item not found" });
      }

      const item = materials[itemIndex];
      const filePath = path.join(UPLOADS_DIR, item.filename);

      // Attempt to delete physical file
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Could not delete file from disk:", err);
        }
      }

      // Remove from lists
      materials.splice(itemIndex, 1);
      writeMaterials(materials);

      res.json({ success: true, message: "Material successfully deleted." });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete material item." });
    }
  });

  // Vite development / static production fallback middleware
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start Server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[EduHubBengal] Full-stack server running successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Critical failure during server startup:", error);
});
