/**
 * @fileoverview
 * Initialize firebase app
 */
import { initializeApp, cert } from 'firebase-admin/app';

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replaceAll(/\\n/g, '\n'),
  }),
});
