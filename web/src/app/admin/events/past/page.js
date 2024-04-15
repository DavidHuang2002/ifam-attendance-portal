"use client";
import React from "react";
import { Space, Table, Tag } from "antd";
import { LayoutSider } from "@/components/dashBoard/LayoutSider";
import { Layout, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import EventAttendanceModal from "@/components/pastEvents/EventAttendanceModal";
import { getPastEventsOverview } from "@/service/back-end/event";
import { exportEventDetails } from "@/service/back-end/exportRecord";
import { downloadFile } from "@/utils/downloadUtils";

const { Content } = Layout;

const fetchPastEvents = async () => {

  const data = await getPastEventsOverview();

  data.forEach((event) => {
    event.key = event.id;
    event.eventDate = new Date(event.eventDate).toLocaleDateString();
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
    const exportFile = await exportEventDetails(eventId);
    // format of export file
    // download the file
    downloadFile(exportFile);
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
        <h1>All events</h1>
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
