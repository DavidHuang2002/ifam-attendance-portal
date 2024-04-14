import React, { useState } from "react";
import { Button, Input, Modal, Form } from "antd"
import { updateParticipantDetails } from "@/service/back-end/participant";

export default function EditInfo({ participant, visible, onCancel, onSave}) {
    const [form] = Form.useForm();
    const [editedParticipant, setEditedParticipant] = useState({ ...participant });

    const handleFormChange = (changedValues, allValues) => {
        setEditedParticipant({ ...editedParticipant, ...changedValues });
      };

    const handleSave = () => {
        form.validateFields().then((values) => {
            // console.log("OG participant", participant)
            const updatedParticipant = { ...editedParticipant, ...values };
            // console.log("Edited Participant", editedParticipant)
            onSave(updatedParticipant);
            updateParticipantDetails(updatedParticipant);
            // console.log("Saved Statements: ", updatedParticipant)
          });
    };
  
    return (
      <Modal
      title="Edit Participant Details"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} initialValues={participant} layout="vertical"
      onValuesChange={handleFormChange}>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: false }]}
        >
          <Input placeholder="Edit Email" />
        </Form.Item>
        <Form.Item
          label="Class"
          name="Class"
          rules={[{ required: false }]}
        >
          <Input placeholder="Edit Class" />
        </Form.Item>
        <Form.Item
          label="Interest"
          name="Interest"
          rules={[{ required: false }]}
        >
          <Input placeholder="Edit Interest" />
        </Form.Item>
        <Form.Item
          label="Note"
          name="Note"
          rules={[{ required: false }]}
        >
          <Input.TextArea placeholder="Edit Note" />
        </Form.Item>
      </Form>
      </Modal>
    );
};