import { Request, Response } from "express";
import multer from "multer";

import { upload } from "../middlewares/upload";
import { checkDataFields, getData } from "../utils/api";
import { IGlobal } from "../interfaces/data";

declare const global: IGlobal;

export const uploadFileController = (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(500).json({ message: "No file uploaded" });
    }
    if (!req.file.originalname.match(/\.(csv)$/)) {
      return res.status(500).json({ message: "Only csv files are allowed" });
    }

    const content = req.file.buffer.toString().trim();
    const lines = content.split("\n");

    const fields = checkDataFields(lines);
    if (typeof fields === "boolean") {
      return res.status(500).json({ message: "Data structure is not valid" });
    }

    const data = getData(fields, lines.slice(1));
    global.data = data;

    res.status(200).json({
      message: "The file was uploaded successfully.",
    });
  });
};

export const getUsersController = (req: Request, res: Response) => {
  const search = req.query.q?.toString().toLowerCase() || "";
  const { data } = global;

  const result = data.filter((item) =>
    Object.values(item).reduce(
      (prev, curr) => prev || curr.toLowerCase().includes(search),
      false
    )
  );

  res.status(200).json({ data: result });
};
