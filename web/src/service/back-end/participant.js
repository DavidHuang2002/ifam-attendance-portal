import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const getParticipantByEmail = async (email) => {
  // query firebase with email
  const query = collection(db, "participants");
  const snapshot = await getDocs(query);
  let participant = null;
  console.log("email: ", email);
  snapshot.forEach((doc) => {
    console.log(doc.data());
    if (doc.data().email == email.trim()) {
      participant = doc.data();
    }
  });

  return participant;
};
