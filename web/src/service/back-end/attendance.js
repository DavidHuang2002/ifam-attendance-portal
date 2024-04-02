// define attendance related logic for back-end. Like querying database or creating document in database etc.

import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAllDocs } from "@/firebase/dbUtils";
import { db } from "@/firebase/config";
import { getParticipantByEmail } from "@/service/back-end/participant";

export class ParticipantNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // Set the name of the error to the class name
    this.message = message; // Set the error message
    this.stack = new Error().stack; // Capture the stack trace
  }
}

/*
 *  given an event id and participant email, create a new attendance record in the database
 *  @param eventId: string
 * @param participantEmail: string
 *  @return: a promise that resolves to the new attendance record
 */
export const createAttendance = async (newAttedance) => {
  // attendance logic
  // check if participant info match existing participant info in the database
  const { email } = newAttedance;

  // get participant info from the database
  const participant = await getParticipantByEmail(email);

  // console.log("attendance participant: ", participant);

  // if there is a match, create a new attendance record in the database, including the participant id
  if (participant) {
    newAttedance.participantId = participant.participantId;
  } else {
    throw new ParticipantNotFound(`Participant not found with email: ${email}`);
  }

  // timestamp the attendance record
  newAttedance.timestamp = new Date().toISOString();

  // add new attendace to the database
  const result = await addDoc(collection(db, "attendance"), newAttedance);

  // docRef is the path of the new attendance record. it can be used to query the record later
  const docRef = result._key.path.segments.join("/");
  return docRef;
};

/*
 *  get all attendance records from the database
 *  @return: a promise that resolves to all attendance records
 */
export const getAllAttendance = async () => {
  return await getAllDocs("attendance");
};

export const getEventAttendanceNumber = async (eventId) => {
  const query = collection(db, "attendance");
  const snapshot = await getDocs(query);
  let count = 0;
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.eventId === eventId) {
      count++;
    }
  });
  return count;
};

export const getAttendanceByEventId = async (eventId) => {
  const query = collection(db, "attendance");
  const snapshot = await getDocs(query);
  const attendance = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.eventId === eventId) {
      attendance.push(data);
    }
  });
  return attendance;
};
