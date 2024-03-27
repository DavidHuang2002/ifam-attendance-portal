// common utility functions for database operations
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/firebase/config";
import { db } from "@/firebase/config";

/**
 * get all documents from a collection
 * @see https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection
 * @param colectionName: string
 * @return: a promise that resolves to an array of all documents in the collection
 */
export const getAllDocs = async (colectionName) => {
  const querySnapshot = await getDocs(collection(db, colectionName));
  const docs = [];

  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });
  return docs;
};

export const resultToDocRef = (result) => {
  return result._key.path.segments.join("/");
}
