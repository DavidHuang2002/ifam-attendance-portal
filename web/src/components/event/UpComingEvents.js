import React, { useState, useEffect } from "react";
import EventCard from "@/components/event/EventCard";
import {
  EditOutlined,
  EllipsisOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const adminActions = [
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

export function UpcomingEvents({ admin = false }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events"); // TODO: use constants instead of string
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // TODO: sort events by date - do it in backend
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []); // The empty array means this effect runs once on mount

  return (
    <div id="events">
      <h1 style={{ marginBottom: "20px" }}>Our Upcoming Events</h1>
      <div style={{ background: "#ECECEC" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxHeight: "60vh",
            overflowY: "auto",
            padding: "30px",
          }}
        >
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                actions={admin ? adminActions : []}
              />
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
