import { UserAction } from '@spotted/model';
import puppeteer from 'puppeteer';

async function performTracking(
  url,
  tracked_action: UserAction,
  user_actions: UserAction[],
  delay = 0
) {
  try {
    console.log('launching browser', url);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: ['--window-size=1920,1080'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Perform the series of clicks
    for (const action of user_actions) {
      console.log(action);

      if (action.type === 'scroll') {
        await page.evaluate((scrollY) => {
          window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }, action.scrollY);
        await new Promise((resolve) => setTimeout(resolve, 250));
      } else if (action.type === 'click') {
        // Wait for the element to appear in the DOM
        await page.waitForSelector(action.selector);

        // Wait for the element to be visible
        await page.waitForFunction(
          (selector) => {
            const el = document.querySelector(selector);
            return el && getComputedStyle(el).display !== 'none';
          },
          {},
          action.selector
        );

        // If the URL has changed, wait for navigation to complete
        if (action?.route) {
          const navigationPromise = page.waitForNavigation({
            waitUntil: 'networkidle0',
          });

          await page.click(action.selector);
          await navigationPromise;
        } else {
          await page.click(action.selector);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Wait for the tracked element to appear
    await page.waitForSelector(tracked_action.selector);

    // Check if the tracked element exists
    const trackedElement = await page.$(tracked_action.selector);
    if (!trackedElement) {
      throw new Error(`Element not found: ${tracked_action.selector}`);
    }

    const content = await trackedElement.evaluate(
      (el: HTMLElement) => el.textContent
    );
    console.log('content', content);
    await browser.close();

    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw new Error('Error fetching content');
  }
}

export default performTracking;
