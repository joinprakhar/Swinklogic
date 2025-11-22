import IORedis from "ioredis";
import { Queue } from "bullmq";
import { REDIS_URL, QUEUE_NAME } from "./config";

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
