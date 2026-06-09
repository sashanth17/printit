import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import pkg from "pdf-to-printer";

const { print } = pkg;

// load env
dotenv.config({
    path: "./.env"
});

const app = express();

app.use(express.json());
app.use(cors({origin : true}));

const PORT = process.env.PORT || 8001;

const DOWNLOAD_DIR =
    process.env.DOWNLOAD_DIR || "./downloads";

const AUTO_DELETE =
    process.env.AUTO_DELETE === "true";

// ensure directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, {
        recursive: true
    });
}

app.get("/", (req, res) => {
    return res.json({
        success: true,
        service: "printer subsystem"
    });
});

app.post("/print/document", async (req, res) => {

    try {

        const { orderId, filePath } = req.body || {};

        if (!filePath) {
            return res.status(400).json({
                success: false,
                message: "filePath missing"
            });
        }

        console.log("Downloading:", filePath);

        // download file
        const downloadFileBase = process.env.DOWNLOAD_SERVER_PORT
        const response = await fetch(downloadFileBase + filePath);
        console.log("filePath : " , downloadFileBase + filePath);

        if (!response.ok) {
            throw new Error(
                `Download failed: ${response.status}`
            );
        }

        // create local filename
        const fileName = `${Date.now()}.pdf`;

        const localPath = path.resolve(
            DOWNLOAD_DIR,
            fileName
        );

        // convert to buffer
        const arrayBuffer =
            await response.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        // save file
        fs.writeFileSync(localPath, buffer);

        console.log("Saved:", localPath);

        // print file
        console.log("Printing...");

        await print(localPath);

        console.log("Printed");

        // cleanup
        if (AUTO_DELETE) {

            fs.unlinkSync(localPath);

            console.log("Deleted:", localPath);
        }

        return res.json({
            success: true,
            message: "Print job sent",
            orderId,
            fileName
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {

    console.log("printing subsystem listening...");
    console.log(`http://localhost:${PORT}`);
});