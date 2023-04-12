import { createSignal, onMount } from 'solid-js';

function getCssPath(el: any) {
  const path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += '#' + el.id;
      path.unshift(selector);
      break;
    } else {
      let sibling = el;
      let nth = 1;
      while ((sibling = sibling.previousElementSibling)) {
        if (sibling.nodeName.toLowerCase() === selector) {
          nth++;
        }
      }
      if (nth !== 1) {
        selector += ':nth-of-type(' + nth + ')';
      }
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(' > ');
}

export default function App() {
  const [trackingId, setTrackingId] = createSignal('https://www.zipair.net/en');
  const [delay, setDelay] = createSignal(0);
  // const [cssSelector, setCssSelector] = createSignal(
  //   '#appMain > div:nth-child(2) > div > div > section > div.booking-calendar > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(2) > button > span > span'
  // );
  // const [clickSelectors, setClickSelectors] = createSignal(
  //   '#panel2 > div > div:nth-child(1) > button,#dialogDescription > div > div > div:nth-child(4) > button,#panel2 > div > div.select.-to > button,#dialogDescription > div > div > div > button,#appMain > div > div.search-block.section > div > div.search > button,#__layout > div > div:nth-child(4) > div > div.popup-contents > div.footer > button.button.-positive,#appMain > div:nth-child(2) > div > div > section > div.people-block > form > div.operation-block > button'
  // );
  // const [previewContent, setPreviewContent] = createSignal('');

  const [cssSelector, setCssSelector] = createSignal('');
  const [clickSelectors, setClickSelectors] = createSignal<string[]>([]);
  const [previewContent, setPreviewContent] = createSignal('');

  async function handleSubmit() {
    const response = await fetch('http://localhost:5000/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: url(),
        css_selector: cssSelector(),
        clickSelectors: clickSelectors(),
        delay: delay(),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setPreviewContent(data.content);
    } else {
      setPreviewContent('Error fetching content');
    }
  }

  async function startTracking() {
    await fetch('http://localhost:5000/api/start-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackingId: trackingId() }),
    });

    // Send a message to the browser extension
    window.postMessage(
      { action: 'start-tracking', trackingId: trackingId() },
      '*'
    );
  }

  async function getSelectors() {
    const response = await fetch('http://localhost:5000/api/get-selectors');
    const data = await response.json();
    setClickSelectors(data);
  }

  onMount(() => {
    window.addEventListener('message', (event) => {
      if (event.source !== window) return;

      if (event.data.action === 'send-selector') {
        console.log('receiving selector', event.data.selector);
        setClickSelectors((prevSelectors) => [
          ...prevSelectors,
          event.data.selector,
        ]);
      }
    });
  });

  return (
    <>
      <h1>Spotted Application</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // handleSubmit();
        }}
      >
        <label htmlFor="url">URL:</label>
        <input
          type="url"
          id="url"
          value={trackingId()}
          onInput={(e) => setTrackingId(e.currentTarget.value)}
        />
        <br />

        <button onClick={startTracking}>Start Tracking</button>
        <button onClick={getSelectors}>Get Selectors</button>

        <ul>
          {clickSelectors().map((selector, index) => (
            <li key={index}>{selector}</li>
          ))}
        </ul>
        {/* <label htmlFor="cssSelector">CSS Selector:</label>
        <input
          type="text"
          id="cssSelector"
          value={cssSelector()}
          onInput={(e) => setCssSelector(e.currentTarget.value)}
        /> */}
        {/* <br /> */}
        {/* <label htmlFor="clickSelectors">
          Click Selectors (comma-separated):
        </label>
        <textarea
          id="clickSelectors"
          value={clickSelectors()}
          onInput={(e) => setClickSelectors(e.currentTarget.value)}
        />
        <br />
        <label htmlFor="delay">CSS Selector:</label>
        <input
          type="number"
          id="delay"
          value={delay()}
          onInput={(e) => setDelay(e.currentTarget.value)}
        />
        <br /> */}
        <button type="submit">Preview</button>
      </form>
      <div>
        <h2>Preview:</h2>
        <pre>{previewContent()}</pre>
      </div>
    </>
  );
}
