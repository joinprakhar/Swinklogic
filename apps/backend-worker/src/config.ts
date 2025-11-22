import dotenv from "dotenv";

dotenv.config();

export const REDIS_URL =
  process.env.REDIS_URL ||
  "redis://default:xhF58bE5ejPCwaxJr47cKm2J1iE4QlvB@redis-10867.c90.us-east-1-3.ec2.cloud.redislabs.com:10867";

export const QUEUE_NAME = "scrape-jobs";
