// TODO: refactor so both create and edit use the same component


import React, { useEffect } from "react";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const storage = getStorage();

function CreateEventComponent({ afterSave, editMode = false, eventData = {} }) {
  console.log("CreateEventComponent", { afterSave, editMode, eventData });
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("CreateEventComponent useEffect", { editMode, eventData });
    if (editMode && eventData.eventFlyer?.length > 0) {
      // Assume eventData.eventFlyer is an array of filenames
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
    } else {
      form.setFieldsValue(eventData);
    }
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
      eventFlyer: values.eventFlyer.map((f) => f.name),
    }; // Save filenames or URLs
    try {
      await addDoc(collection(db, "events"), eventDataToSave);
      message.success("Event Created Successfully!");
      afterSave?.();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Error creating event. Contact Admin for support.");
    }
  };

  return (
    <div>
      <Form form={form} onFinish={handleSave} initialValues={eventData}>
        <Form.Item name="eventName" label="Event Name">
          <Input placeholder="Enter the event name" />
        </Form.Item>
        <Form.Item name="eventLocation" label="Event Location">
          <Input placeholder="Enter the event location" />
        </Form.Item>
        <Form.Item name="eventDetails" label="Event Details">
          <TextArea rows={4} placeholder="Describe the event details" />
        </Form.Item>
        {/* <Form.Item label="Event Time" name="eventTime">
          <TimePicker
            value={formData.eventTime}
            // onChange={(time) => handleDateTimeChange(time, "eventTime")}
          />
        </Form.Item>
        <Form.Item label="Event Date" name="eventDates">
          <RangePicker
            value={formData.eventDates}
            // onChange={(dates) => handleDateTimeChange(dates, "eventDates")}
          />
        </Form.Item> */}
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
            Save Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateEventComponent;
