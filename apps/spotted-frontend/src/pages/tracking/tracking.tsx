import { createSignal, onMount } from 'solid-js';
import Layout from '../../components/layout/layout';
import { UserAction } from '@spotted/model';

function Tracking() {
  const [url, setUrl] = createSignal('https://www.zipair.net/en');
  const [trackedAction, setTrackAction] = createSignal<UserAction>();
  const [userActions, setUserActions] = createSignal<UserAction[]>([]);
  const [previewContent, setPreviewContent] = createSignal('');

  async function handleSubmit() {
    const response = await fetch('http://localhost:5000/api/track/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: url(),
        tracked_action: trackedAction(),
        user_actions: userActions(),
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
    await fetch('http://localhost:5000/api/track/start-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url() }),
    });

    // Send a message to the browser extension
    window.postMessage({ action: 'start-tracking', url: url() }, '*');
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
        // remove tracked action from user actions
        setUserActions(userActions().slice(0, event.data.trackedIndex));
      }
    });
  });

  return (
    <Layout title="Tracking">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        class="space-y-6"
      >
        <div>
          <label htmlFor="url" class="block text-gray-700 font-medium">
            URL:
          </label>
          <input
            type="url"
            id="url"
            value={url()}
            onInput={(e) => setUrl(e.currentTarget.value)}
            class="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={startTracking}
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 focus:outline-none"
        >
          Start Tracking
        </button>

        <div>
          <p class="text-gray-700">
            Tracked Selector Content:{' '}
            <span class="font-medium">{trackedAction()?.textContent}</span>
          </p>
          <p class="text-gray-700">
            Tracked Selector:{' '}
            <span class="font-medium">{trackedAction()?.selector}</span>
          </p>
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 focus:outline-none"
          onClick={handleSubmit}
        >
          Preview
        </button>
      </form>

      <div class="mt-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Preview:</h2>
        <pre class="bg-gray-100 p-4 rounded-md">{previewContent()}</pre>
      </div>
    </Layout>
  );
}

export default Tracking;
