import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase-config"; // Update this path if needed

const useUpdateDocument = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDocument = async (collectionName, documentId, data) => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, collectionName, documentId); // refer the document that you want to modify
      await updateDoc(docRef, data); // this updates the document with new data.
      console.log("Document successfully updated!");
    } catch (err) {
      console.error("Error updating document:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateDocument, loading, error };
};

export default useUpdateDocument;
