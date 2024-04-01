import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import ParticipantTable from "./AttendedParticipantTable";
import { get_event_record_route } from "@/constants/api-endpoints";

export default function EventAttendanceModal({ eventId, open, setOpen }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("running fetchAttendance", eventId)

    // setLoading(true);
    fetchAttendance(eventId).then((data) => {
      console.log("fetchAttendance", data)
      setData(data);
      // setLoading(false);
    });

    return () => {
      setData([]);
    };
  }, [eventId]);

  const fetchAttendance = async (eventId) => {
    const response = await fetch(get_event_record_route(eventId));
    const data = await response.json();
    return data;
  };

  return (
    <Modal
      title="Event Attendance"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <ParticipantTable data={data} />
    </Modal>
  );
}
