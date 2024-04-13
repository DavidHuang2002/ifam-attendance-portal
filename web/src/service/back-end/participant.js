import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { getAttendanceByEventId } from "./attendance";


export const getAllParticipants = async () => {
  const query = collection(db, "participants");
  const snapshot = await getDocs(query);
  const participants = [];
  snapshot.forEach((doc) => {
    participants.push({ ...doc.data(), participantId: doc.id });
  }
  );
  return participants; 
};

export const getParticipantByEmail = async (email) => {
  // query firebase with email
  const query = collection(db, "participants");
  const snapshot = await getDocs(query);
  let participant = null;
  // console.log("email: ", email);
  snapshot.forEach((doc) => {
    // console.log(doc.data());
    if (doc.data().email == email.trim()) {
      participant = doc.data();
      participant.participantId = doc.id;
    }
  });

  return participant;
};

export const createNewParticipant = async (newParticipant) => {
  // check if the participant already exists by email.
  const participant = await getParticipantByEmail(newParticipant.email);

  // if the participant already exists, simply update the participant info with the new info
  if (participant) {
    // console.log("participant exists: ", participant);
    // console.log("new participant: ", newParticipant);
    const participantRef = doc(db, "participants", participant.participantId);
    // console.log("participantRef: ", participantRef);
    await updateDoc(participantRef, newParticipant);

    // TODO the update participant is not working
    const docRef = participantRef._key.path.segments.join("/");
    return docRef;
  }

  // if the participant does not exist, add the new participant to the database
  const result = await addDoc(collection(db, "participants"), newParticipant);
  const docRef = result._key.path.segments.join("/");
  return docRef;
};

// returned the details of all participants who attendend a specific event
export const getParticipantByEventId = async (eventId) => {
  const attendace = await getAttendanceByEventId(eventId);

  const participants = [];
  for (let i = 0; i < attendace.length; i++) {
    const attendanceEmail = attendace[i].email;
    const participant = await getParticipantByEmail(attendanceEmail) || {attendanceEmail};
    participants.push(participant);
  }

  return participants;
}