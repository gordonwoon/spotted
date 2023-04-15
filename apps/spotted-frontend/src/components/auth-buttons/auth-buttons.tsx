import { JSX } from 'solid-js';

function AuthButtons(): JSX.Element {
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3001/auth/facebook';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div>
      <button onClick={handleFacebookLogin}>Log in with Facebook</button>
      <button onClick={handleGoogleLogin}>Log in with Google</button>
    </div>
  );
}

export default AuthButtons;
