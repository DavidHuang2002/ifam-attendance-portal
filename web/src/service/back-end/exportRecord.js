// export: event name, event date, participant name, participant email, participant class

import { unparse } from "papaparse";
import { getEventById } from "./event";
import { getParticipantByEventId } from "./participant";
import { getSubObject } from "@/utils/objectUtils";
import { dateTimeToDate, dateTimeToTime } from "@/utils/dateUtils";
import { GRAD_STUDENT_CLASS } from "@/constants/participant";
import { getAllParticipants } from "./participant";
import { getAttendanceByParticipantId } from "./attendance";
// turn an array of objects into a csv file
const makeCSV = (data) => {
  const csv = unparse(data);
  return csv;
};

export async function exportEventDetails(eventId) {
  const participants = await getParticipantByEventId(eventId);

  const event = await getEventById(eventId);
  let { eventName, eventDate, startTime, endTime, eventLocation } = event;

  const includedEventDetails = {
    eventName,
    eventDate,
    startTime,
    endTime,
    eventLocation,
  };
  const includedParticipantDetails = ["name", "email", "class"];

    const eventExportData = participants.map((participant) => ({
        ...includedEventDetails,
        ...getSubObject(participant, includedParticipantDetails),
    }));

    const csv = makeCSV(eventExportData);
    return {
        data: csv,
        fileType: "text/csv",
        fileName: `${eventDate}-${eventName}.csv`,
    };  
}


export async function exportAllParticipants() {
  const participants = await getAllParticipants();
  const includedDetails = ["name", "email", "class", "interests", "note"];
  const csvData = participants.map((participant) => getSubObject(participant, includedDetails));

  // process the class to handle the case when class is graduate (-1)
  csvData.forEach((participant) => {
    if (participant.class === GRAD_STUDENT_CLASS) {
      participant.class = "Graduate";
    }
  });

  // turn the interests array into a string
  csvData.forEach((participant) => {
    participant.interests = participant.interests?.join(", ") || "";
  });

  const csv = makeCSV(csvData);
  return {
    data: csv,
    fileType: "text/csv",
    fileName: "allParticipants.csv",
  };
}

// export participants data with their attendance in the format of participant name, participant email, event name, event date
//  TODO we can probably make this more efficient by querying the attendance records directly
export async function exportParticipantAttendance() {
  const participants = await getAllParticipants();

  // for each participant, get their attendance records
  const attendanceData = [];
  for (const participant of participants) {
    console.log("participant in export",participant);
    const attendance = await getAttendanceByParticipantId(participant.participantId);
    for (const record of attendance) {
      const event = await getEventById(record.eventId);
      attendanceData.push({
        name: participant.name,
        email: participant.email,
        eventName: event.eventName,
        eventDate: event.eventDate
      });
    }
  }
  console.log("attendanceData in export",attendanceData);

  // order by participant name
  attendanceData.sort((a, b) => a.name.localeCompare(b.name));

  const csv = makeCSV(attendanceData);
  return {
    data: csv,
    fileType: "text/csv",
    fileName: "attendanceRecord.csv",
  };
}