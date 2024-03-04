
// define logic that interacts with the API for attedndance pages in front-end

import {POST_ATTENDANCE} from '@/constants/api-endpoints';

export const postAttednace = async (eventId, participantEmail) => {
    const params = {
        ...POST_ATTENDANCE.param,
        body: JSON.stringify({
            event: eventId,
            email: participantEmail
        })
    }

    const res = await fetch(
        POST_ATTENDANCE.route,
        params
    );

    return res;
}

