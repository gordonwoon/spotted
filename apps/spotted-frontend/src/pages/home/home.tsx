import { JSX } from 'solid-js';

function Home(): JSX.Element {
  return (
    <div class="max-w-md mx-auto">
      <div>
        <h1 class="text-2xl font-semibold">Welcome to the Home Page</h1>
      </div>
      <div class="divider-custom">
        <div class="divider-custom-line"></div>
        <div class="divider-custom-icon">
          <i class="fas fa-star"></i>
        </div>
        <div class="divider-custom-line"></div>
      </div>
      <p class="mt-2 text-gray-600">
        This sleek and modern home page is designed using Tailwind CSS. You can
        customize the design further by editing the Tailwind configuration and
        applying different utility classes to your components.
      </p>
    </div>
  );
}

export default Home;
