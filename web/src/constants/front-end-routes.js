
const ADMIN = "/admin";

const ATTENDANCE = ADMIN + "/attendance";

export const getOldMemberAttendanceRoute = (eventId) => {
  return `${ATTENDANCE}/${eventId}/old`;
};

export const getNewMemberAttendanceRoute = (eventId) => {
  return `${ATTENDANCE}/${eventId}/new`;
};
