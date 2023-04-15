import { JSX } from 'solid-js';
import RegisterForm from '../../components/register-form/register-form';

function Register(): JSX.Element {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
}

export default Register;
