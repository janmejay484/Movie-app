import { Router } from "express";
import { create, list, update, remove } from "./entry.controller";
import { verifyToken } from "../../middleware/authMiddleware";

const router = Router();
router.post("/", verifyToken, create);
router.get("/", verifyToken, list);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

export default router;
