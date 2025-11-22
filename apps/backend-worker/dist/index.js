"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const connection = new IORedis(process.env.REDIS_URL || "redis://redis:6379");
// const queue = new Queue("email-queue", { connection });
// const worker = new Worker(
//   "my-queue",
//   async (job) => {
//     console.log("Processing job:", job.name, job.data);
//   },
//   {
//     connection: {
//       host: "127.0.0.1",
//       port: 6379,
//       maxRetriesPerRequest: null, // ✅ required
//       enableReadyCheck: false,    // ✅ prevents blocking
//     },
//   }
// );
console.log("👷 Worker started and connected to Redis.");
