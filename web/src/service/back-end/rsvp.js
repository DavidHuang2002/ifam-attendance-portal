import { getParticipantByEmail } from "./participant";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { resultToDocRef } from "@/firebase/dbUtils";

export async function createRSVP(email, eventId) {
  // create a new RSVP document
  const rsvp = {
    email,
    eventId,
    rsvpTime: new Date().toISOString(),
  };

  // check if the any participant with the email exists, if so link the participantId
  const participant = await getParticipantByEmail(email);
  console.log("Participant found:", participant);
  if (participant) {
    rsvp.participantId = participant.participantId;
  }

  console.log("Creating new RSVP:", rsvp);
  // add the new RSVP document to the RSVP collection
  const result = await addDoc(collection(db, "rsvp"), rsvp);

  const rsvpDocRef = resultToDocRef(result);

  console.log("New RSVP created:", rsvpDocRef);
  return rsvpDocRef;
}
