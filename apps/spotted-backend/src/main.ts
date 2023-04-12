import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let selectors = [];

app.post('/api/start-tracking', (req, res) => {
  // Handle start tracking request
  selectors = [];
  console.log('starting track');
  res.sendStatus(200);
});

app.post('/api/save-selector', (req, res) => {
  // Save the received click selector
  console.log('save selector', req.body.selector);
  selectors.push(req.body.selector);
  res.sendStatus(200);
});

app.get('/api/get-selectors', (req, res) => {
  // Retrieve the saved click selectors
  res.json(selectors);
});

app.post('/api/track', async (req, res) => {
  const { email, password, url, css_selector, tracking_interval } = req.body;

  // Save tracking request data (e.g., store in a database)
  // ...

  res.status(200).json({ message: 'Tracking request submitted' });
});

app.post('/api/preview', async (req, res) => {
  const { url, css_selector, clickSelectors, delay } = req.body;

  try {
    const content = await fetchContent(
      url,
      css_selector,
      clickSelectors,
      delay
    );
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching content' });
  }
});

async function fetchContent(url, cssSelector, clickSelectors, delay = 0) {
  console.log('launching browser', url);
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  await page.goto(url);

  // Perform the series of clicks
  for (const selector of clickSelectors) {
    console.log(selector);
    await page.waitForFunction(
      `document.querySelector(${JSON.stringify(selector)}) !== null`
    );

    // Promise to wait for navigation
    const navigationPromise = page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    // Get the current URL before the click
    const currentUrl = page.url();

    await page.click(selector);

    // Get the current URL after the click
    const newUrl = page.url();

    // If the URL has changed, wait for navigation to complete
    if (currentUrl !== newUrl) {
      await navigationPromise;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  const content = await page.$eval(cssSelector, (el) => el.innerText);
  console.log('content', content);
  await browser.close();

  return content;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
