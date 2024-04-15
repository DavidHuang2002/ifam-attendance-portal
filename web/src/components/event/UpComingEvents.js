import React, { useEffect } from "react";
import { Button, message } from "antd";
//import emailjs from "emailjs-com";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config"; // Ensure this path matches your Firebase config
import EventCard from "@/components/event/EventCard";
import {
  EditOutlined,
  EllipsisOutlined,
  TeamOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { fetchUpComingEvents } from "@/constants/api-endpoints";
import { getOldMemberAttendanceRoute } from "@/constants/front-end-routes";
import { upcomingEventsAtom } from "@/jotaiStore/store";
import { useAtom } from "jotai";
import { RsvpModalOpenAtom } from "@/jotaiStore/store";
import { getUpComingEvents } from "@/service/back-end/event";

// Define your EmailJS service IDs and template IDs
const SERVICE_ID = "service_z6ftge9";
const TEMPLATE_ID = "template_skqdme9";
const USER_ID = "VYHdyH1a8DTcRyrEv"; // Corrected for illustration

export function UpcomingEvents({ admin = false }) {
  const [events, setEvents] = useAtom(upcomingEventsAtom);
  const [_, setRsvpModalOpen] = useAtom(RsvpModalOpenAtom);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpComingEvents();
        console.log("Fetched events:", data);
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const openRsvpModal = () => {
    setRsvpModalOpen(true);
  };

  

  const getAdminActions = (event) => {
    // For now we assume that an event is notify-able, so admin can notify whenever they want
    // const isNotifyEnabled = event.eventPublished && event.eventFlyer !== "";
    const isNotifyEnabled = true;

    let actions = [
      <Link href={`/admin/event/${event.eventId}/edit`} key="edit" passHref>
        <span className="ant-btn ant-btn-link" style={{ padding: 0 }}>
          <EditOutlined />
          <span>Edit</span>
        </span>
      </Link>,
      <Link
        href={getOldMemberAttendanceRoute(event.eventId)}
        key="attendance"
        passHref
      >
        <span className="ant-btn ant-btn-link" style={{ padding: 0 }}>
          <TeamOutlined />
          <span>Attendance</span>
        </span>
      </Link>,
      <Link
      href={`/admin/event/${event.eventId}/emailparticipants`}
      key="emailparticipants"
      passHref
    >
      <span className="ant-btn ant-btn-link" style={{ padding: 0 }}>
        <TeamOutlined />
        <span>Email</span>
      </span>
    </Link>,
    ];

    // For actions like "Notify" that don't require navigation
    

    actions.push(
      <span key="more">
        <EllipsisOutlined />
        More Actions
      </span>
    );

    return actions;
  };

  const getPublicActions = (event) => {
    return [
      <Button key="rsvp" onClick={() => openRsvpModal()}>
        RSVP
      </Button>,
    ];
  }

  
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
                actions={admin ? getAdminActions(event) : getPublicActions()}
                admin={admin}
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
