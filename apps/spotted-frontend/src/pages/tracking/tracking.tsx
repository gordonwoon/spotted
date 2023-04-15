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

interface IUserActions {
  selector: string;
  textContent: string;
  route: string;
}

function Tracking() {
  const [trackingId, setTrackingId] = createSignal('https://www.zipair.net/en');
  const [delay, setDelay] = createSignal(0);
  // const [cssSelector, setCssSelector] = createSignal(
  //   '#appMain > div:nth-child(2) > div > div > section > div.booking-calendar > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(2) > button > span > span'
  // );
  // const [clickSelectors, setClickSelectors] = createSignal(
  //   '#panel2 > div > div:nth-child(1) > button,#dialogDescription > div > div > div:nth-child(4) > button,#panel2 > div > div.select.-to > button,#dialogDescription > div > div > div > button,#appMain > div > div.search-block.section > div > div.search > button,#__layout > div > div:nth-child(4) > div > div.popup-contents > div.footer > button.button.-positive,#appMain > div:nth-child(2) > div > div > section > div.people-block > form > div.operation-block > button'
  // );
  // const [previewContent, setPreviewContent] = createSignal('');

  const [trackedAction, setTrackAction] = createSignal<IUserActions>();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [userActions, setUserActions] = createSignal<IUserActions[]>([]);
  const [previewContent, setPreviewContent] = createSignal('');

  async function handleSubmit() {
    const response = await fetch('http://localhost:5000/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: trackingId(),
        css_selector: trackedAction()?.selector,
        user_actions: userActions(),
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
    setUserActions(data);
  }

  onMount(() => {
    window.addEventListener('message', (event) => {
      if (event.source !== window) return;

      if (event.data.action === 'send-action') {
        console.log('receiving selector', event.data.userActions);
        setUserActions(event.data.userActions);
      }

      if (event.data.action === 'stop-tracking') {
        console.log('receiving tracked index', event.data.trackedIndex);
        setTrackAction(userActions()[event.data.trackedIndex]);
      }
    });
  });

  return (
    <>
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

        <p>
          Tracked Selector Content: <span>{trackedAction()?.textContent}</span>
        </p>
        <p>
          Tracked Selector: <span>{trackedAction()?.selector}</span>
        </p>
        <button type="submit">Preview</button>
      </form>
      <div>
        <h2>Preview:</h2>
        <pre>{previewContent()}</pre>
      </div>
    </>
  );
}

export default Tracking;