import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { signInAnonymously } from "firebase/auth";

export interface ServiceRequestItem {
  id?: string;
  patientName: string;
  firstName?: string;
  phone: string;
  email?: string;
  city: string;
  location?: string;
  serviceName: string;
  careType?: string;
  service?: string;
  message?: string;
  consent?: boolean;
  status: "New" | "Contacted" | "Assigned" | "In Progress" | "Completed" | "Cancelled" | string;
  createdAt: number | any;
  updatedAt: number | any;
}

const LOCAL_STORAGE_KEY = "silvercare_local_requests";

export function getLocalRequests(): ServiceRequestItem[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn("Error reading local requests:", e);
    return [];
  }
}

export function saveLocalRequest(item: ServiceRequestItem) {
  try {
    const existing = getLocalRequests();
    // Prevent duplicate entries by id or timestamp/phone match
    const filtered = existing.filter(
      (r) => r.id !== item.id && !(r.phone === item.phone && Math.abs((r.createdAt || 0) - (item.createdAt || 0)) < 2000)
    );
    const updated = [item, ...filtered];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Error saving local request:", e);
  }
}

export function updateLocalRequestStatus(id: string, newStatus: string) {
  try {
    const existing = getLocalRequests();
    const updated = existing.map((r) => (r.id === id ? { ...r, status: newStatus, updatedAt: Date.now() } : r));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Error updating local request status:", e);
  }
}

export function deleteLocalRequest(id: string) {
  try {
    const existing = getLocalRequests();
    const updated = existing.filter((r) => r.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Error deleting local request:", e);
  }
}

/**
 * Ensures anonymous firebase auth if not logged in
 */
async function ensureAuth() {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.warn("Anonymous auth failed:", e);
    }
  }
}

/**
 * Universal function to save a service request both locally and to Firestore
 */
export async function submitServiceRequest(data: {
  patientName: string;
  phone: string;
  city: string;
  careType: string;
  email?: string;
  message?: string;
  consent?: boolean;
}): Promise<ServiceRequestItem> {
  const formattedPhone = data.phone.startsWith("+91") ? data.phone : `+91 ${data.phone}`;
  const timestamp = Date.now();
  const reqId = `req_${timestamp}_${Math.random().toString(36).substring(2, 7)}`;

  const newItem: ServiceRequestItem = {
    id: reqId,
    patientName: data.patientName,
    firstName: data.patientName,
    phone: formattedPhone,
    email: data.email || "",
    city: data.city || "Delhi NCR",
    location: data.city || "Delhi NCR",
    serviceName: data.careType,
    careType: data.careType,
    service: data.careType,
    message: data.message || "",
    consent: data.consent !== false,
    status: "New",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  // 1. Save to localStorage immediately
  saveLocalRequest(newItem);

  // 2. Ensure auth & push to Firestore
  try {
    await ensureAuth();
    const docRef = await addDoc(collection(db, "serviceRequests"), {
      ...newItem,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    newItem.id = docRef.id;
    saveLocalRequest(newItem);
  } catch (err) {
    console.warn("Firestore write failed, request safely persisted in localStorage:", err);
  }

  return newItem;
}

/**
 * Universal subscription helper for Admin screens.
 * Listens to Firestore AND merges localStorage requests seamlessly.
 */
export function subscribeToServiceRequests(onUpdate: (requests: ServiceRequestItem[]) => void): () => void {
  let unsubscribeFirestore: (() => void) | undefined;

  const emitMerged = (firestoreItems: ServiceRequestItem[]) => {
    const localItems = getLocalRequests();
    const map = new Map<string, ServiceRequestItem>();

    localItems.forEach((item) => {
      if (item.id) map.set(item.id, item);
    });

    firestoreItems.forEach((item) => {
      if (item.id) map.set(item.id, item);
    });

    const merged = Array.from(map.values());

    merged.sort((a, b) => {
      const getVal = (v: any) => (v?.toDate ? v.toDate().getTime() : typeof v === "number" ? v : 0);
      return getVal(b.createdAt) - getVal(a.createdAt);
    });

    onUpdate(merged);
  };

  const setup = async () => {
    // Immediate emit of local data while Firestore connects
    emitMerged([]);

    await ensureAuth();

    try {
      const q = query(collection(db, "serviceRequests"), orderBy("createdAt", "desc"));
      unsubscribeFirestore = onSnapshot(
        q,
        (snapshot) => {
          const fsData: ServiceRequestItem[] = [];
          snapshot.forEach((d) => fsData.push({ id: d.id, ...d.data() } as ServiceRequestItem));
          emitMerged(fsData);
        },
        (err) => {
          console.warn("Ordered Firestore query failed, fallback to unordered:", err);
          unsubscribeFirestore = onSnapshot(
            collection(db, "serviceRequests"),
            (snapshot) => {
              const fsData: ServiceRequestItem[] = [];
              snapshot.forEach((d) => fsData.push({ id: d.id, ...d.data() } as ServiceRequestItem));
              emitMerged(fsData);
            },
            (e) => {
              console.warn("Unordered Firestore subscription failed, using local storage requests:", e);
              emitMerged([]);
            }
          );
        }
      );
    } catch (e) {
      console.warn("Firestore subscription setup failed:", e);
      emitMerged([]);
    }
  };

  setup();

  return () => {
    if (unsubscribeFirestore) unsubscribeFirestore();
  };
}

/**
 * Universal status update helper
 */
export async function updateServiceRequestStatus(id: string, newStatus: string) {
  updateLocalRequestStatus(id, newStatus);
  try {
    await ensureAuth();
    await updateDoc(doc(db, "serviceRequests", id), {
      status: newStatus,
      updatedAt: Date.now(),
    });
  } catch (e) {
    console.warn("Firestore status update warning (updated locally):", e);
  }
}

/**
 * Universal request deletion helper
 */
export async function deleteServiceRequest(id: string) {
  deleteLocalRequest(id);
  try {
    await ensureAuth();
    await deleteDoc(doc(db, "serviceRequests", id));
  } catch (e) {
    console.warn("Firestore delete warning (deleted locally):", e);
  }
}
