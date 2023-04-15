import { JSX } from 'solid-js';
import AuthButtons from '../../components/auth-buttons/auth-buttons';
import LoginForm from '../../components/login-form/login-form';

function Login(): JSX.Element {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <AuthButtons />
    </div>
  );
}

export default Login;
