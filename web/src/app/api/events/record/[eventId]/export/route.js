import { exportEventDetails } from "@/service/back-end/exportRecord";

export async function GET(requests, { params }) {
  try {
    const { eventId } = params;
    const exportFile = await exportEventDetails(eventId);

    return new Response(exportFile.data, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": exportFile.fileType,
        "Content-Disposition": `attachment; filename="${exportFile.fileName}"`,
      },
    });
  } catch (e) {
    console.log("Error: ", e);
    return Response.error({ error: e });
  }
}
