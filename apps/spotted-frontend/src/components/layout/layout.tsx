import { JSX } from 'solid-js';

function Layout({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element;
}) {
  return (
    <div class="bg-white rounded-lg shadow-lg p-8">
      {title && (
        <h1 class="text-2xl font-semibold text-gray-800 mb-6">{title}</h1>
      )}
      {children}
    </div>
  );
}

export default Layout;
