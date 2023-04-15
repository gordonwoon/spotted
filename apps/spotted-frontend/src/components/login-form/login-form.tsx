// LoginForm.tsx
import { createEffect, createSignal } from 'solid-js';
import { login } from '../../api/auth';
import { JSX } from 'solid-js';

function LoginForm(): JSX.Element {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      const response = await login(email(), password());
      console.log('Logged in:', response);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email()}
          onInput={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password()}
          onInput={(e: Event) =>
            setPassword((e.target as HTMLInputElement).value)
          }
        />
      </div>
      <button type="submit">Log in</button>
      {error() && <p>{error()}</p>}
    </form>
  );
}

export default LoginForm;
