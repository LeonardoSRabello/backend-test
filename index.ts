import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import apiRouter from "./routes/api";
import { IGlobal } from "./interfaces/data";

dotenv.config();

declare const global: IGlobal;

global.data = [];

const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`App started at ${port}`);
});
