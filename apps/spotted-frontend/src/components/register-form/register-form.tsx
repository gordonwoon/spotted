// RegisterForm.tsx
import { JSX, createSignal } from 'solid-js';
import { signup } from '../../api/auth';

function RegisterForm(): JSX.Element {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      const response = await signup(email(), password());
      console.log('Registered:', response);
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
      <button type="submit">Register</button>
      {error() && <p>{error()}</p>}
    </form>
  );
}

export default RegisterForm;
