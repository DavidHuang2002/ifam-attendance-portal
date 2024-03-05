"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { getDocs,getDoc} from 'firebase/firestore';
import { collection,doc, updateDoc } from 'firebase/firestore';
import { Form, Input, Button, TimePicker, DatePicker, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
//const eventId = "qU620FfHZHOUZdTAm5jZ";
function EditEventComponent( { eventId = "aQr01EY0GjA3kkbFOdA3" }) {
  const [formData, setFormData] = useState({
    eventName: '',
    eventLocation: '',
    eventDetails: '',
    eventTime: null,
    eventDates: [],
    eventFlyer: '',
    
  });
  const [fileList, setFileList] = useState([]);
  // Fetch the event data when the component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const eventTimeForPicker = data.eventTime ? moment(data.eventTime, "HH:mm:ss") : null;
        //const eventTimeForPicker=null;
        //Convert Firestore Timestamps to JavaScript Date objects for UI components
       // const eventTime = data.eventTime ? new Date(data.eventTime.seconds * 1000) : null;
       const eventDatesForPicker = data.eventDates.map(date => moment(date, "YYYY-MM-DD"));
       if (data.eventFlyer) {
        setFileList([
          {
            uid: '-1', // You can use a unique identifier here
            name: data.eventFlyer,
            status: 'done',
            url: `Your Firebase Storage Path/public/EventFlyer/${data.eventFlyer}`, // Construct URL if needed
          },
        ]);
      }
       
       setFormData({
          eventName: data.eventName,
          eventLocation: data.eventLocation,
          eventDetails: data.eventDetails,
          eventTime:eventTimeForPicker,
          eventDates:eventDatesForPicker,
          eventFlyer: data.eventFlyer,
          
        });
      } else {
        console.log("No such document!");
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    const storageRef = ref(storage, `public/EventFlyer/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      // Here you could set the downloadURL or the file name to the state
      // For simplicity, we'll just use the file name
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventFlyer: file.name,
      }));
      onSuccess(null, file);
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error);
      message.error(`Upload failed for ${file.name}`);
    }
  };

  const handleTimeChange = (time) => {
    const timeValue = time.map(date => date.toISOString());
      setFormData({
        ...formData,
        eventTime: timeValue, // Directly using the timeString provided by TimePicker onChange
      });
  };


  const handleDateChange = (dates) => {
    const formattedDates = dates.map(date => date.toISOString());
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
        eventTime: formData.eventTime ? Timestamp.fromDate(new Date(formData.eventTime)) : null,
        eventDates: formData.eventDates.map(date => Timestamp.fromDate(new Date(date))),
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
            onChange={(e) => handleChange(e, 'eventName')}
            placeholder="Enter the event name" 
          />
        </Form.Item>

        <Form.Item label="Event Location">
          <Input 
            value={formData.eventLocation}
            onChange={(e) => handleChange(e, 'eventLocation')}
            placeholder="Enter the event location" 
          />
        </Form.Item>

        <Form.Item label="Event Details">
          <TextArea 
            value={formData.eventDetails}
            onChange={(e) => handleChange(e, 'eventDetails')}
            rows={4} 
            placeholder="Describe the event details" 
          />
        </Form.Item>

        <Form.Item label="Event Time">
        <TimePicker
                value={formData.eventTime ? moment(formData.eventTime, "HH:mm:ss") : null}
                onChange={handleTimeChange}
                format="HH:mm:ss"
              />

        </Form.Item>
        <Form.Item label="Upload Flyer" name="eventFlyer">
        <Upload
    listType="picture-card"
    customRequest={handleFileUpload}
    showUploadList={true}
  >
    {!formData.eventFlyer || formData.eventFlyer.length === 0 ? (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    ) :null}
  </Upload>
        </Form.Item>
        <Form.Item label="Event Date">
        <RangePicker
        value={formData.eventDates.length ? formData.eventDates : null}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
      />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">Save Event</Button>
        </Form.Item>
</Form>

    </div>
  );
}

export default EditEventComponent;
