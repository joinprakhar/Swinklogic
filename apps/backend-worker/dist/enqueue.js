"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const bullmq_1 = require("bullmq");
const config_1 = require("./config");
// rediss://default:xhF58bE5ejPCwaxJr47cKm2J1iE4QlvB@redis-10867.region.cloud.redislabs.com:10867
// async function addTestJob() {
//   const connection = new IORedis(REDIS_URL);
//   const queue = new Queue(QUEUE_NAME, { connection });
//   const job = await queue.add("test-scrape", {
//     url: "https://example.com",
//     meta: { requestedBy: "dev" },
//   });
//   console.log("Enqueued job:", job.id);
//   await queue.close();
//   await connection.quit();
// }
// addTestJob().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
async function run() {
    const connection = new ioredis_1.default(config_1.REDIS_URL);
    const queue = new bullmq_1.Queue(config_1.QUEUE_NAME, { connection });
    const job = await queue.add("test-scrape", {
        url: "https://example.com",
        meta: { user: "dev-test" }
    });
    console.log("Enqueued job:", job.id);
    await queue.close();
    await connection.quit();
}
run();
