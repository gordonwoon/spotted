// config.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'your-region',
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-access-key',
});

export default AWS;
