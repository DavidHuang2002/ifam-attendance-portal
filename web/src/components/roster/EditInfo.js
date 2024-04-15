import React, { useState, useEffect} from "react";
import { Button, Input, Modal, Form, Checkbox, Select} from "antd"
import { updateParticipantDetails } from "@/service/back-end/participant";
import { PROGRAM_OPTIONS } from "@/constants/participant";
import { getGraduationYear } from "@/utils/dateUtils";

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
        open={visible}
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
          <Form.Item name={"class"} label="Class">
            <Select
              showSearch
              placeholder="Select your grade"
              options={[
                {
                  value: getGraduationYear("Undergraduate Freshman"),
                  label: "Undergraduate Freshman",
                },
                {
                  value: getGraduationYear("Undergraduate Sophomore"),
                  label: "Undergraduate Sophomore",
                },
                {
                  value: getGraduationYear("Undergraduate Junior"),
                  label: "Undergraduate Junior",
                },
                {
                  value: getGraduationYear("Undergraduate Senior"),
                  label: "Undergraduate Senior",
                },
                {
                  value: getGraduationYear("Graduate"),
                  label: "Graduate",
                },
              ]}
            />
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