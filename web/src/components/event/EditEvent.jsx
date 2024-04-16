import React, { useEffect } from "react";
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
import dayjs from 'dayjs';

const { TextArea } = Input;
const storage = getStorage();

function EditEventComponent({ afterSave, editMode = false, eventData = {} }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editMode) {
      const flyers = eventData.eventFlyer?.map(flyer => ({
        uid: flyer,
        name: "Uploaded Flyer", // Assuming placeholder text for flyer names
        status: 'done',
        url: flyer
      })) || [];

      form.setFieldsValue({
        ...eventData,
        eventFlyer: flyers,
        startTime: eventData.startTime ? dayjs(eventData.startTime, "HH:mm A") : null,
        endTime: eventData.endTime ? dayjs(eventData.endTime, "HH:mm A") : null,
        eventDate: eventData.eventDate ? dayjs(eventData.eventDate) : null
      });
    }
  }, [editMode, eventData, form]);

  const handleFileChange = async ({ file, onSuccess, onError }) => {
    const storagePath = `public/EventFlyer/${file.name}`;
    const fileRef = ref(storage, storagePath);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      onSuccess(null, { ...file, url: downloadURL, status: "done", uid: file.name });
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      onError(error);
      message.error(`Upload failed for ${file.name}`);
    }
  };

  const handleTimeChange = (time, fieldName) => {
    // This function ensures the time is set immediately in the form state
    form.setFieldsValue({
      [fieldName]: time
    });
  };

  const handleSave = async (values) => {
    const eventDataToSave = {
      ...values,
      eventFlyer: values.eventFlyer.map(flyer => flyer.url || flyer.name),
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
      <Form form={form} onFinish={handleSave} layout="vertical">
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
          <Checkbox />
        </Form.Item>
        <Form.Item name="eventDetails" label="Event Details">
          <TextArea rows={4} placeholder="Describe the event details" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="startTime" label="Start Time">
              <TimePicker 
                use12Hours 
                format="h:mm a" 
                minuteStep={15} 
                value={form.getFieldValue('startTime')} 
                onChange={(time) => handleTimeChange(time, 'startTime')} 
                changeOnBlur
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endTime" label="End Time">
              <TimePicker 
                use12Hours 
                format="h:mm a" 
                minuteStep={15} 
                value={form.getFieldValue('endTime')} 
                onChange={(time) => handleTimeChange(time, 'endTime')} 
                changeOnBlur
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="eventDate" label="Event Date">
          <DatePicker onChange={(date) => form.setFieldsValue({ eventDate: date })} />
        </Form.Item>
        <Form.Item name="eventFlyer" label="Upload Flyer" valuePropName="fileList" getValueFromEvent={e => e && e.fileList}>
          <Upload listType="picture-card" customRequest={handleFileChange} multiple={true}>
            <div><PlusOutlined /> Upload</div>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {editMode ? "Update Event" : "Create Event"}
        </Button>
      </Form>
    </div>
  );
}

export default EditEventComponent;
