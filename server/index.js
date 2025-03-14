import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)

//   .then(() => console.log("✅ Connecté à MongoDB"))
//   .catch((err) => console.error("❌ Erreur de connexion à MongoDB:", err));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB Atlas");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);
  }
};

connectDB();

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon backend !");
});
// app.get("/", (req, res) => {
//   res.send("🚀 API Express déployée sur Vercel !");
// });
// Route /users
app.get("/users", (req, res) => {
  res.json({ message: "Liste des utilisateurs" });
});
// Route pour créer un utilisateur
app.post("/users", async (req, res) => {
  console.log("📩 Requête reçue sur /users :", req.body); // Log de test

  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    console.error("❌ Erreur :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Exporter l'app pour Vercel
export default app;
