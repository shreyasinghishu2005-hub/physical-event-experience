import { env } from "./env.js";

let app = null;
let adminModule = null;

export async function getFirebaseAdmin() {
  if (!env.firebaseProjectId || !env.firebaseClientEmail || !env.firebasePrivateKey) {
    return null;
  }

  if (!adminModule) {
    try {
      adminModule = await import("firebase-admin");
    } catch {
      return null;
    }
  }

  const admin = adminModule.default;

  if (app) {
    return admin;
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
