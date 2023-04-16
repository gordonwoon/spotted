import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './app2';
import './index.css';

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root')
);
