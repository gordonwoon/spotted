// auth.js
import express from 'express';
import crypto from 'crypto';
const router = express.Router();
import AWS from '../helper/config';

const cognito = new AWS.CognitoIdentityServiceProvider();

function calculateSecretHash(userPoolClientId, userPoolClientSecret, userName) {
  const message = userName + userPoolClientId;
  return crypto
    .createHmac('SHA256', userPoolClientSecret)
    .update(message)
    .digest('base64');
}

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const params = {
    ClientId: '1mnrbj3n1h3ls2lno5cdq4t2m',
    SecretHash: calculateSecretHash(
      '1mnrbj3n1h3ls2lno5cdq4t2m',
      '1gqksukc6fg0vmm4gc6qpp5lhg2fsbmh4ucdh70gqoc82s4efihp',
      email
    ),
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const data = await cognito.signUp(params).promise();
    res.status(201).json({ message: 'User signed up successfully', data });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(400).json({ message: 'Error signing up', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: '1mnrbj3n1h3ls2lno5cdq4t2m',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: calculateSecretHash(
        '1mnrbj3n1h3ls2lno5cdq4t2m',
        '1gqksukc6fg0vmm4gc6qpp5lhg2fsbmh4ucdh70gqoc82s4efihp',
        email
      ),
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    const { IdToken, AccessToken, RefreshToken } = data.AuthenticationResult;
    res
      .status(200)
      .json({ message: 'Logged in', IdToken, AccessToken, RefreshToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(400).json({ message: 'Error logging in', error });
  }
});

// Logout route
router.post('/logout', async (req, res) => {
  const { accessToken } = req.body;

  const params = {
    AccessToken: accessToken,
  };

  try {
    await cognito.globalSignOut(params).promise();
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(400).json({ message: 'Error logging out', error });
  }
});

export default router;
