import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

// Upload Image to Firebase Cloud Storage
export const uploadImage = async (imageFile) => {
  const imgName = crypto.randomUUID();

  const storageRef = ref(storage, `images/${imgName}.jpg`);
  const upload = await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(upload.ref);

  return downloadURL;
};
