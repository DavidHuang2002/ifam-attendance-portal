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
    console.log(exportFile);
    // format of export file
    
//     {
//     "data": "eventName,eventDate,startTime,endTime,eventLocation,name,email,class\r\ntest new event model,2024-04-19,10:00:00 AM,11:00:00 AM,test loc,df,david.j.huang@vanderbilt.edu,2024",
//     "fileType": "text/csv",
//     "fileName": "2024-04-19-test new event model.csv"
// }

    // download the file
    const blob = new Blob([exportFile.data], { type: exportFile.fileType });
    const url = window.URL.createObjectURL(blob); // Create a URL for the blob
    const a = document.createElement("a"); // Create an <a> element
    a.href = url; // Set the href of the <a> element to the blob URL
    a.download = exportFile.fileName; // Set the download attribute to the file name
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
