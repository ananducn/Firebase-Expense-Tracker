import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase-config";

const useDeleteDocument = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDocument = async (collectionName, documentId) => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (err) {
      console.error("Error deleting document:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteDocument, loading, error };
};

export default useDeleteDocument;
