import express from "express";

import { getUsersController, uploadFileController } from "../controllers/api";

const router = express.Router();

router.get("/users", getUsersController);
router.post("/files", uploadFileController);

export default router;
