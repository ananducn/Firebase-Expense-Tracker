import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  where,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = (selectedMonth) => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");

  useEffect(() => {
    if (!userId || !selectedMonth) return;

    const queryTransactions = query(
      transactionCollectionRef,
      where("userID", "==", userId),
      where("month", "==", selectedMonth),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTransactions(docs);
    });

    return () => unsubscribe();
  }, [userId, selectedMonth]);

  return { transactions };
};
