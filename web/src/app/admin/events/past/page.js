"use client";
import React from "react";
import { Space, Table, Tag } from "antd";
import { LayoutSider } from "@/components/dashBoard/LayoutSider";
import { Layout, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { EVENTS_RECORD, get_event_record_export_route } from "@/constants/api-endpoints";
import { useState, useEffect } from "react";
import EventAttendanceModal from "@/components/pastEvents/EventAttendanceModal";

const { Content } = Layout;

const fetchPastEvents = async () => {
  const response = await fetch(EVENTS_RECORD);
  const data = await response.json();

  data.forEach((event) => {
    event.key = event.id;
    event.eventDate = new Date(event.eventDates[0]).toDateString();
  });
  return data;
};

export default function ManagePastEvents() {
  const [data, setData] = useState([]);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchPastEvents().then((data) => setData(data));
  }, []);

  const downloadEventRecord = async (eventId) => {
    const response = await fetch(get_event_record_export_route(eventId));
    const blob = await response.blob(); // Convert the response to a Blob
    let filename = "download.csv"; // Default filename if not specified

    // Attempt to extract the filename from the Content-Disposition header
    const contentDisposition = response.headers.get("Content-Disposition");
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+)"?/);
      console.log("match", match)
      if (match && match[1]) {
        // trim the quotes from the filename
        filename = match[1].replace(/"/g, "");
      }
    }

    const url = window.URL.createObjectURL(blob); // Create a URL for the blob
    const a = document.createElement("a"); // Create an <a> element
    a.href = url; // Set the href of the <a> element to the blob URL
    a.download = filename; // Set the download attribute to the filename
    document.body.appendChild(a); // Append the <a> element to the body
    a.click(); // Programmatically click the <a> element to start the download
    a.remove(); // Remove the <a> element from the DOM
  };

  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "eventDate",
      align: "center",
    },
    {
      title: "# Participants",
      dataIndex: "participantNumber",
      align: "center",
    },
    {
      title: "# RSVP",
      dataIndex: "rsvpNumber",
      align: "center",
    },
    {
      title: "See Attendance",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedEvent(record.eventId);
              setAttendanceModalOpen(true);
            }}
          >
            Attendance
          </Button>
        </Space>
      ),
    },
    {
      title: "Export",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              downloadEventRecord(record.eventId);
            }}
          >
            <DownloadOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <LayoutSider>
      <Content
        style={{ marginLeft: "200px", padding: "24px", minHeight: "100vh" }}
      >
        <h1>Past events</h1>
        <Table columns={columns} dataSource={data} />
        <EventAttendanceModal
          eventId={selectedEvent}
          open={attendanceModalOpen}
          setOpen={setAttendanceModalOpen}
        />
      </Content>
    </LayoutSider>
  );
}
