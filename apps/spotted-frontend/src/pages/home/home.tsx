import { JSX } from 'solid-js';
import Layout from '../../components/layout/layout';

function Home(): JSX.Element {
  return (
    <Layout title="Welcome to Spotted">
      <p class="text-gray-700 mb-4">
        Spotted is an innovative solution that allows you to track price changes
        on your favorite websites effortlessly. Save time and money by staying
        updated with the latest deals and promotions.
      </p>

      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Why choose Spotted?
      </h2>
      <ul class="list-disc pl-6 text-gray-700 space-y-2">
        <li>
          <strong>Automated tracking:</strong> Our application runs every hour,
          ensuring you have the most up-to-date pricing information.
        </li>
        <li>
          <strong>Customizable:</strong> Choose the web pages and selectors you
          want to track, tailoring the experience to your needs.
        </li>
        <li>
          <strong>User-friendly:</strong> Our sleek, modern interface makes
          tracking prices a breeze, even for those new to the process.
        </li>
        <li>
          <strong>Secure:</strong> Your data is safe with us. We use
          state-of-the-art authentication and encryption to protect your
          information.
        </li>
      </ul>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Get started now
        </h2>
        <p class="text-gray-700 mb-6">
          Sign up for a monthly subscription of just $5 and unlock the full
          potential of Spotted. Experience the convenience of automated price
          tracking today!
        </p>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 focus:outline-none"
          // Add a click event handler to navigate to the sign-up page
        >
          Sign Up
        </button>
      </div>
    </Layout>
  );
}

export default Home;
