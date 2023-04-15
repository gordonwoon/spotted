import Queue from 'bull';
import puppeteer, { Page } from 'puppeteer';

interface TrackingJobData {
  userId: string;
  trackingUrl: string;
  selectors: string[];
}

const trackingQueue = new Queue<TrackingJobData>('tracking', {
  // Configure your Redis server here if needed
  // redis: { host: "localhost", port: 6379 },
});

trackingQueue.process(async (job) => {
  const { userId, trackingUrl, selectors } = job.data;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(trackingUrl);

  for (const selector of selectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      await page.click(selector);
    } catch (error) {
      console.error(`Failed to interact with ${selector}:`, error);
    }
  }

  const content = await page.$eval('#content-selector', (el) =>
    el.textContent.trim()
  );
  console.log(`[${userId}] Tracked content:`, content);

  await browser.close();

  return content;
});

export default trackingQueue;
