import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import appletConfig from '../../firebase-applet-config.json';

// Build resilient config using environment variables with applet config fallbacks
const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || appletConfig.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Use default Firestore database instance for maximum compatibility across all projects & laptops
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Ensure browser local persistence for robust authentication sessions
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('Firebase persistence warning:', err);
  });
}

export const storage = getStorage(app);

// Role Enum
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  PROFESSIONAL = 'professional',
  PATIENT = 'patient'
}

// Global Error Handler
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo, null, 2));
  return errInfo;
}

import { compressImageToDataUrl, dataUrlToFile } from './imageUtils';

/**
 * Upload an image file to Firebase Storage with automatic client-side compression
 * and graceful fallback to optimized inline Data URL (<50KB) if Storage is offline/unauthorized.
 */
export async function uploadImageToStorage(
  file: File, 
  folder: string = 'website-content',
  onProgress?: (percent: number) => void
): Promise<string> {
  // Step 1: Client-side compression to ensure small footprint & instant preview (<50KB)
  let compressedDataUrl: string;
  let uploadableFile: File;
  try {
    compressedDataUrl = await compressImageToDataUrl(file, {
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.85,
      format: 'image/jpeg'
    });
    uploadableFile = dataUrlToFile(compressedDataUrl, file.name);
  } catch (compErr) {
    console.warn('Image compression fallback:', compErr);
    uploadableFile = file;
    compressedDataUrl = '';
  }

  if (onProgress) onProgress(30);

  // Step 2: Attempt Firebase Storage upload with a 6-second timeout
  return new Promise((resolve) => {
    let resolved = false;

    // Safety timeout fallback
    const timeoutTimer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        if (onProgress) onProgress(100);
        console.warn('Firebase Storage upload timed out, using compressed image fallback.');
        resolve(compressedDataUrl || URL.createObjectURL(uploadableFile));
      }
    }, 6000);

    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
      const uniqueFileName = `${folder}/${cleanName}-${Date.now()}.${ext}`;
      const storageRef = ref(storage, uniqueFileName);

      const uploadTask = uploadBytesResumable(storageRef, uploadableFile, {
        contentType: uploadableFile.type || 'image/jpeg',
        cacheControl: 'public, max-age=31536000'
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(Math.min(99, Math.round(progress)));
          }
        },
        (error) => {
          clearTimeout(timeoutTimer);
          if (!resolved) {
            resolved = true;
            if (onProgress) onProgress(100);
            console.warn('Storage upload error (using compressed fallback):', error);
            resolve(compressedDataUrl);
          }
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            clearTimeout(timeoutTimer);
            if (!resolved) {
              resolved = true;
              if (onProgress) onProgress(100);
              resolve(downloadUrl);
            }
          } catch (err) {
            clearTimeout(timeoutTimer);
            if (!resolved) {
              resolved = true;
              if (onProgress) onProgress(100);
              resolve(compressedDataUrl);
            }
          }
        }
      );
    } catch (err) {
      clearTimeout(timeoutTimer);
      if (!resolved) {
        resolved = true;
        if (onProgress) onProgress(100);
        resolve(compressedDataUrl);
      }
    }
  });
}

