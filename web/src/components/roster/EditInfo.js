import React, { useState, useEffect} from "react";
import { Button, Input, Modal, Form, Checkbox } from "antd"
import { updateParticipantDetails } from "@/service/back-end/participant";
import { PROGRAM_OPTIONS } from "@/constants/participant";

export default function EditInfo({ participant, visible, onCancel, onSave}) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(participant);
      }
    , [participant, form]);


    const handleSave = () => {
        form.validateFields().then(async (values) => {
            // console.log("OG participant", participant)
            let updatedParticipant = {
                ...participant,
                ...values,
            };
            
            await updateParticipantDetails(updatedParticipant);
            // console.log("Saved Statements: ", updatedParticipant)
            onSave(updatedParticipant);
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
        <Form
          form={form}
          // we can't use initialValues because we are using form to edit many participants.
          // the initial values only work when the form is first created. but then if we close it and open it again,
          // the initial values are not set. So we have to use useEffect + setFieldsValue to set the initial values.
          // initialValues={participant}
          layout="vertical"
        >
          <Form.Item label="Email" name="email" rules={[{ required: false }]}>
            <Input placeholder="Edit Email" />
          </Form.Item>
          <Form.Item label="Class" name="class" rules={[{ required: false }]}>
            <Input placeholder="Edit Class" />
          </Form.Item>
          <Form.Item name={"interests"} label="Interests">
            <Checkbox.Group options={PROGRAM_OPTIONS} />
          </Form.Item>
          <Form.Item label="Note" name="note" rules={[{ required: false }]}>
            <Input.TextArea placeholder="Edit Note" />
          </Form.Item>
        </Form>
      </Modal>
    );
};