import React, { useState } from "react";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Fixed imports
import {
  Form,
  Input,
  Button,
  TimePicker,
  DatePicker,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const storage = getStorage();

function CreateEventComponent({afterSave}) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventLocation: "",
    eventDetails: "",
    eventTime: null,
    eventDates: [],
    eventFlyer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateTimeChange = (value, name) => {
    if (name === "eventTime") {
      // For TimePicker, convert the moment object to a suitable format (e.g., ISO string)
      const timeValue = value ? value.toISOString() : null;
      setFormData({ ...formData, [name]: timeValue });
    } else {
      // For RangePicker, convert the moment array to an array of ISO strings
      const datesValue = value ? value.map((date) => date.toISOString()) : [];
      setFormData({ ...formData, [name]: datesValue });
    }
  };

  const handleFileChange = async ({ file, onSuccess, onError }) => {
    const storagePath = `public/EventFlyer/${file.name}`;
    const fileRef = ref(storage, storagePath);

    try {
      await uploadBytes(fileRef, file);
      // Optionally, get the download URL
      const downloadURL = await getDownloadURL(fileRef);
      // Append new file name or download URL to the eventFlyer array
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventFlyer: [...prevFormData.eventFlyer, file.name], // or downloadURL if you prefer
      }));
      onSuccess("ok");
      message.success(`${file.name} uploaded successfully`); // Show success message
    } catch (error) {
      console.error("Error uploading file: ", error);
      onError(error);
      //message.error(`Upload failed for ${file.name}`); // Show error message
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSave = async () => {
    console.log(db);
    const messagesRef = collection(db, "events");
    try {
      await addDoc(messagesRef, formData);
      message.success("Event Created Successfully!");
      console.log("Document written");
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error creating event. Contact Admin for support.");
    }

    if (afterSave) {
      afterSave();
    }
  };

  return (
    <div>
      <Form onFinish={handleSave}>
        <Form.Item label="Event Name" name="eventName">
          <Input
            name="eventName"
            onChange={handleChange}
            placeholder="Enter the event name"
          />
        </Form.Item>
        <Form.Item label="Event Location" name="eventLocation">
          <Input
            name="eventLocation"
            onChange={handleChange}
            placeholder="Enter the event location"
          />
        </Form.Item>
        <Form.Item label="Event Details" name="eventDetails">
          <TextArea
            rows={4}
            name="eventDetails"
            onChange={handleChange}
            placeholder="Describe the event details"
          />
        </Form.Item>
        <Form.Item label="Event Time" name="eventTime">
          <TimePicker
            onChange={(time) => handleDateTimeChange(time, "eventTime")}
          />
        </Form.Item>
        <Form.Item label="Event Date" name="eventDates">
          <RangePicker
            onChange={(dates) => handleDateTimeChange(dates, "eventDates")}
          />
        </Form.Item>
        <Form.Item
          label="Upload Flyer"
          name="eventFlyer"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            customRequest={handleFileChange}
            multiple={true} // Allow multiple files
            showUploadList={true} // Show the list of files
          >
            <Button icon={<PlusOutlined />}>Upload Flyer</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateEventComponent;
