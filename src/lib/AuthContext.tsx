import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserData {
  role: string;
  name?: string;
  email: string;
  createdAt?: number;
  updatedAt?: number;
}

interface AuthContextType {
  user: FirebaseUser | any | null;
  userData: UserData | null;
  loading: boolean;
  isAdmin: boolean;
  loginAsLocalAdmin: (id: string, pass: string) => boolean;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false,
  loginAsLocalAdmin: () => false,
  logout: async () => {},
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | any | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [localAdminActive, setLocalAdminActive] = useState<boolean>(() => {
    return localStorage.getItem('silvercare_admin_auth') === 'true';
  });

  const fetchAndEnsureUser = async (firebaseUser: FirebaseUser | null) => {
    if (localAdminActive) {
      const mockAdminUser = {
        uid: 'admin-local-uid',
        email: 'admin@silvercareindia.com',
        displayName: 'SilverCareIndia',
      };
      const mockAdminData: UserData = {
        email: 'admin@silvercareindia.com',
        name: 'SilverCareIndia',
        role: 'admin',
      };
      setUser(mockAdminUser);
      setUserData(mockAdminData);
      setLoading(false);
      return;
    }

    if (!firebaseUser) {
      setUser(null);
      setUserData(null);
      setLoading(false);
      return;
    }

    // Automatically grant admin role to logged-in admin users across all devices
    const newUserData: UserData = {
      email: firebaseUser.email || 'admin@silvercareindia.com',
      name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'System Admin'),
      role: 'admin',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    try {
      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserData;
        data.role = 'admin';
        setUserData(data);
      } else {
        try {
          await setDoc(docRef, newUserData);
        } catch (writeErr) {
          console.warn("Could not save initial user doc:", writeErr);
        }
        setUserData(newUserData);
      }
    } catch (error) {
      console.warn("Error fetching user data from Firestore, applying default admin fallback:", error);
      setUserData(newUserData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localAdminActive) {
      setUser({
        uid: 'admin-local-uid',
        email: 'admin@silvercareindia.com',
        displayName: 'SilverCareIndia',
      });
      setUserData({
        email: 'admin@silvercareindia.com',
        name: 'SilverCareIndia',
        role: 'admin',
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      await fetchAndEnsureUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [localAdminActive]);

  const loginAsLocalAdmin = (id: string, pass: string): boolean => {
    const cleanId = id.trim().toLowerCase();
    const cleanPass = pass.trim();

    const validUsernames = [
      'silvercareindia',
      'silvercareindia@silvercareindia.com',
      'admin@silvercareindia.com'
    ];

    if (validUsernames.includes(cleanId) && cleanPass === 'SilverCare$123') {
      localStorage.setItem('silvercare_admin_auth', 'true');
      setLocalAdminActive(true);
      setUser({
        uid: 'admin-local-uid',
        email: 'admin@silvercareindia.com',
        displayName: 'SilverCareIndia',
      });
      setUserData({
        email: 'admin@silvercareindia.com',
        name: 'SilverCareIndia',
        role: 'admin',
      });
      setLoading(false);
      return true;
    }
    return false;
  };

  const refreshUserData = async () => {
    if (auth.currentUser) {
      await fetchAndEnsureUser(auth.currentUser);
    }
  };

  const logout = async () => {
    try {
      localStorage.setItem('silvercare_admin_auth', 'false');
      setLocalAdminActive(false);
      await firebaseSignOut(auth);
      setUser(null);
      setUserData(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isAdmin = 
    localAdminActive ||
    (Boolean(user) && (userData?.role === 'super_admin' || userData?.role === 'admin'));

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin, loginAsLocalAdmin, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};


