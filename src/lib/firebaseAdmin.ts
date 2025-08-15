import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
  throw new Error('Missing Firebase service account credentials');
}

if (!process.env.FIREBASE_ADMIN_INITIALIZED) {
  initializeApp({
    credential: cert(serviceAccount),
  });
  process.env.FIREBASE_ADMIN_INITIALIZED = 'true';
}

const adminAuth = getAuth();
export { adminAuth };