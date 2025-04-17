import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const store = create((set) => ({
  currentUser: null,
  isLoading: true,
  tUser: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      }else{
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
