"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = new ioredis_1.default(process.env.REDIS_URL || "redis://redis:6379");
const queue = new bullmq_1.Queue("email-queue", { connection });
const worker = new bullmq_1.Worker("email-queue", async (job) => {
    console.log("Processing job:", job.id, job.data);
}, { connection });
console.log("👷 Worker started and connected to Redis.");
