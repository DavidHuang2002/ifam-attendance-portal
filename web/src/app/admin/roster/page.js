"use client";
import React, { useState, useEffect } from "react";
import { Table, Layout, Button, Modal, Divider } from "antd";
import { LayoutSider } from "@/components/dashBoard/LayoutSider";
import { getAllParticipants } from "@/service/back-end/participant";
import { renderGrade } from "@/utils/dateUtils";
// import AttendanceModal from "./AttendanceModal";
// import ParticipantDetailModal from "./ParticiapntDetailModal";
// import { getAttendanceByParticipantId } from "@/service/back-end/attendance";

const { Content } = Layout;


// const detailData = {
//   Email: "john.doe@vanderbilt.edu",
//   Class: "2026",
//   Interest: "I-FAM Nashville",
//   Note: "John Doe is a cool dude",
// };

export default function Roster() {
  const [data, setData] = useState([]);

  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // const fetchAllParticipantsData = async () => {
  //   const participants = await getAllParticipants();
  //   setData(participants);
  // }

  // useEffect(() => {
  //   fetchAllParticipantsData();
  // }, []);

  const showAttendanceModal = (participant) => {
    setAttendanceModalVisible(true);
    setSelectedParticipant(participant);
  };

  const showDetailsModal = (participant) => {
    setDetailsModalVisible(true);
    setSelectedParticipant(participant);
  };

  const handleAOk = () => {
    setAttendanceModalVisible(false);
  };

  const handleACancel = () => {
    setAttendanceModalVisible(false);
  };

  const handleDCancel = () => {
    setDetailsModalVisible(false);
  };

  const handleEditSave = () => {
    // once the participant details are saved, close the modal and refresh the data
    setDetailsModalVisible(false);
    // fetchAllParticipantsData();
  }


  const renderActions = (_, record)=>[
    <div>
      <Button 
      onClick={() => showAttendanceModal(record)}
      >
        See Attendance
      </Button>
      <Divider type="vertical" />
      <Button onClick={() => showDetailsModal(record)}>See Details</Button>
    </div>,
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      align: "center",
      render: renderGrade,
    },
    {
      title: "Action",
      align: "center",
      render: renderActions,
    },
  ];

  return (
    <LayoutSider>
      <Content
        style={{ marginLeft: "200px", padding: "24px", minHeight: "100vh" }}
      >
        <h1>Participant Roster</h1>
        <Button style={{ marginLeft: "auto" }}>Export</Button>
        <Table columns={columns} dataSource={data} />
      </Content>
      {/* <AttendanceModal
        open={attendanceModalVisible}
        onCancel={handleACancel}
        onOk={handleAOk}
        participantId={selectedParticipant?.participantId}
      />

      <ParticipantDetailModal
        open={detailsModalVisible}
        onCancel={handleDCancel}
        participantData={selectedParticipant}
        onEditSave={handleEditSave}
      /> */}
    </LayoutSider>
  );
}
