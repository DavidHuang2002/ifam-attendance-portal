export const makeGetEndpoint =
  (logic) =>
  async (requests, { params }) => {
    try {
      return Response.json(await logic(requests, { params }));
    } catch (e) {
      console.log("Error: ", e);
      return Response.error({ error: e });
    }
  };
