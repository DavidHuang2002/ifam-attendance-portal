"use client";
import React, { useState, useEffect } from "react";
import { Table, Layout, Button, Modal, Divider } from "antd";
import { LayoutSider } from "@/components/dashBoard/LayoutSider";
import {getAllParticipants} from "@/service/back-end/participant";
import { renderGrade } from "@/utils/dateUtils";

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
  const [data, setData] = useState([]);

  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect( () => {
    // fetch data
    getAllParticipants().then((data) => setData(data));
  }, []);


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
      <Button onClick={showAttendanceModal}>See Attendance</Button> <Divider type="vertical" />
      <Button onClick={showDetailsModal}>See Details</Button>
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
      render: (_, record) => (
        ActionButton
      ),
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
        onOk={handleDOk}
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
        <Button>Edit</Button>
      </Modal>
    </LayoutSider>
  );
}
