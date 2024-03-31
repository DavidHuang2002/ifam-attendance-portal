import { NextResponse } from "next/server";

export const makeGetEndpoint =
  (logic) =>
  async (requests, { params }) => {
    try {
      return NextResponse.json(await logic(requests, { params }));
    } catch (e) {
      console.log("Error: ", e);
      return NextResponse.error({ error: e });
    }
  };
