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
        displayName: 'System Administrator',
      };
      const mockAdminData: UserData = {
        email: 'admin@silvercareindia.com',
        name: 'System Administrator',
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

    try {
      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      const isKnownAdminEmail = 
        firebaseUser.email?.toLowerCase() === 'dilseinvite@gmail.com' ||
        firebaseUser.email?.toLowerCase().includes('admin');

      if (docSnap.exists()) {
        const data = docSnap.data() as UserData;
        if (isKnownAdminEmail && data.role !== 'admin' && data.role !== 'super_admin') {
          data.role = 'admin';
          await setDoc(docRef, { ...data, updatedAt: Date.now() }, { merge: true });
        }
        setUserData(data);
      } else {
        const newUserData: UserData = {
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'User'),
          role: isKnownAdminEmail ? 'admin' : 'patient',
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        try {
          await setDoc(docRef, newUserData);
          setUserData(newUserData);
        } catch (writeErr) {
          console.warn("Could not save initial user doc:", writeErr);
          setUserData(newUserData);
        }
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
      if (firebaseUser.email?.toLowerCase() === 'dilseinvite@gmail.com') {
        setUserData({
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'Admin',
          role: 'admin'
        });
      } else {
        setUserData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localAdminActive) {
      setUser({
        uid: 'admin-local-uid',
        email: 'admin@silvercareindia.com',
        displayName: 'System Administrator',
      });
      setUserData({
        email: 'admin@silvercareindia.com',
        name: 'System Administrator',
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

    if ((cleanId === 'admin' || cleanId === 'admin@silvercare.com' || cleanId === 'admin@silvercareindia.com') && cleanPass === 'admin123') {
      localStorage.setItem('silvercare_admin_auth', 'true');
      setLocalAdminActive(true);
      setUser({
        uid: 'admin-local-uid',
        email: 'admin@silvercareindia.com',
        displayName: 'System Administrator',
      });
      setUserData({
        email: 'admin@silvercareindia.com',
        name: 'System Administrator',
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
      localStorage.removeItem('silvercare_admin_auth');
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
    user?.email?.toLowerCase() === 'dilseinvite@gmail.com' ||
    userData?.role === 'super_admin' || 
    userData?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin, loginAsLocalAdmin, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};


