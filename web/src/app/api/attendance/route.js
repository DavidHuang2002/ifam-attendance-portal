// API endpoint for attendance
// rebuild


import {
  createAttendance,
  getAllAttendance,
} from "@/service/back-end/attendance";
import { ParticipantNotFound } from "@/service/back-end/attendance";
import { NextResponse } from "next/server";

export async function POST(request) {
  const newAttedance = await request.json();
  try {
    const newAttendanceDocRef = await createAttendance(newAttedance);
    return NextResponse.json(newAttendanceDocRef);
  } catch (e) {
    console.error(e);
    if (e instanceof ParticipantNotFound) {
      return NextResponse.json(e.message, { status: 404 });
    }
    return NextResponse.error({ error: e }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const attendance = await getAllAttendance();
    return NextResponse.json(attendance);
  } catch (e) {
    return NextResponse.error({ error: e });
  }
}
