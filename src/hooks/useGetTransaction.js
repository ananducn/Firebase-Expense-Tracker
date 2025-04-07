import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, where } from "firebase/firestore";
import { query } from "firebase/firestore";

import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const transactionCollectionRef = collection(db, "transactions");

  const { userId } = useGetUserInfo();
  let unsubscribe;
  const getTransaction = async () => {
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userId),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
        });

        setTransactions(docs);
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return { transactions };
};
