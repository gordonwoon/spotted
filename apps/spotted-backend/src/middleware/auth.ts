import { Request, Response, NextFunction } from 'express';
import AWS from 'aws-sdk';

// Create a Cognito Identity Service Provider
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new Error('Access token not provided');
    }

    // Get user details from Cognito using the access token
    const user = await cognito.getUser({ AccessToken: accessToken }).promise();

    // Attach the user to the request object for further processing
    (req as any).user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
