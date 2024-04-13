import React from "react";
import { Table, Modal } from "antd";

const attendanceInfo = [
  {
    title: "Event",
    dataIndex: "event",
    key: "event",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
];



export default function AttendanceModal({
  open,
  onCancel,
  onOk,
  attendanceData,
}) {
  return (
    <Modal title="Attendance for " open={open} onCancel={onCancel} onOk={onOk}>
      <Table columns={attendanceInfo} dataSource={attendanceData} />
    </Modal>
  );
}
