// API endpoint for attendance

import { createAttendance, getAllAttendance } from '@/app/service/back-end/attendance';

export async function POST(request) {
  const newAttedance = await request.json()
  try {
    const newAttendanceDocRef = await createAttendance(newAttedance);
    return Response.json(newAttendanceDocRef);
  
  } catch (e) {
    return Response.error({error: e});
  }
}


export async function GET(request) {
  try {
    const attendance = await getAllAttendance();
    return Response.json(attendance);
  } catch (e) {
    return Response.error({error: e});
  }
}