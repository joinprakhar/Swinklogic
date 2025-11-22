"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const bullmq_1 = require("bullmq");
const config_1 = require("./config");
async function main() {
    const connection = new ioredis_1.default(config_1.REDIS_URL, { maxRetriesPerRequest: null });
    // create a worker that will process jobs from 'scrape-jobs'
    const worker = new bullmq_1.Worker(config_1.QUEUE_NAME, async (job) => {
        console.log("✅ Processing job:", {
            id: job.id,
            name: job.name,
            data: job.data,
        });
        try {
            // Implement actual scraping logic
            const { url, meta } = job.data;
            console.log(`Scraping URL: ${url} for user: ${meta.user}`);
            // Import scraper logic (assuming it's in a separate file)
            // For now, simulate scraping
            const scrapeResult = { url, scrapedAt: new Date().toISOString(), data: "Simulated scrape data" };
            console.log("Scraping completed:", scrapeResult);
            // Here you can add logic to save results to database, send notifications, etc.
            return { success: true, data: scrapeResult };
        }
        catch (error) {
            console.error("Error processing job:", error);
            throw error;
        }
    }, { connection });
    // optional lifecycle events
    worker.on("completed", (job) => {
        console.log(`✅ Job completed: ${job.id}`);
    });
    worker.on("failed", (job, err) => {
        console.error(`❌ Job failed: ${job?.id}`, err);
    });
    worker.on("error", (err) => {
        console.error("Worker error", err);
    });
    // wait until the worker is ready and show a friendly log
    await worker.waitUntilReady();
    console.log(`🚀 Worker started — listening on queue '${config_1.QUEUE_NAME}' (Redis: ${config_1.REDIS_URL})`);
    // graceful shutdown
    const shutdown = async () => {
        console.log("Shutting down worker...");
        await worker.close();
        await connection.quit();
        process.exit(0);
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}
main().catch((err) => {
    console.error("Worker failed to start", err);
    process.exit(1);
});
