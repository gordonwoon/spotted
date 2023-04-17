// config.js
import AWS from 'aws-sdk';

// Configure the AWS SDK
AWS.config.update({
  region: 'ap-southeast-1', // Replace with your AWS region
  accessKeyId: 'AKIARMXAPUTRR3UCRIOG', // Replace with your AWS access key
  secretAccessKey: 'yNcq6lfM8Fn134z5hDXfgiETuQgL+GJW0DKcMyNnw', // Replace with your AWS secret key
});

export default AWS;
