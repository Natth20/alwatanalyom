import { Queue, ConnectionOptions } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env["REDIS_URL"] || "redis://localhost:6379";

export const redisConnection: ConnectionOptions = {
  url: redisUrl,
  maxRetriesPerRequest: null,
};

export const fetchSourceQueue = new Queue("fetch-source", { connection: redisConnection });
export const normalizeQueue = new Queue("normalize", { connection: redisConnection });
export const dedupeQueue = new Queue("dedupe", { connection: redisConnection });
export const clusterQueue = new Queue("cluster", { connection: redisConnection });
export const translateClassifyQueue = new Queue("translate-classify", { connection: redisConnection });
export const publishQueue = new Queue("publish", { connection: redisConnection });
export const pricePollQueue = new Queue("price-poll", { connection: redisConnection });

