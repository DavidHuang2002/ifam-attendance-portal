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