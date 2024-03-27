export const REQUEST_HEADER = {
  "Content-Type": "application/json",
};

// ------- utils -------
export const setSearchParams = (route, params) => {
  const searchParams = new URLSearchParams({
    ...params,
  });

  return route + "?" + searchParams.toString();
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

export const postAttednace = async (eventId, participantEmail) => {
  const params = {
    ...POST_ATTENDANCE.param,
    body: JSON.stringify({
      eventId: eventId,
      email: participantEmail,
    }),
  };

  const res = await fetch(POST_ATTENDANCE.route, params);

  return res;
};


// ------- events -------
export const EVENTS = "/api/events";

export const EVENTS_RECORD = `${EVENTS}/record`;

export const get_event_record_route = (eventId) => {
  return `${EVENTS_RECORD}/${eventId}`;
};

export const get_event_record_export_route = (eventId) => {
  return `${EVENTS_RECORD}/${eventId}/export`;
};

// fetch upcoming events by setting the search parameter to upcoming
export const fetchUpComingEvents = () => {
  return fetch(setSearchParams(EVENTS, { upcoming: true }));
};

// ------- participants -------
export const PARTICIPANTS = "/api/participants";
export const PARTICIPANTS_RECORD = `${PARTICIPANTS}/record`;

export const get_participant_record_route = (participantId) => {
  return `${PARTICIPANTS_RECORD}/${participantId}`;
};

export const postParticipant = async (participant) => {
  const params = {
    method: "POST",
    headers: REQUEST_HEADER,
    body: JSON.stringify(participant),
  };

  const res = await fetch(PARTICIPANTS, params);

  return res;
}