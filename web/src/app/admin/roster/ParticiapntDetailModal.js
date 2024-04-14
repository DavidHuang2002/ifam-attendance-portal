import { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';
import EditInfo from '@/components/roster/EditInfo';
import { getAllParticipants } from '@/service/back-end/participant';

const participantInfo = [
  {
    title: "Class",
    dataIndex: "class",
    key: "class",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Interest",
    dataIndex: "interest",
    key: "interest",
    align: "center",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    align: "center",
  },
];

export default function ParticipantDetailModal({
  open,
  onCancel,
  // onoK,
  participantData,
}) {
  // console.log("WHAT IS THIS", participantData)
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    getAllParticipants().then((data) => {
    setData(data);
  }); }, []);
  

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditSave = () => {
    setEditModalVisible(false);
  };


  return (
    <>
    <Modal title="Info on " 
    open={open} 
    onCancel={onCancel}
    // onoK={onoK}
    footer={[
      <Button key="edit" onClick={showEditModal}>
        Edit
      </Button>
    ]}>
      {participantData ? (
        <Table columns={participantInfo} dataSource={[participantData]} />
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
    <EditInfo
    participant={participantData}
    visible={editModalVisible}
    onCancel={handleEditCancel}
    onSave={handleEditSave}
  />
  </>
  );
}