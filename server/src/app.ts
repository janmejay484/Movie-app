import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import entryRoutes from "./modules/entry/entry.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/entries", entryRoutes);

app.get("/", (_, res) => res.send("🎬 Favorite Movies & TV Shows API is running!"));
export default app;
