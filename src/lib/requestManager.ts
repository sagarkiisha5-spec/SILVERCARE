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

// No demo/seed data — the admin panel shows only real enquiries submitted by website visitors.

/**
 * One-time migration: purge any demo/seed entries that were injected by earlier
 * versions of this file.  Runs automatically the moment this module is imported.
 */
(function purgeLegacyDemoEntries() {
  try {
    if (typeof localStorage === "undefined") return;
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    const cleaned = parsed.filter(
      (r: any) => r && r.id && !String(r.id).startsWith("req_demo_")
    );
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleaned));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("silvercare_requests_updated"));
      }
    }
  } catch {
    // silently ignore — non-critical cleanup
  }
})();

export function getLocalRequests(): ServiceRequestItem[] {
  try {
    if (typeof localStorage === "undefined") return [];
    const deleted = getDeletedIds();
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data === null) {
      // First time ever — start with an empty list, no demo seeding
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    // Also strip out any lingering demo entries that may have been seeded in a past session
    return parsed.filter(r => !deleted.has(r.id || "") && !String(r.id || "").startsWith("req_demo_"));
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
 * Remove a local entry by ID WITHOUT adding it to the deleted-IDs blacklist.
 * Used internally when swapping a temp ID entry for the canonical Firestore ID.
 */
function removeLocalEntryById(id: string) {
  try {
    if (typeof localStorage === "undefined") return;
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return;
    const parsed: ServiceRequestItem[] = JSON.parse(data);
    const updated = parsed.filter((r) => r.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Error removing local entry by id:", e);
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
 * Universal function to save a service request both locally and to Firestore.
 * Guards against duplicate submissions (same phone within 30 seconds).
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

  // ── Duplicate-submission guard ──────────────────────────────────────────────
  // Prevent accidental double-submits: if the same phone submitted within the
  // last 30 seconds, return the existing entry without creating a new one.
  const existing = getLocalRequests();
  const recent = existing.find(
    (r) =>
      r.phone === formattedPhone &&
      Math.abs((typeof r.createdAt === "number" ? r.createdAt : 0) - timestamp) < 30_000
  );
  if (recent) {
    console.info("Duplicate submission blocked for phone:", formattedPhone);
    return recent;
  }
  // ────────────────────────────────────────────────────────────────────────────

  const tempId = `req_${timestamp}_${Math.random().toString(36).substring(2, 7)}`;

  const newItem: ServiceRequestItem = {
    id: tempId,
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

  // 1. Save to localStorage immediately so admin sees it instantly
  saveLocalRequest(newItem);

  // 2. Ensure auth & push to Firestore
  try {
    await ensureAuth();
    const docRef = await addDoc(collection(db, "serviceRequests"), {
      ...newItem,
      id: undefined, // Firestore will assign its own ID; don't store the temp one
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    // Replace the temp-ID local entry with the canonical Firestore ID entry
    // so admin panel never shows two rows for the same submission.
    removeLocalEntryById(tempId);
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

    // Build a map seeded with Firestore data first, then let localStorage OVERWRITE.
    // This ensures that admin status changes saved locally are never reverted by a
    // stale Firestore snapshot arriving later.
    const map = new Map<string, ServiceRequestItem>();

    // 1. Seed from Firestore (lower priority)
    firestoreItems.forEach((item) => {
      if (item.id && !deleted.has(item.id)) map.set(item.id, item);
    });

    // 2. Overwrite with localStorage (higher priority — reflects latest admin edits)
    localItems.forEach((item) => {
      if (item.id && !deleted.has(item.id)) {
        const existing = map.get(item.id);
        if (existing) {
          // Merge: keep the most recently updatedAt version's status
          const localUpdated = typeof item.updatedAt === "number" ? item.updatedAt : 0;
          const fsUpdated = typeof existing.updatedAt === "number" ? existing.updatedAt : (existing.updatedAt?.seconds ? existing.updatedAt.seconds * 1000 : 0);
          map.set(item.id, localUpdated >= fsUpdated ? item : existing);
        } else {
          map.set(item.id, item);
        }
      }
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
 * Universal status update helper.
 * Pass the full `item` so that Firestore-only entries are also upserted to
 * localStorage, preventing emitMerged from reverting the status on next sync.
 */
export async function updateServiceRequestStatus(
  id: string,
  newStatus: string,
  fullItem?: ServiceRequestItem
) {
  const now = Date.now();
  if (fullItem) {
    // Upsert the whole item with new status so localStorage always has it
    saveLocalRequest({ ...fullItem, id, status: newStatus, updatedAt: now });
  } else {
    updateLocalRequestStatus(id, newStatus);
  }
  try {
    await ensureAuth();
    await updateDoc(doc(db, "serviceRequests", id), {
      status: newStatus,
      updatedAt: now,
    });
  } catch (e) {
    console.warn("Firestore status update warning (updated locally):", e);
  }
}

/**
 * Bulk-sync: push current status of every item to Firestore.
 * Used by the "Save All Changes" button in admin panel.
 */
export async function syncAllStatusesToFirestore(items: ServiceRequestItem[]) {
  await ensureAuth();
  const results = await Promise.allSettled(
    items.map((item) =>
      item.id
        ? updateDoc(doc(db, "serviceRequests", item.id), {
            status: item.status,
            updatedAt: Date.now(),
          })
        : Promise.resolve()
    )
  );
  const failed = results.filter((r) => r.status === "rejected").length;
  return { total: items.length, failed };
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

/**
 * Universal clear all requests helper
 */
export function clearAllRequests() {
  try {
    if (typeof localStorage === "undefined") return;
    const current = getLocalRequests();
    current.forEach((item) => {
      if (item.id) addDeletedId(item.id);
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    notifySync();
  } catch (e) {
    console.warn("Error clearing local requests:", e);
  }
}

export async function clearAllServiceRequests(items?: ServiceRequestItem[]) {
  clearAllRequests();
  try {
    await ensureAuth();
    if (items && items.length > 0) {
      for (const req of items) {
        if (req.id && !req.id.startsWith("req_demo_")) {
          try {
            await deleteDoc(doc(db, "serviceRequests", req.id));
          } catch (err) {
            // ignore individual doc delete error
          }
        }
      }
    }
  } catch (e) {
    console.warn("Firestore clear all warning:", e);
  }
}

