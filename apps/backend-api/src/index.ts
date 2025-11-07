import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => res.json({ msg: "hello World" }));


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));