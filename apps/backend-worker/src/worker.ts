import IORedis from "ioredis";
import { Worker } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

console.log("",process.env.REDIS_URL)


const REDIS_URL = process.env.REDIS_URL || "" ;
const QUEUE_NAME = "scrape-jobs";

async function main() {
  const connection = new IORedis(REDIS_URL, { maxRetriesPerRequest: null });

  // create a worker that will process jobs from 'scrape-jobs'
  const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
      // NOTE: do not launch puppeteer here yet. Keep it minimal.
      console.log("✅ Processing job:", {
        id: job.id,
        name: job.name,
        data: job.data,
      });

      // simulate some work
      return { ok: true };
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
