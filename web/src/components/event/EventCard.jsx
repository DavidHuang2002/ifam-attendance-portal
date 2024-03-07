import React from "react";
import { Card, Avatar } from "antd";
import Image from "next/image";

const { Meta } = Card;

const getFirstFlyerURL = (flyers) => {
  if (flyers && flyers.length > 0) {
    return flyers[0].url;
  }
  return null;
};

const EventCard = ({ event, actions }) => {
  const defaultFlyer = "/EventFlyer/defaultFlyer.jpeg";
  const { eventName, eventTime, eventLocation, eventDetails, eventFlyer } =
    event;

  const formattedTime = new Date(eventTime).toLocaleString();

  return (
    <Card
      title={eventName}
      hoverable
      style={{ width: "100%" }}
      actions={actions}
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
            <strong>Location:</strong> {eventLocation}
          </p>
          <Meta description={eventDetails} style={{ marginTop: "10px" }} />
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
