import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransactions = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    month,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID: userId,
      description,
      transactionAmount,
      transactionType,
      month,
      createdAt: serverTimestamp(),
    });
  };

  return { addTransaction };
};
