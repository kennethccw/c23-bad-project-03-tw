import fs from "fs";
import formidable from "formidable";
import path from "path";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    export interface Request {
      form: {
        fields: formidable.Fields;
        files: formidable.Files;
      };
    }
  }
}

// create folder if does not exists
const uploadDir = path.join(__dirname, '..', "public", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

let fileCounter = 0;
const form = formidable({
  uploadDir,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  // filter: (part) => part.mimetype?.startsWith("image/") || false,
  filename: (originalName, originalExt, part, form) => {
    fileCounter++;
    let fieldName = part.name;
    let timestamp = Date.now();
    let ext = part.mimetype?.split("/").pop();
    return `${fieldName}-${timestamp}-${fileCounter}.${ext}`;
  },
});

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('uploadDir', uploadDir)
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err)
      res.status(400).json({ message: "cannot upload file" });
      return;
    }
    req.form = { fields, files };
    console.log(req.form, ', req form')
    // console.log(req.form.fields.audio[0], ', req form fields')
    console.log(req.form.files, ', req form files')
    next();
  });
};
