const getFakeParticipantRecord = (participantId) => ({
  participantId: participantId,
  eventsAttended: [
    {
      eventTime: "2024-03-23T01:02:44.000Z",
      eventLocation: "lcdlv",
      eventDetails: "ksckjvsv",
      eventName: "jhdfj",
      eventId: "5AGPHTmfZgSvzBVhhBVX",
    },
  ],
});
export async function GET(requests, { params }) {
  const { participantId } = params;
  try {
    return Response.json(getFakeParticipantRecord(participantId));
  } catch (e) {
    return Response.error({ error: e });
  }
}
