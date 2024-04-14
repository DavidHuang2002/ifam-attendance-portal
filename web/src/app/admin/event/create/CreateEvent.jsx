import React, { useState } from "react";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Form,
  Input,
  Button,
  Select,
  TimePicker,
  DatePicker,
  Upload,
  Checkbox,
  message,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from 'moment-timezone';

const { TextArea } = Input;
const storage = getStorage();

function CreateEventComponent({ afterSave }) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventLocation: "",
    eventDetails: "",
    startTime: moment().startOf('day').format("h:mm:ss A"), // Default start of the day
    endTime: moment().endOf('day').format("h:mm:ss A"), // Default end of the day
    eventDate: moment().format("YYYY-MM-DD"), // Today's date by default
    eventFlyer: [],
    eventCategory: "",
    eventPublished: false,
  });

  const handleChange = (name, value) => {
    setFormData(prev => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "eventPublished" && !value) {
        updatedForm.someOtherField = false; // Adjust according to your needs
      }

      return updatedForm;
    });
  };

  const handleTimeChange = (time, type) => {
    if (!time) {
        handleChange(type, null);
        return;
    }

    // Convert the moment object to a JavaScript Date object
    const date = time.toDate(); // This ensures you're working with a standard Date object

    // Format the Date object back to a time string using moment
    const formattedTime = moment(date).format("h:mm:ss A");

    // Update the state with the new time
    handleChange(type, formattedTime);
  };

  const handleFileChange = async ({ file, onSuccess, onError }) => {
    const storagePath = `public/EventFlyer/${file.name}`;
    const fileRef = ref(storage, storagePath);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      handleChange('eventFlyer', [...formData.eventFlyer, downloadURL]);
      onSuccess("ok");
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      onError(error);
      message.error(`Upload failed for ${file.name}`);
    }
  };

  const handleSave = async () => {
    const startTime = moment(formData.startTime, "h:mm:ss A");
    const endTime = moment(formData.endTime, "h:mm:ss A");

    if (!endTime.isAfter(startTime)) {
        message.error("Cannot save: End time must be later than start time.");
        return; // Stop the save operation
    }
    const messagesRef = collection(db, "events");
    try {
      await addDoc(messagesRef, formData);
      message.success("Event Created Successfully!");
      if (afterSave) afterSave();
    } catch (error) {
      console.error("Error adding document:", error);
      message.error("Error creating event. Contact Admin for support.");
    }
  };

  return (
    <div>
      <Form onFinish={handleSave}>
        <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: "Please input the event name!" }]}>
          <Input onChange={e => handleChange('eventName', e.target.value)} placeholder="Enter the event name" />
        </Form.Item>
        <Form.Item label="Event Location" name="eventLocation" rules={[{ required: true, message: "Please input the event location!" }]}>
          <Input onChange={e => handleChange('eventLocation', e.target.value)} placeholder="Enter the event location" />
        </Form.Item>
        <Form.Item label="Event Category" name="eventCategory">
          <Select onChange={value => handleChange('eventCategory', value)} placeholder="Select a category">
            {["Weekly", "Special", "Monthly"].map(category => (
              <Select.Option key={category} value={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>
         <Form.Item
            label="Event Published"
            name="eventPublished"
            valuePropName="checked" // This tells Form.Item to use 'checked' as the prop for the Checkbox
          >
            <Checkbox onChange={e => handleChange('eventPublished', e.target.checked)}>
              
            </Checkbox>
          </Form.Item>
        <Form.Item label="Event Details" name="eventDetails">
          <TextArea onChange={e => handleChange('eventDetails', e.target.value)} rows={4} placeholder="Describe the event details" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Start Time" name="startTime">
              <TimePicker onChange={time => handleTimeChange(time, 'startTime')} format="h:mm:ss A" use12Hours />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Time" name="endTime">
              <TimePicker onChange={time => handleTimeChange(time, 'endTime')} format="h:mm:ss A" use12Hours />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Event Date" name="eventDate">
          <DatePicker onChange={(date, dateString) => handleChange('eventDate', dateString)} />
        </Form.Item>
        <Form.Item label="Upload Flyer" name="eventFlyer" valuePropName="fileList" getValueFromEvent={e => e && e.fileList}>
          <Upload listType="picture-card" customRequest={handleFileChange} multiple={true} showUploadList={true}>
            <Button icon={<PlusOutlined />}>Upload Flyer</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Save Event</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateEventComponent;
