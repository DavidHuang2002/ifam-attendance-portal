import { makeGetEndpoint } from "@/service/api-template";
import { getEventAttendanceDetail } from "@/service/back-end/event";

const getEventRecord = async (requests, { params }) => {
  const { eventId } = params;
  return getEventAttendanceDetail(eventId);
};

export const GET = makeGetEndpoint(getEventRecord);