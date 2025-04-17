import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function uploadImage(imageFile, path) {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File available at", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

export { uploadImage };
