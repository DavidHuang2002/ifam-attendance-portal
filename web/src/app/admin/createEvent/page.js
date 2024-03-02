"use client";
import React from 'react';
//import firebase from '@/firebase';
import { LayoutSider } from '../../../components/dashBoard/LayoutSider';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  theme,
  TimePicker,
  Switch,
  Layout,
  Upload,
} from 'antd';
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
export default function createevent(){

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <LayoutSider>
      <Layout style={{ marginLeft: 180 }}>
        <Content
          style={{
            padding: 100,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%' }}>
                 <h1>Create Event</h1>
            </div>
          <Form
            labelAlign="left" // Align labels to the left
            labelCol={{
              span: 8, // Adjust the span to control the width of the label column
            }}
            wrapperCol={{
              span: 16, // Adjust the span to control the width of the wrapper column
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Event Name">
              <Input id="eventName" name="eventName"  placeholder="Enter the event name"/>
            </Form.Item>
            
            <Form.Item label="Event Time" placeholder="Select time">
              <TimePicker />
            </Form.Item>
            <Form.Item label="Event Date" placeholder={["Start Date", "End Date"]}>
              <RangePicker />
            </Form.Item>
            <Form.Item label="Event Location">
              <Input id="eventName" name="eventName"  placeholder="Enter the event Location"/>
            </Form.Item>
            <Form.Item label="Event Details" placeholder="Describe the event details">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Post Event" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Upload Flyer" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Upload Document">
  <Input
    addonAfter={
      <Upload name="file" listType="text" showUploadList={false}>
        <Button icon={<UploadOutlined />} size="small" />
      </Upload>
    }
    placeholder="No file chosen"
    disabled
  />
</Form.Item>
<Form.Item
  wrapperCol={{
    offset: 8, // Matches the label column span to push the content to the right
    span: 16, // Ensures the button spans the same width as the input fields
  }}
>
  <Button type="primary" block>
    Create
  </Button>
</Form.Item>
          </Form>
        </Content>
      </Layout>
    </LayoutSider>
  );

}
