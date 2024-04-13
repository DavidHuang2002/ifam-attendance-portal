import { useState } from 'react';
import { Modal, Button } from 'antd';
import EditInfo from '@/components/roster/EditInfo';


export default function ParticipantDetailModal({
  open,
  onCancel,
  participantData,
}) {
  const selectedParticipant = participantData;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailData, setDetailData] = useState([]);

  const showEditModal = (selectedParticipant) => {
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
    <Modal
        title="Info on "
        open={open}
        onCancel={onCancel}
        footer={[
          <Button key="edit" onClick={showEditModal}>
            Edit
          </Button>
        ]}
      >
        <ul>
          <li>
            <strong>Email:</strong> {participantData.Email}
          </li>
          <li>
            <strong>Class:</strong> {participantData.Class}
          </li>
          <li>
            <strong>Interest:</strong> {participantData.Interest}
          </li>
          <li>
            <strong>Note:</strong> {participantData.Note}
          </li>
        </ul>
      </Modal>
      <EditInfo
        participant={selectedParticipant}
        visible={editModalVisible}
        onCancel={handleEditCancel}
        onSave={handleEditSave}
      />
    </>
  );
}