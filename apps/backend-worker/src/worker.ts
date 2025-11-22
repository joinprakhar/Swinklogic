import IORedis from "ioredis";
import { Worker } from "bullmq";
import { REDIS_URL, QUEUE_NAME } from "./config";

async function main() {
  const connection = new IORedis(REDIS_URL, { maxRetriesPerRequest: null });

  // create a worker that will process jobs from 'scrape-jobs'
  const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
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
      } catch (error) {
        console.error("Error processing job:", error);
        throw error;
      }
    },
    { connection }
  );

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
  console.log(`🚀 Worker started — listening on queue '${QUEUE_NAME}' (Redis: ${REDIS_URL})`);

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
