import { useRoutes } from '@solidjs/router';
import { JSX } from 'solid-js';
import NavBar from './components/nav-bar/nav-bar';
import routes from './routes';

function App(): JSX.Element {
  const Routes = useRoutes(routes);
  return (
    <>
      <NavBar routes={routes} />
      <div class="container mx-auto px-4 md:px-6 lg:px-8 mt-10">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <Routes />
        </div>
      </div>
    </>
  );
}

export default App;
