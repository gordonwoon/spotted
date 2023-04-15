import { JSX, createSignal } from 'solid-js';
import { Link } from '@solidjs/router';
import { RouteProps } from '../../routes';

interface NavBarProps {
  routes: RouteProps[];
}

function NavBar({ routes }: NavBarProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-gray-900">MyApp</div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              {routes?.map((route) => (
                <Link
                  href={route.path}
                  class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {route.label}
                </Link>
              ))}
              <a
                href="#"
                class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Pricing
              </a>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen())}
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class={`${isOpen() ? 'block' : 'hidden'} md:hidden`}>
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </a>
          <a
            href="#"
            class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
