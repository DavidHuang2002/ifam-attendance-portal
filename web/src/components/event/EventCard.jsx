import React, { useState } from "react";
import { Card, Avatar, Button, Modal, Form, Input } from "antd";
import Image from "next/image";
import { getFirstFlyerURL } from "@/service/front-end/event";

const { Meta } = Card;

const EventCard = ({ event, actions, admin }) => {
  const defaultFlyer = "/EventFlyer/defaultFlyer.jpeg";
  const {
    eventName,
    eventTime,
    eventLocation,
    eventDetails,
    eventFlyer,
    eventDates,
  } = event;
  // only taking the first date for now (assuming there is no multi-day event)
  const eventDate = eventDates[0];

  // console.log("event", event);

  // format time to only keep the time without the date
  const formattedTime = new Date(eventTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle form submission here
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    // Handle form submission here
    // console.log("Thank you for you RSVP", email);
    setShowMessage(true);
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Card
      title={eventName}
      hoverable
      style={{ width: "100%" }}
      actions={!admin ? [<Button key="rsvp" onClick={showModal}>
        RSVP
      </Button>, ...actions] :
      actions}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {" "}
        {/* Adjust alignment and spacing */}
        <Image
          alt={eventName}
          src={getFirstFlyerURL(eventFlyer) || defaultFlyer}
          width={100}
          height={100}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "5px",
          }}
        />
        <div style={{ maxWidth: "calc(100% - 120px)" }}>
          {/* Ensure text does not overflow */}
          <p>
            <strong>Time:</strong>{" "}
            <time dateTime={eventTime}>{formattedTime}</time>
          </p>
          <p>
            <strong>Dates: </strong>
            <time dateTime={eventDate}>
              {new Date(eventDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </p>
          <p>
            <strong>Location:</strong> {eventLocation}
          </p>
          <Meta description={eventDetails} style={{ marginTop: "10px" }} />
        </div>
      </div>
      <Modal
        title="RSVP"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        ]}
      >
        <Form>
          <p>RSVP Details</p>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input value={email} onChange={handleChange}/>
          </Form.Item>
        </Form>
      </Modal>
      {showMessage && (
        <p style={{ marginTop: "10px", color: "green" }}>Thank you for your RSVP. We have received your email: {email}</p>
      )}
    </Card>
  );
};

export default EventCard;
