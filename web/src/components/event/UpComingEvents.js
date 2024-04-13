import React, { useEffect, useState } from "react";
import { Button, message, Dropdown, Menu, Table } from "antd";
import emailjs from "emailjs-com";
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
import { Modal } from "antd"

// Define your EmailJS service IDs and template IDs
const SERVICE_ID = "service_z6ftge9";
const TEMPLATE_ID = "template_skqdme9";
const USER_ID = "VYHdyH1a8DTcRyrEv"; // Corrected for illustration

const RSVPListModal = ({ visible, rsvpList, onClose }) => {
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
  ]
  return (
    <Modal
      title="RSVP List"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Table dataSource={rsvpList} columns={columns} pagination={false} />
    </Modal>
  );
};
const mockRSVPList = [
  { key: '1', email: 'john@example.com' },
  { key: '2', email: 'jane@example.com' },
];

export function UpcomingEvents({ admin = false, eventId }) {
  const [events, setEvents] = useAtom(upcomingEventsAtom);
  const [_, setRsvpModalOpen] = useAtom(RsvpModalOpenAtom);
  const [RSVPModalVisible, setRSVPModalVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchUpComingEvents();
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
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

  const deleteEvent = (eventId) => {
    // Filter out the event with the given eventId
    const updatedEvents = events.filter((event) => event.eventId !== eventId);
    setEvents(updatedEvents);
  };

  const notifyAllParticipants = async () => {
    try {
      const participantsColRef = collection(db, "participants");
      const querySnapshot = await getDocs(participantsColRef);
      const participantsList = querySnapshot.docs
        .map((doc) => doc.data().email)
        .filter((email) => email && email.trim() !== ""); // Filter out empty emails

      const sendEmailPromises = participantsList.map((email) => {
        const templateParams = {
          email, // Other parameters your email template requires
        };
        return emailjs
          .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
          .then((response) =>
            console.log("Email successfully sent to:", email, response)
          )
          .catch((error) =>
            console.error("Failed to send email to:", email, error)
          );
      });

      await Promise.all(sendEmailPromises);
      message.success("All participants with valid emails have been notified!");
    } catch (error) {
      console.error("Error sending notifications:", error);
      message.error("Failed to notify some participants.");
    }
  };

  const handleMenuClick = (key, eventId) => {
    switch (key) {
      case '1': // Delete
        deleteEvent(eventId);
        break;
      case '2': // See RSVP
        setRSVPModalVisible(true);
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={({ key }) => handleMenuClick(key, eventId)}>
      <Menu.Item key="1">Delete</Menu.Item>
      <Menu.Item key="2">See RSVP</Menu.Item>
    </Menu>
  )

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
    ];

    // For actions like "Notify" that don't require navigation
    if (isNotifyEnabled) {
      actions.push(
        <span
          onClick={() => notifyAllParticipants(event.eventId)}
          key="notify"
          className="ant-btn ant-btn-link"
          style={{ padding: 0, cursor: "pointer" }}
        >
          <MailOutlined />
          <span>Email</span>
        </span>
      );
    } else {
      actions.push(
        <span key="notify-disabled" style={{ opacity: 0.4 }}>
          <MailOutlined />
          <span>Email</span>
        </span>
      );
    }

    actions.push(
      <Dropdown key="more" overlay={menu} trigger={['click']}>
        <span>
          <EllipsisOutlined /> More Actions
        </span>
      </Dropdown>
      // <span key="more">
      //   <EllipsisOutlined />
      //   More Actions
      // </span>
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
      <RSVPListModal
        visible={RSVPModalVisible}
        rsvpList={mockRSVPList} // Pass mock RSVP list data
        onClose={() => setRSVPModalVisible(false)}
      />
    </div>
  );
}
