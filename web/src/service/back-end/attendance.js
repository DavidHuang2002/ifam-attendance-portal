// define attendance related logic for back-end. Like querying database or creating document in database etc.

import { addDoc, collection } from "firebase/firestore";
import { getAllDocs } from "@/firebase/dbUtils";
import { db } from "@/firebase/config";

/*
 *  given an event id and participant email, create a new attendance record in the database
  *  @param eventId: string
  * @param participantEmail: string
  *  @return: a promise that resolves to the new attendance record
  */
export const createAttendance = async (newAttedance) => {
  // add new attendace to the database
  const result = await addDoc(collection(db, "attendance"), newAttedance);

  // docRef is the path of the new attendance record. it can be used to query the record later
  const docRef = result._key.path.segments.join('/');
  return docRef;
}


export const getAllAttendance = async () => {
  return await getAllDocs("attendance");
}
