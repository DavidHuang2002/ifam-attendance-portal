import React, { useState } from "react";
import { Button, Input, Modal, Form } from "antd"

export default function EditInfo({ participant, visible, onCancel, onSave}) {
    const [form] = Form.useForm();
    const [editedParticipant, setEditedParticipant] = useState({ ...participant });

    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave({ ...editedParticipant, ...values });
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
      <Form form={form} initialValues={participant} layout="vertical">
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