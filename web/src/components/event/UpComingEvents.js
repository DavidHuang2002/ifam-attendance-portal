// UpcomingEvents Component
// This component displays a list of upcoming events.

import React, { useState, useEffect } from "react";
import EventCard from "@/components/event/EventCard";
import {
  EditOutlined,
  EllipsisOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";
// this file defines constant for api endpoints route
import { fetchUpComingEvents } from "@/constants/api-endpoints";
import { getOldMemberAttendanceRoute } from "@/constants/front-end-routes";
import { upcomingEventsAtom } from "@/store";
import { useAtom } from "jotai";

const getAdminActions = (eventId) => [
  <Link href={`/admin/event/${eventId}/edit`}>
    <EditOutlined key="edit" />
    <span>Edit</span>
  </Link>,
  <Link href={getOldMemberAttendanceRoute(eventId)}>
    <TeamOutlined />
    <span>Attendance</span>
  </Link>,
  <span>
    <EllipsisOutlined key="ellipsis" />
    More Actions
  </span>,
];

export function UpcomingEvents({ admin = false }) {
  const [events, setEvents] = useAtom(upcomingEventsAtom);
  // console.log("events", events);

  useEffect(() => {
    // Function to fetch events data from the API.
    const fetchEvents = async () => {
      try {
        const response = await fetchUpComingEvents();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // TODO: sort events by date - do it in backend
        const data = await response.json();
        setEvents(data);
        // console.log("Fetched events:", data);
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
                actions={admin ? getAdminActions(event.eventId) : []}
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
