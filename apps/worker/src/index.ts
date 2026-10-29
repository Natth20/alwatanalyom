import { Worker } from "bullmq";
import dotenv from "dotenv";
import { redisConnection } from "./queues/index";
import { processFetchSource } from "./jobs/fetch-source";
import { processNormalize } from "./jobs/normalize";
import { processDedupe } from "./jobs/dedupe";
import { processTranslateClassify } from "./jobs/translate-classify";
import { processPublish } from "./jobs/publish";
import { runScheduler } from "./scheduler";

dotenv.config();

console.log("🚀 Starting Al-Watan Al-Youm Newsroom Worker...");

// 1. عامل جلب المصادر
new Worker(
  "fetch-source",
  async (job) => {
    await processFetchSource(job.data.sourceId);
  },
  { connection: redisConnection, concurrency: 5 }
);

// 2. عامل التطبيع
new Worker(
  "normalize",
  async (job) => {
    await processNormalize(job.data.itemId);
  },
  { connection: redisConnection, concurrency: 10 }
);

// 3. عامل كشف التكرار
new Worker(
  "dedupe",
  async (job) => {
    await processDedupe(job.data.itemId);
  },
  { connection: redisConnection, concurrency: 5 }
);

// 4. عامل الترجمة والتصنيف
new Worker(
  "translate-classify",
  async (job) => {
    await processTranslateClassify(job.data.itemId);
  },
  { connection: redisConnection, concurrency: 3 }
);

// 5. عامل النشر
new Worker(
  "publish",
  async (job) => {
    await processPublish(job.data.itemId, job.data.aiResult);
  },
  { connection: redisConnection, concurrency: 5 }
);

// تشغيل الجدولة الدورية كل 60 ثانية
runScheduler().catch(console.error);
setInterval(() => {
  runScheduler().catch(console.error);
}, 60 * 1000);

console.log("✅ Worker pipeline active and listening for newsroom jobs.");

