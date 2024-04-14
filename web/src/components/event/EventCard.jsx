import React, { useState } from "react";
import { Card, Avatar, Button, Modal, Form, Input } from "antd";
import Image from "next/image";
import { getFirstFlyerURL } from "@/service/front-end/event";
import RsvpModal from "./RsvpModal";

const { Meta } = Card;

const EventCard = ({ event, actions, admin }) => {
  const defaultFlyer = "/EventFlyer/defaultFlyer.jpeg";
  const {
    eventName,
    // eventTime,
    startTime,
    endTime,
    eventLocation,
    eventDetails,
    eventFlyer,
    eventDate,
    eventId,
  } = event;


  // console.log("event", event);

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
            <time dateTime={startTime}>{startTime}</time> -{" "}
            <time dateTime={endTime}>{endTime}</time>
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
      <RsvpModal 
        eventId={eventId} 
        eventName={eventName}
      />
    </Card>
  );
};

export default EventCard;
