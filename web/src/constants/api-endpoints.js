export const REQUEST_HEADER = {
  "Content-Type": "application/json",
};

// ------- attendance -------
export const ATTENDANCE = "/api/attendance";

export const POST_ATTENDANCE = {
  route: ATTENDANCE,
  param: {
    method: "POST",
    headers: REQUEST_HEADER,
  },
};

// ------- events -------
export const EVENTS = "/api/events";

export const EVENTS_RECORD = `${EVENTS}/record`;

export const get_event_record_route = (eventId) => {
  return `${EVENTS_RECORD}/${eventId}`;
};

export const get_event_record_export_route = (eventId) => {
  return `${EVENTS_RECORD}/${eventId}/export`;
}

// ------- participants -------
export const PARTICIPANTS = "/api/participants";
export const PARTICIPANTS_RECORD = `${PARTICIPANTS}/record`;

export const get_participant_record_route = (participantId) => {
  return `${PARTICIPANTS_RECORD}/${participantId}`;
};
