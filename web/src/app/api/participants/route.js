const fakeParticipants = [
    {
      participantId: "1",
      name: "John Doe",
      email: "john.doe@vanderbilt.edu",
      grade: "Undergraduate Freshman",
      interests: ["I-FAM Vanderbilt", "Nashville xxx Community"],
      note: "This is a note for John Doe.",
    },

    {
      participantId: "2",
      name: "Jane Doe",
      email: "jane.doe@vanderbilt.edu",
      grade: "Graduate",
      interests: ["I-FAM Vanderbilt"],
      note: "This is a note for Jane Doe.",
    },
];
import { createNewParticipant } from "@/service/back-end/participant";

export async function GET(requests, { params }) {
    try {
        return Response.json(fakeParticipants);
    } catch (e) {
        return Response.error({ error: e });
    }
}


export async function POST(request) {
    const newParticipant = await request.json();
    try {
        const newParticipantDocRef = await createNewParticipant(newParticipant);
        return Response.json(newParticipantDocRef);
    } catch (e) {
        return Response.error({ error: e });
    }
}