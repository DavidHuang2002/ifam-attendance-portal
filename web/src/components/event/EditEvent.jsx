// Component for editing an event. It fetches the event data from Firestore and initializes the form with the data.
// It also handles form submission to update the event data in Firestore.
// In next iteration, we plan to extract the data based related logic into API services

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  DatePicker,
  TimePicker,
  Select,
  Checkbox,
  Row,
  Col
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from 'moment';

const { TextArea } = Input;
const storage = getStorage();

function EditEventComponent({ afterSave, editMode = false, eventData = {} }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editMode) {
      const flyers = eventData.eventFlyer?.map(flyer => ({
        uid: flyer,
        name: flyer,
        status: 'done',
        url: flyer // Assuming URL is stored directly; replace logic if needed to fetch URLs
      })) || [];

      form.setFieldsValue({
        ...eventData,
        eventFlyer: flyers,
        eventTime: eventData.eventTime ? moment(eventData.eventTime) : null,
        startTime: eventData.startTime ? moment(eventData.startTime, "HH:mm A") : moment().startOf('day'),
        endTime: eventData.endTime ? moment(eventData.endTime, "HH:mm A") : moment().endOf('day'),
        eventDate: eventData.eventDate ? moment(eventData.eventDate) : moment()
      });
    }
  }, [editMode, eventData, form]);

  const handleFileChange = async ({ file, onSuccess, onError }) => {
    const storagePath = `public/EventFlyer/${file.name}`;
    const fileRef = ref(storage, storagePath);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      onSuccess(null, {
        ...file,
        url: downloadURL,
        status: "done",
        uid: file.name
      });
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error("Error uploading file: ", error);
      onError(error);
      message.error(`Upload failed for ${file.name}`);
    }
  };

  const handleSave = async (values) => {
    const eventDataToSave = {
      ...values,
      eventTime: values.eventTime ? values.eventTime.toISOString() : null,
      eventFlyer: values.eventFlyer.map(flyer => flyer.name || flyer.uid),
      startTime: values.startTime ? values.startTime.format("HH:mm A") : null,
      endTime: values.endTime ? values.endTime.format("HH:mm A") : null,
      eventDate: values.eventDate ? values.eventDate.format("YYYY-MM-DD") : null
    };

    if (editMode && eventData.eventId) {
      const eventRef = doc(db, "events", eventData.eventId);
      await updateDoc(eventRef, eventDataToSave);
      message.success("Event Updated Successfully!");
    } else {
      await addDoc(collection(db, "events"), eventDataToSave);
      message.success("Event Created Successfully!");
    }

    afterSave?.();
  };

  return (
    <div>
      <Form form={form} onFinish={handleSave}>
        <Form.Item name="eventName" label="Event Name" rules={[{ required: true, message: "Please input the event name!" }]}>
          <Input placeholder="Enter the event name" />
        </Form.Item>
        <Form.Item name="eventLocation" label="Event Location" rules={[{ required: true, message: "Please input the event location!" }]}>
          <Input placeholder="Enter the event location" />
        </Form.Item>
        <Form.Item name="eventCategory" label="Event Category">
          <Select placeholder="Select a category">
            {["Weekly", "Special", "Monthly"].map(category => (
              <Select.Option key={category} value={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="eventPublished" label="Event Published" valuePropName="checked">
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item name="eventDetails" label="Event Details">
          <TextArea rows={4} placeholder="Describe the event details" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="startTime" label="Start Time">
              <TimePicker use12Hours format="HH:mm A" minuteStep={15} onChange={(time) => form.setFieldsValue({startTime: time})} onBlur={() => console.log('Start Time Changed:', form.getFieldValue('startTime'))} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endTime" label="End Time">
              <TimePicker use12Hours format="HH:mm A" minuteStep={15} onChange={(time) => form.setFieldsValue({endTime: time})} onBlur={() => console.log('End Time Changed:', form.getFieldValue('endTime'))} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="eventDate" label="Event Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="eventFlyer" label="Upload Flyer" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
          <Upload listType="picture-card" customRequest={handleFileChange} multiple={true}>
            <Button icon={<PlusOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? "Update Event" : "Create Event"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditEventComponent;
