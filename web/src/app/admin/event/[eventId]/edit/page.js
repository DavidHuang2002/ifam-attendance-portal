"use client";
import React from "react";
import { Layout } from "antd";
import { LayoutSider } from "../../../../../components/dashBoard/LayoutSider"; // Ensure this path matches your project structure
// import EditEvent from './EditEvent'; // Adjust the import path to where your EventForm.jsx is located
import EditEvent from "@/components/event/EditEvent"; // Ensure this path matches your project structure
import { upcomingEventsAtom } from "@/store";
import { useAtom } from "jotai";

const { Content } = Layout;

function Page({ params: { eventId } }) {
  const [events] = useAtom(upcomingEventsAtom);
  console.log("events in page", events);
  const eventData = events.find((event) => event.eventId === eventId);
  // console.log("eventData", eventData);

  return (
    <LayoutSider>
      <Layout style={{ marginLeft: 180 }}>
        <Content style={{ padding: "100px", margin: 0, minHeight: "280px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1>Modify Event</h1>
          </div>
          <EditEvent editMode eventData={eventData} />
        </Content>
      </Layout>
    </LayoutSider>
  );
}

export default Page;
