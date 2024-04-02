// API endpoint for attendance

import {
  createAttendance,
  getAllAttendance,
} from "@/service/back-end/attendance";
import { ParticipantNotFound } from "@/service/back-end/attendance";

export async function POST(request) {
  const newAttedance = await request.json();
  try {
    const newAttendanceDocRef = await createAttendance(newAttedance);
    return Response.json(newAttendanceDocRef);
  } catch (e) {
    console.error(e);
    if (e instanceof ParticipantNotFound) {
      return Response.json(e.message, { status: 404 });
    }
    return Response.error({ error: e }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const attendance = await getAllAttendance();
    return Response.json(attendance);
  } catch (e) {
    return Response.error({ error: e });
  }
}
