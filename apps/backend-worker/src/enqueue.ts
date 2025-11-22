import IORedis from "ioredis";
import { Queue } from "bullmq";
import { REDIS_URL, QUEUE_NAME } from "./config";

async function run() {
  const connection = new IORedis(REDIS_URL);
  const queue = new Queue(QUEUE_NAME, { connection });

  const job = await queue.add("test-scrape", {
    url: "https://example.com",
    meta: { user: "dev-test" }
  });

  console.log("Enqueued job:", job.id);
  await queue.close();
  await connection.quit();
}

run();
