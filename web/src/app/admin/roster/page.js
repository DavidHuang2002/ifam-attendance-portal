"use client";
import React, { useState } from "react";
import { Table, Layout, Button, Modal, Divider } from "antd";
import { LayoutSider } from "@/components/dashBoard/LayoutSider";
import Link from "next/link";
import EditInfo from "@/components/roster/EditInfo";

const { Content } = Layout;

const attendanceInfo = [
  {
    title: "Event",
    dataIndex: "Event",
    key: "Event",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date",
    align: "center",
  },
];

const attendanceData = [
  {
    Event: "Dinner & Discussion",
    Date: "xxxx",
  },
  {
    Event: "Event 2",
    Date: "xxxx",
  },
  {
    Event: "Event 3",
    Date: "xxxx",
  },
];

const detailData = [
  {
    Email: "john.doe@vanderbilt.edu",
    Class: "2026",
    Interest: "I-FAM Nashville",
    Note: "John Doe is a cool dude",
  },
];

export default function Roster() {
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false); 
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const showEditModal = (participant) => {
    setSelectedParticipant(participant);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditSave = (editedParticipant) => {
    console.log("Edited participant:", editedParticipant);
    setEditModalVisible(false);
  };

  const showAttendanceModal = () => {
    setAttendanceModalVisible(true);
  };

  const showDetailsModal = () => {
    setDetailsModalVisible(true);
  };

  const handleAOk = () => {
    setAttendanceModalVisible(false);
  };

  const handleACancel = () => {
    setAttendanceModalVisible(false);
  };

  const handleDOk = () => {
    setDetailsModalVisible(false);
  };

  const handleDCancel = () => {
    setDetailsModalVisible(false);
  };

  const ActionButton = [
    <div>
      <Button onClick={showAttendanceModal}>See Attendance</Button> |
      <Button onClick={showDetailsModal}>See Details</Button>
    </div>,
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      align: "center",
    },
    {
      title: "Class",
      dataIndex: "Class",
      key: "Class",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
    },
  ];

  const data = [
    {
      Name: "John Doe",
      Email: "...@vanderbilt.edu",
      Class: "2026",
      Action: ActionButton,
    },
    {
      Name: "Joe Bob",
      Email: "...@vanderbilt.edu",
      Class: "2027",
      Action: ActionButton,
    },
    {
      Name: "Billy Bob Joe",
      Email: "...@vanderbilt.edu",
      Class: "2025",
      Action: ActionButton,
    },
    {
      Name: "Joe Billy",
      Email: "...@vanderbilt.edu",
      Class: "2028",
      Action: ActionButton,
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
      <Modal
        title="Attendance for "
        open={attendanceModalVisible}
        onCancel={handleACancel}
        onOk={handleAOk}
      >
        <Table columns={attendanceInfo} dataSource={attendanceData} />
      </Modal>
      <Modal
        title="Info on "
        open={detailsModalVisible}
        onCancel={handleDCancel}
        footer={[
          <Button key="edit" onClick={showEditModal}>
            Edit
          </Button>
        ]}
      >
        <ul>
          <li>
            <strong>Email:</strong> {detailData[0].Email}
          </li>
          <li>
            <strong>Class:</strong> {detailData[0].Class}
          </li>
          <li>
            <strong>Interest:</strong> {detailData[0].Interest}
          </li>
          <li>
            <strong>Note:</strong> {detailData[0].Note}
          </li>
        </ul>
      </Modal>
      <EditInfo
        participant={selectedParticipant}
        visible={editModalVisible}
        onCancel={handleEditCancel}
        onSave={handleEditSave}
      />
    </LayoutSider>
  );
}
