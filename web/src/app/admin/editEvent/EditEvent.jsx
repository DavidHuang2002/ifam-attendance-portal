"use client";
import React, { useState, useEffect } from "react";
import { db, storage } from "@/firebase/config";
import { getDocs, getDoc } from "firebase/firestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
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
import moment from "moment";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
//const eventId = "qU620FfHZHOUZdTAm5jZ";
function EditEventComponent({ eventId = "wJwOXBukA7E0mn2CvBdn" }) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventLocation: "",
    eventDetails: "",
    eventTime: null,
    eventDates: [],
    eventFlyer: [],
  });
  const [fileList, setFileList] = useState([]);
  // Fetch the event data when the component mounts
  useEffect(() => {
    console.log("Fetching event data for event ID:", eventId);
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const eventTimeForPicker = data.eventTime
        ? moment(data.eventTime, "HH:mm:ss")
        : null;

      //Convert Firestore Timestamps to JavaScript Date objects for UI components
      // const eventTime = data.eventTime ? new Date(data.eventTime.seconds * 1000) : null;
      const eventDatesForPicker = data.eventDates
        ? data.eventDates.map((date) => moment(date, "YYYY-MM-DD"))
        : null;

      console.log("Fetched event data:", data);

      setFormData({
        eventName: data.eventName,
        eventLocation: data.eventLocation,
        eventDetails: data.eventDetails,
        eventTime: eventTimeForPicker,
        // the event date logic is broken
        // eventDates:eventDatesForPicker,
        // eventDates: data.eventDates,
        eventFlyer: data.eventFlyer || [],
      });

      const flyers = data.eventFlyer || [];
      const flyerFileList = await Promise.all(
        flyers.map(async (filename) => {
          console.log("Fetching download URL for:", filename);
          try {
            const flyerRef = ref(storage, `public/EventFlyer/${filename}`);
            const url = await getDownloadURL(flyerRef);
            return { uid: filename, name: filename, status: "done", url };
          } catch (error) {
            console.error("Error fetching download URL for:", filename, error);
            return null;
          }
        })
      );

      setFileList(flyerFileList.filter((f) => f)); // Update fileList excluding null values
    } else {
      console.log("No such document!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    // Use the original file name or create a unique name for every upload
    // const uniqueFileName = `${Date.now()}-${file.name}`;
    const uniqueFileName = file.name;
    const storageRef = ref(storage, `public/EventFlyer/${uniqueFileName}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Append the new file info to the existing fileList and formData
      const newFileListItem = {
        uid: uniqueFileName,
        name: uniqueFileName,
        status: "done",
        url: downloadURL,
      };
      setFileList((currentFileList) => [...currentFileList, newFileListItem]);

      // Also update formData.eventFlyer to include the new filename
      // This assumes formData.eventFlyer is an array
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventFlyer: [...prevFormData.eventFlyer, uniqueFileName],
      }));
      onSuccess(null, file);
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error("Error uploading file:", error);
      onError(error);
      message.error(`Upload failed for ${file.name}`);
    }
  };
  const handleTimeChange = (time) => {
    const timeValue = time.map((date) => date.toISOString());
    setFormData({
      ...formData,
      eventTime: timeValue, // Directly using the timeString provided by TimePicker onChange
    });
  };

  const handleDateChange = (dates) => {
    const formattedDates = dates.map((date) => date.toISOString());
    setFormData({
      ...formData,
      eventDates: formattedDates,
    });
  };

  const handleSave = async () => {
    // Ensure eventDates is an array, even if it's empty
    const updatedData = {
      ...formData,
      // Convert Date objects back to Firestore Timestamps
      eventTime: formData.eventTime
        ? Timestamp.fromDate(new Date(formData.eventTime))
        : null,
      eventDates: formData.eventDates.map((date) =>
        Timestamp.fromDate(new Date(date))
      ),
    };

    try {
      const docRef = doc(db, "events", eventId);
      await updateDoc(docRef, updatedData);
      console.log("Document successfully updated");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <Form onFinish={() => handleSave(formData)}>
        <Form.Item label="Event Name">
          <Input
            value={formData.eventName}
            onChange={(e) => handleChange(e, "eventName")}
            placeholder="Enter the event name"
          />
        </Form.Item>

        <Form.Item label="Event Location">
          <Input
            value={formData.eventLocation}
            onChange={(e) => handleChange(e, "eventLocation")}
            placeholder="Enter the event location"
          />
        </Form.Item>

        <Form.Item label="Event Details">
          <TextArea
            value={formData.eventDetails}
            onChange={(e) => handleChange(e, "eventDetails")}
            rows={4}
            placeholder="Describe the event details"
          />
        </Form.Item>

        <Form.Item label="Event Time">
          <TimePicker
            value={
              formData.eventTime ? moment(formData.eventTime, "HH:mm:ss") : null
            }
            onChange={handleTimeChange}
            format="HH:mm:ss"
          />
        </Form.Item>

        <Form.Item label="Event Date">
          <RangePicker
            value={
              // convert to moment object
              formData.eventDates?.length
                ? formData.eventDates.map((date) => moment(date, "YYYY-MM-DD"))
                : null
            }
            // value={formData.eventDates?.length ? formData.eventDates : null}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item label="Upload Flyer" name="eventFlyer">
          <Upload
            listType="picture-card"
            customRequest={handleFileUpload}
            showUploadList={true}
            fileList={fileList}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
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

export default EditEventComponent;
