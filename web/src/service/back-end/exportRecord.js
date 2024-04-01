// export: event name, event date, participant name, participant email, participant class

import { unparse } from "papaparse";
import { getEventById } from "./event";
import { getParticipantByEventId } from "./participant";
import { getSubObject } from "@/utils/objectUtils";
import { dateTimeToDate, dateTimeToTime } from "@/utils/dateUtils";

// turn an array of objects into a csv file
const makeCSV = (data) => {
  const csv = unparse(data);
  return csv;
};

export async function exportEventDetails(eventId) {
  const participants = await getParticipantByEventId(eventId);

  const event = await getEventById(eventId);
  let { eventName, eventDates, eventTime, eventLocation } = event;

  let eventDate = eventDates[0];
  eventDate = dateTimeToDate(eventDate);
  eventTime = dateTimeToTime(eventTime);


  const includedEventDetails = {
    eventName,
    eventDate,
    eventTime,
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
