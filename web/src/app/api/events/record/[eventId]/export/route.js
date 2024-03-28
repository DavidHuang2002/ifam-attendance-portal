const makeFakeEventRecord = (eventId) => ({
  eventId: eventId,

  participants: [
    {
      participantId: "1",
      name: "John Doe",
      email: "john.doe@vanderbilt.edu",
      grade: "Undergraduate Freshman",
      interests: ["I-FAM Vanderbilt", "Nashville xxx Community"],
    },

    {
      participantId: "2",
      name: "Jane Doe",
      email: "jane.doe@vanderbilt.edu",
      grade: "Graduate",
      interests: ["I-FAM Vanderbilt"],
    },
  ],
});

export async function GET(requests, { params }) {
  try {
    const { eventId } = params;
    const eventRecord = makeFakeEventRecord(eventId);

    return Response.json(eventRecord);
  } catch (e) {
    return Response.error({ error: e });
  }
}
