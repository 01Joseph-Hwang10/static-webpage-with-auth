import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { Request, Response, NextFunction } from 'express';
import { AuthCache } from '../cache';
import { DEFAULT_COLLECTION_NAME, DEFAULT_COOKIE_NAME } from '../constant';

// Auth
const auth = getAuth();

// Firestore
const db = getFirestore();
const admin = db.collection(process.env.FIREBASE_ADMIN_COLLECTION || DEFAULT_COLLECTION_NAME);

// Cache
const cache = new AuthCache();

// Middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // If request is from `/login` or `/unauthorized`, skip auth
    if (req.path === '/login' || req.path === '/unauthorized')
      return next();

    // Get the access token from the cookie
    const accessToken = req.cookies[process.env.COOKIE_NAME || DEFAULT_COOKIE_NAME];
    if (!accessToken) return res.redirect('/login');

    // Check cached auth info
    if (cache.checkIfAllowed(accessToken)) return next();

    // Check auth of the request
    const decodedClaims = await auth.verifyIdToken(accessToken);
    const email = decodedClaims.email;

    // Find the user in firestore db
    const user = await admin.where('email', '==', email).get();

    // If the user not exists, redirect to `/login`
    if (user.empty) {
      return res.redirect('/unauthorized');
    }

    // If auth succeeds, cache the allowance and pass to the next middleware
    cache.markAsAllowed(accessToken);
    return next();
  } catch (error) {
    console.error(error);
    // If auth fails, reject the request
    return res.redirect('/unauthorized');
  }
};
