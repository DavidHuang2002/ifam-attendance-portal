import React, {useEffect, useState} from "react";
import { Table, Modal } from "antd";
import { getAttendanceByParticipantId } from "@/service/back-end/attendance";

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


const prepareAttendanceData = (data) => {
  return data.map((attendance) => {
    const event = attendance.event;
    return {
      event: event?.eventName,
      date: event?.eventDate,
    };
  });
};


export default function AttendanceModal({
  open,
  onCancel,
  onOk,
  participantId
}) {
  const [attendanceData, setAttendanceData] = useState([]);
  // console.log("participantId: ", participantId);
  useEffect(() => {
    getAttendanceByParticipantId(participantId).then((data) => {
      // console.log("data from backend", data);
      data = prepareAttendanceData(data);
      setAttendanceData(data);
      
    });
    
  }, [participantId]);
  console.log("attendanceData: ", attendanceData);

  return (
    <Modal title="Attendance for " open={open} onCancel={onCancel} onOk={onOk}>
      <Table columns={attendanceInfo} dataSource={attendanceData} />
    </Modal>
  );
}
