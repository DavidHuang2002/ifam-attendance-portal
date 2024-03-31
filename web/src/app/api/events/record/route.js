import { getPastEventsOverview } from "@/service/back-end/event";
import { NextResponse } from "next/server";

const fakeEventRecord = [
  {
    eventTime: "2024-03-23T01:02:44.000Z",
    eventLocation: "lcdlv",
    eventDates: ["2024-03-15T05:00:00.000Z", "2024-04-15T05:00:00.000Z"],
    eventDetails: "ksckjvsv",
    eventName: "jhdfj",
    eventFlyer: "",
    eventId: "5AGPHTmfZgSvzBVhhBVX",
    rsvpNumber: 10,
    participantNumber: 5,
  },
  {
    eventFlyer: "",
    eventName: "Welcome to IFAM",
    eventLocation: "Buttrick 101",
    eventTime: "2024-03-23T01:31:39.000Z",
    eventDetails:
      "This is an event without image. The default image is IFAM logo",
    eventDates: ["2024-03-07T06:00:00.000Z", "2024-03-08T06:00:00.000Z"],
    eventId: "DavoqD2ps7mF8k972gKd",
    rsvpNumber: 0,
    participantNumber: 4,
  },
  {
    eventDetails: "Test",
    eventLocation: "Student Life Center",
    eventDates: ["2024-03-07T06:00:00.000Z", "2024-03-07T06:00:00.000Z"],
    eventFlyer: "",
    eventTime: "2024-03-23T01:36:04.000Z",
    eventName: "Workshop",
    eventId: "d4eWbu8pjQaX391xhvkA",
    rsvpNumber: 6,
    participantNumber: 3,
  },
  {
    eventDetails: "Eat and talk",
    eventLocation: "Student Life Center",
    eventFlyer: [
      {
        filename: "download.jpeg",
        url: "https://firebasestorage.googleapis.com/v0/b/ifam-attendance.appspot.com/o/public%2FEventFlyer%2Fdownload.jpeg?alt=media&token=732e6d13-b913-498a-a3b6-bc8aa3d3568f",
      },
    ],
    eventName: "Dinner and Discussion",
    eventTime: "2024-03-23T01:30:00.000Z",
    eventDates: ["2024-03-14T05:00:00.000Z", "2024-03-14T05:00:00.000Z"],
    eventId: "ePsENnDkrr4BQaT6FGW3",
    rsvpNumber: 6,
    participantNumber: 3,
  },
];

export async function GET(requests, { params }) {
  try {
    const pastEventsRecord = await getPastEventsOverview();
    return NextResponse.json(pastEventsRecord);
  } catch (e) {
    console.log(e);
    return NextResponse.error({ error: e });
  }
}
