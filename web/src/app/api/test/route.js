// for debugging purposes
import { getParticipantByEmail } from "@/service/back-end/participant";
export async function GET(requests, { params }) {
    try {
        const p = getParticipantByEmail("david.j.huang@vanderbilt.edu");
        return Response.json(p);
    } catch (e) {
        return Response.error({ error: e });
    }
}