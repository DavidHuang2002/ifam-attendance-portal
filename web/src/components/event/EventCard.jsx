import React from "react";
import { Card, Avatar } from "antd";
import Image from "next/image";
import { getFirstFlyerURL } from "@/service/front-end/event";

const { Meta } = Card;

const EventCard = ({ event, actions }) => {
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
    </Card>
  );
};

export default EventCard;
