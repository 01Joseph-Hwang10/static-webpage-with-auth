/**
 * @fileoverview
 * Serves static files from `public` to authenticated users.
 */

import './environment/load-dev-env';
import './environment/sanitize-variables';
import './firebase/init-firebase';
import express from 'express';
import cookieParser from 'cookie-parser';
import urlJoin from './url-join';
import { authMiddleware } from './middleware';
import { loginTemplate, unauthorizedTemplate } from './template';
import { DEFAULT_COOKIE_NAME, DEFAULT_STATIC_PATH } from './constant';

const port = process.env.PORT || 3000;
const staticPath = process.env.STATIC_FILES_PATH || DEFAULT_STATIC_PATH;
const cookieName = process.env.COOKIE_NAME || DEFAULT_COOKIE_NAME;
const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_API_KEY || '',
  authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN || '',
  projectId: process.env.FIREBASE_CONFIG_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID || '',
  appId: process.env.FIREBASE_CONFIG_APP_ID || '',
  measurementId: process.env.FIREBASE_CONFIG_MEASUREMENT_ID || ''
}

const app = express();

app.use(cookieParser());
app.use(authMiddleware);
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.sendFile(urlJoin(__dirname, staticPath, 'index.html'));
});

app.get('/login', (req, res) => {
  res.send(loginTemplate({
    firebaseConfig,
    title: 'Login',
    cookieName: cookieName,
  })).end();
})

app.get('/unauthorized', (req, res) => {
  res.send(unauthorizedTemplate({
    title: 'Unauthorized',
    cookieName: cookieName
  })).end();
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!').end();
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
