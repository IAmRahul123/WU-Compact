import 'dotenv/config';
import https from 'https';
const token = process.env.TOKEN;
const appId = process.env.APP_ID;
const workflowId = 'android-release-minor';

const data = JSON.stringify({
  appId,
  workflowId,
  branch: 'release',
  environment: {
    vars: {},
  },
});

const options = {
  hostname: 'api.codemagic.io',
  path: '/builds',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
    'Content-Length': data.length,
  },
};

const req = https.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
