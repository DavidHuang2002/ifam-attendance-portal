import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  TeamOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import Link from "next/link";
import EventCard from "../event/EventCard";

const actions = [
  <Link href="../admin/editEvent">
    <EditOutlined key="edit" />

    <span>Edit</span>
  </Link>,
  <Link href="../admin/attendanceOld">
    <TeamOutlined />
    <span>Attendance</span>
  </Link>,
  <span>
    <EllipsisOutlined key="ellipsis" />
    More Actions
  </span>,
];

export function UpcomingEvents() {
  const events = [
    {
      eventName: "Event 1",
      eventDetails: "Event Details",
      eventTime: "2024-03-05T17:14:29.659Z",
      eventLocation: "FGH 100",
    },
  ];
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Upcoming Events</h1>
      <div style={{ background: "#ECECEC" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxHeight: "51vh",
            overflowY: "auto",
            padding: "30px",
          }}
        >
          {events.map((event, index) => (
            <EventCard key={index} event={event} actions={actions} />
          ))}
        </div>
      </div>
    </div>
  );
}
