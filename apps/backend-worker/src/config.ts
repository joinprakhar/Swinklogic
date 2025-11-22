// apps/worker/src/config.ts

import dotenv from "dotenv";

dotenv.config();


export const REDIS_URL = process.env.REDIS_URL ?? 'redis://default:xhF58bE5ejPCwaxJr47cKm2J1iE4QlvB@redis-10867.c90.us-east-1-3.ec2.cloud.redislabs.com:10867';
export const QUEUE_NAME = process.env.QUEUE_NAME ?? 'scrape-queue';
export const MAX_CONCURRENT_PAGES = Number(process.env.MAX_CONCURRENT_PAGES ?? 3);
export const HEADLESS = (process.env.HEADLESS ?? 'true') === 'true';
export const BROWSER_ARGS = (process.env.BROWSER_ARGS ?? '--no-sandbox,--disable-setuid-sandbox').split(',');
export const CHROME_PATH = process.env.CHROME_PATH; // optional
