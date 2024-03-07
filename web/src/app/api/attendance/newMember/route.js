// API endpoint for creating attedance record for new member
// record down the attendance and create a new participant record if the participant 
// is a truly new member (judging by email) or update the existing participant record

import { createAttendance } from "@/service/back-end/attendance";


export async function POST(request) {
  const newAttedance = await request.json();
  try {
    const newAttendanceDocRef = await createAttendance(newAttedance);
    return Response.json(newAttendanceDocRef);
  } catch (e) {
    return Response.error({ error: e });
  }
}