/**
 * @fileoverview
 * Load environment variable if it's dev environment
 */

import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'dev') {
  const envPath = path.resolve(
    __dirname, // server
    '..', // <rootDir>
    '.env',
  );
  dotenv.config({
    path: envPath,
  });
}
