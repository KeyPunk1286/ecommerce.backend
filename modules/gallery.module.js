const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Рекурсивно створює директорію
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Унікальна назва файлу
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Тільки файли типу .jpeg, .png, .gif дозволені"), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const galleryController = {
    getImagePath: (req, res) => {
        const filePath = req.query.path; // Отримання параметру з запиту
        const fullPath = path.join(__dirname, "../uploads", filePath);

        // Перевірка, чи існує файл
        if (fs.existsSync(fullPath)) {
            // Відправляємо файл як відповідь
            return res.sendFile(fullPath);
        } else {
            return res.status(404).json({
                error: "Файл не знайдено",
            });
        }
    },
    uploadImage: (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "Файл не завантажено" });
        }
        res.status(200).json({
            message: "Файл успішно завантажено",
            filePath: `/uploads/${req.file.filename}`,
        });
    },
};

router.get("/get-image-path", galleryController.getImagePath);
router.post("/upload", upload.single("image"), galleryController.uploadImage);

module.exports = router;