export const REQUEST_HEADER = {
        'Content-Type': 'application/json',
}

export const ATTENDANCE = '/api/attendance';

export const POST_ATTENDANCE = {
    route: ATTENDANCE,
    param: {
        method: 'POST',
        headers: REQUEST_HEADER,
    }
}