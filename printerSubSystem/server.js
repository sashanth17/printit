import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

import pkg from "pdf-to-printer";

const { print } = pkg;

const app = express();

app.use(express.json());
app.use(cors());

const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage
});

app.get("/", (req, res) => {
    return res.json({
        success: "welcome"
    });
});

app.post(
    "/test/print/document",
    upload.single("document"),
    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No PDF uploaded"
                });
            }

            const filePath = path.resolve(req.file.path);

            console.log("Printing:", filePath);

            await print(filePath);

            return res.json({
                success: true,
                message: "Print job sent",
                file: req.file.filename
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
);

app.listen(8001, () => {
    console.log("printing subsystem listening...");
    console.log("http://localhost:8001");
});