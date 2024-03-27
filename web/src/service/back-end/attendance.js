// define attendance related logic for back-end. Like querying database or creating document in database etc.

import { addDoc, collection } from "firebase/firestore";
import { getAllDocs } from "@/firebase/dbUtils";
import { db } from "@/firebase/config";
import { getParticipantByEmail } from "@/service/back-end/participant";

// attendance logic
// check if participant info match existing participant info in the database
// if there is a match, create a new attendance record in the database, including the participant id
// if there is no match, create a new member record in the database, then create a new attendance record in the database, including the new participant id

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

  // if there is a match, create a new attendance record in the database, including the participant id
  // if there is no match, create a new member record in the database, then create a new attendance record in the database, including the new participant id

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
