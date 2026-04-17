import admin from "firebase-admin";
import { env } from "./env.js";

let app = null;

export function getFirebaseAdmin() {
  if (app) {
    return admin;
  }

  if (!env.firebaseProjectId || !env.firebaseClientEmail || !env.firebasePrivateKey) {
    return null;
  }

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.firebaseProjectId,
      clientEmail: env.firebaseClientEmail,
      privateKey: env.firebasePrivateKey
    })
  });

  return admin;
}