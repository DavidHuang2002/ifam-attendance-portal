import { useState, useEffect } from 'react';
import { Modal, Button, Table, Tag } from 'antd';
import EditInfo from '@/components/roster/EditInfo';
import { getAllParticipants } from '@/service/back-end/participant';
import { render } from '@testing-library/react';

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
    dataIndex: "interests",
    key: "interests",
    align: "center",
    // the render function render the interests list as a list of Tags
    // render the tags in a vertical row
    render: (interests) => {
      return (
        <div>
          {interests?.map((interest) => (
            <Tag key={interest} color="blue">
              {interest}
            </Tag>
          ))}
        </div>
      );
    }
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    align: "center",
    // make sure the note section is not too small by having min width
    render: (note) => {
      return <div style={{ minWidth: "200px" }}>{note}</div>;
    }
  },
];

export default function ParticipantDetailModal({
  open,
  onCancel,
  participantData,
  onEditSave,
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditSave = () => {
    setEditModalVisible(false);
    onEditSave();
  };


  return (
    <>
    <Modal title="Info on " 
    open={open} 
    onCancel={onCancel}
    width={1000}
    footer={[
      <Button key="edit" onClick={showEditModal}>
        Edit
      </Button>
    ]}>
      {participantData ? (
        <Table columns={participantInfo} dataSource={[participantData]} size='large'/>
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