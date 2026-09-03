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
const DELETED_IDS_KEY = "silvercare_deleted_request_ids";

function getDeletedIds(): Set<string> {
  try {
    if (typeof localStorage === "undefined") return new Set();
    const raw = localStorage.getItem(DELETED_IDS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function addDeletedId(id: string) {
  try {
    if (typeof localStorage === "undefined") return;
    const set = getDeletedIds();
    set.add(id);
    localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.warn("Error recording deleted ID:", e);
  }
}

const INITIAL_DEMO_REQUESTS: ServiceRequestItem[] = [
  {
    id: "req_demo_1",
    patientName: "Rajesh Malhotra",
    firstName: "Rajesh Malhotra",
    phone: "+91 9810234567",
    email: "rajesh.malhotra@gmail.com",
    city: "Gurgaon Sector 54",
    location: "Gurgaon Sector 54",
    serviceName: "Nursing & Attendant Care",
    careType: "Nursing & Attendant Care",
    service: "Nursing & Attendant Care",
    message: "Need 24/7 ICU trained home nurse for elderly father post-surgery.",
    status: "New",
    createdAt: Date.now() - 3600000 * 2,
    updatedAt: Date.now() - 3600000 * 2,
  },
  {
    id: "req_demo_2",
    patientName: "Sunita Verma",
    firstName: "Sunita Verma",
    phone: "+91 9871122334",
    email: "sunita.v@yahoo.com",
    city: "South Delhi",
    location: "South Delhi",
    serviceName: "Doctor Visit at Home",
    careType: "Doctor Visit at Home",
    service: "Doctor Visit at Home",
    message: "Home physician consultation required for senior citizen routine checkup.",
    status: "Contacted",
    createdAt: Date.now() - 3600000 * 5,
    updatedAt: Date.now() - 3600000 * 1,
  },
  {
    id: "req_demo_3",
    patientName: "Captain R.K. Sharma",
    firstName: "Captain R.K. Sharma",
    phone: "+91 9958004321",
    email: "rk.sharma@defence.gov.in",
    city: "Noida Sector 62",
    location: "Noida Sector 62",
    serviceName: "Physiotherapy at Home",
    careType: "Physiotherapy at Home",
    service: "Physiotherapy at Home",
    message: "Stroke recovery mobility therapy 5 days a week.",
    status: "In Progress",
    createdAt: Date.now() - 3600000 * 24,
    updatedAt: Date.now() - 3600000 * 12,
  }
];

export function getLocalRequests(): ServiceRequestItem[] {
  try {
    if (typeof localStorage === "undefined") return [];
    const deleted = getDeletedIds();
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data === null) {
      const initial = INITIAL_DEMO_REQUESTS.filter(r => !deleted.has(r.id || ""));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(r => !deleted.has(r.id || ""));
  } catch (e) {
    console.warn("Error reading local requests:", e);
    return [];
  }
}

function notifySync() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("silvercare_requests_updated"));
  }
}

export function saveLocalRequest(item: ServiceRequestItem) {
  try {
    if (typeof localStorage === "undefined") return;
    const existing = getLocalRequests();
    const filtered = existing.filter(
      (r) => r.id !== item.id && !(r.phone === item.phone && Math.abs((r.createdAt || 0) - (item.createdAt || 0)) < 2000)
    );
    const updated = [item, ...filtered];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    notifySync();
  } catch (e) {
    console.warn("Error saving local request:", e);
  }
}

export function updateLocalRequestStatus(id: string, newStatus: string) {
  try {
    if (typeof localStorage === "undefined") return;
    const existing = getLocalRequests();
    const updated = existing.map((r) => (r.id === id ? { ...r, status: newStatus, updatedAt: Date.now() } : r));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    notifySync();
  } catch (e) {
    console.warn("Error updating local request status:", e);
  }
}

export function deleteLocalRequest(id: string) {
  try {
    if (typeof localStorage === "undefined") return;
    addDeletedId(id);
    const existing = getLocalRequests();
    const updated = existing.filter((r) => r.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    notifySync();
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
      // Anonymous auth skipped if disabled on Firebase project
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
  let lastFirestoreItems: ServiceRequestItem[] = [];

  const emitMerged = (firestoreItems: ServiceRequestItem[] = lastFirestoreItems) => {
    lastFirestoreItems = firestoreItems;
    const localItems = getLocalRequests();
    const deleted = getDeletedIds();
    const map = new Map<string, ServiceRequestItem>();

    localItems.forEach((item) => {
      if (item.id && !deleted.has(item.id)) map.set(item.id, item);
    });

    firestoreItems.forEach((item) => {
      if (item.id && !deleted.has(item.id)) map.set(item.id, item);
    });

    const merged = Array.from(map.values());

    merged.sort((a, b) => {
      const getVal = (v: any) => (v?.toDate ? v.toDate().getTime() : typeof v === "number" ? v : 0);
      return getVal(b.createdAt) - getVal(a.createdAt);
    });

    onUpdate(merged);
  };

  const handleLocalUpdate = () => {
    emitMerged(lastFirestoreItems);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("silvercare_requests_updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);
  }

  const setup = () => {
    // 1. Immediate emit of local data while Firestore connects
    emitMerged([]);

    // 2. Attach Firestore snapshot listener IMMEDIATELY (non-blocking)
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

    // 3. Ensure auth in background non-blockingly
    ensureAuth().catch((err) => console.warn("Background auth error:", err));
  };

  setup();

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("silvercare_requests_updated", handleLocalUpdate);
      window.removeEventListener("storage", handleLocalUpdate);
    }
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
