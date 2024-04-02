// Component for editing an event. It fetches the event data from Firestore and initializes the form with the data.
// It also handles form submission to update the event data in Firestore.
// In next iteration, we plan to extract the data based related logic into API services

import React, { useEffect } from "react";
import { db } from "@/firebase/config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"; // Added updateDoc for editing functionality
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  DatePicker,
  TimePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // Added for handling date and time conversion
import { EventTimePicker } from "./EventTimePicker";

const { TextArea } = Input;
const storage = getStorage();
const { RangePicker } = DatePicker;

function CreateEventComponent({ afterSave, editMode = false, eventData = {} }) {
  console.log("CreateEventComponent", { afterSave, editMode, eventData });
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("CreateEventComponent useEffect", { editMode, eventData });
    if (editMode && eventData.eventFlyer?.length > 0) {
      const loadFlyers = async (eventFlyers) => {
        const flyerFileList = await Promise.all(
          eventFlyers.map(async (eventFlyer) => {
            const { filename } = eventFlyer;
            try {
              const flyerRef = ref(storage, `public/EventFlyer/${filename}`);
              const url = await getDownloadURL(flyerRef);
              return { uid: filename, name: filename, status: "done", url };
            } catch (error) {
              console.error(
                "Error fetching download URL for:",
                filename,
                error
              );
              return null;
            }
          })
        );

        const loadedFlyers = flyerFileList.filter((file) => file !== null);
        console.log("Loaded flyers:", loadedFlyers);

        form.setFieldsValue({ eventFlyer: loadedFlyers });
      };

      loadFlyers(eventData.eventFlyer);
    }
    form.setFieldsValue({
      ...eventData,
      eventFlyer: [],
      eventTime: eventData.eventTime ? dayjs(eventData.eventTime) : null,
      eventDates: eventData.eventDates
        ? eventData.eventDates.map((date) => dayjs(date))
        : [],
    });

    console.log("Form values set:", form.getFieldsValue());
    // print ou the form's eventTime value in readable format
    // console.log("eventTime: ", form.getFieldValue("eventTime").format("HH:mm"));
  }, [editMode, eventData, form]);

  const handleFileChange = async (options) => {
    const { file, onSuccess, onError } = options;
    const storagePath = `public/EventFlyer/${file.name}`;
    const fileRef = ref(storage, storagePath);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      onSuccess(null, {
        ...file,
        url: downloadURL,
        status: "done",
        uid: file.uid,
      }); // Mark file as uploaded successfully
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
      eventDates: values.eventDates
        ? values.eventDates.map((date) => date.toISOString())
        : [],
      eventFlyer: values.eventFlyer.map((f) => f.name),
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
        <Form.Item name="eventName" label="Event Name">
          <Input placeholder="Enter the event name" />
        </Form.Item>
        <Form.Item name="eventLocation" label="Event Location">
          <Input placeholder="Enter the event location" />
        </Form.Item>
        <Form.Item name="eventDetails" label="Event Details">
          <TextArea rows={4} placeholder="Describe the event details" />
        </Form.Item>
        <Form.Item name="eventTime" label="Event Time">
          {/* <EventTimePicker
            onChange={() => {
              console.log("Event Time Changed");
              console.log(form.getFieldValue("eventTime"));
            }}
          /> */}
          <EventTimePicker />
        </Form.Item>
        <Form.Item name="eventDates" label="Event Dates">
          <RangePicker />
        </Form.Item>
        <Form.Item
          name="eventFlyer"
          label="Upload Flyer"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload
            listType="picture-card"
            customRequest={handleFileChange}
            multiple={true}
            onPreview={async (file) => {
              let src = file.url;
              if (!src) {
                src = await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file.originFileObj);
                  reader.onload = () => resolve(reader.result);
                });
              }
              const image = new Image();
              image.src = src;
              const imgWindow = window.open(src);
              imgWindow?.document.write(image.outerHTML);
            }}
          >
            {form.getFieldValue("eventFlyer") &&
            form.getFieldValue("eventFlyer").length >= 8 ? null : (
              <Button icon={<PlusOutlined />}>Upload</Button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? "Update Event" : "Save Event"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateEventComponent;
