import { getFirebaseAdmin } from "../config/firebase.js";

export async function createUserProfile(user) {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return { id: `demo-${Date.now()}`, ...user };
  }

  const db = admin.firestore();
  const ref = await db.collection("users").add(user);
  return { id: ref.id, ...user };
}

export async function fetchCollection(collectionName) {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return [];
  }

  const snapshot = await admin.firestore().collection(collectionName).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function storeDocument(collectionName, payload) {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return { id: `mock-${Date.now()}`, ...payload };
  }

  const ref = await admin.firestore().collection(collectionName).add(payload);
  return { id: ref.id, ...payload };
}