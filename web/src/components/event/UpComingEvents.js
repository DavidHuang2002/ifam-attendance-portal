import React, { useEffect, useState } from "react";
import { Button, message, Dropdown, Menu, Table } from "antd";
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
import { getOldMemberAttendanceRoute } from "@/constants/front-end-routes";
import { upcomingEventsAtom } from "@/jotaiStore/store";
import { useAtom } from "jotai";
import { RsvpModalOpenAtom } from "@/jotaiStore/store";
import { Modal } from "antd"
import { handleDeleteEvent } from "./DeleteEvent";
import { getUpComingEvents } from "@/service/back-end/event";

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

  

  const handleMenuClick = (key, eventId) => {
    switch (key) {
      case '1': // Delete
        console.log("ID1", eventId)
        handleDeleteEvent(eventId, setEvents);
        break;
      case '2': // See RSVP
        setRSVPModalVisible(true);
        break;
      default:
        break;
    }
  };

  const menu = (eventId) => (
    <Menu onClick={({ key }) => handleMenuClick(key, eventId)}>
      <Menu.Item key="1">Delete</Menu.Item>
      {/* <Menu.Item key="2">See RSVP</Menu.Item> */}
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

    actions.push(
      <Dropdown key="more" overlay={menu(event.eventId)} trigger={['click']}>
        <span>
          <EllipsisOutlined /> More Actions
        </span>
      </Dropdown>
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
      <div style={{ background: "#f5f5f5", padding: "1rem"}}>
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
