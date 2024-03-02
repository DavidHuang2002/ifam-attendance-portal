"use client";
import React from 'react';
import { LayoutSider } from '../../../components/dashBoard/LayoutSider';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
//Import the default flyer image
//import defaultFlyerImage from './Eventflyer/defaultFlyer.jpeg';
//import defaultFilePDF from './EventFile/defaultFile.pdf';

import moment from 'moment';
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
//const image = new Image();
//image.src = '/Eventflyer/defaultFlyer.jpeg';
const { RangePicker } = DatePicker;
const format = 'HH:mm';
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
const defaultFileList = [
   /* {
      uid: '-1', // Ensure unique IDs
      name: 'defaultFile.pdf',
      status: 'done',
      url: defaultFilePDF, // The public URL or path to the PDF file
    },*/
    {
      uid: '-1', // Ensure unique IDs
      name: 'defaultFlyer.jpg',
      status: 'done',
      url: '${process.env.PUBLIC_URL}/ifam-attendance-portal/web/public/defaultFlyer.jpeg', // The public URL or path to the image file
    },
  ];
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
export default function editevent(){

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
                 <h1>Modify Event</h1>
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
              <Input id="eventName" name="eventName"  defaultValue="Annual Conference"/>
            </Form.Item>
            
            <Form.Item label="Event Time" defaultValue={moment('13:30', 'HH:mm')}>
            <TimePicker defaultValue={dayjs('13:30', format)} format={format} />
            </Form.Item>
            <Form.Item label="Event Date" defaultValue={[moment('2023-01-01', 'YYYY-MM-DD'), moment('2023-01-07', 'YYYY-MM-DD')]}>
            <RangePicker
      defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
            </Form.Item>
            <Form.Item label="Event Location">
              <Input id="eventName" name="eventName"  defaultValue="The BCM building is located across the street from Branscomb at 2406 Vanderbilt PI, Nashville, TN 37212."/>
            </Form.Item>
            <Form.Item label="Event Details" >
              <TextArea rows={4} defaultValue="This is the annual conference where..."/>
            </Form.Item>
            <Form.Item label="Post Event" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Upload Flyer" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload action="/upload.do" defaultFileList={[...defaultFileList]} listType="picture-card">
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
    Save
  </Button>
</Form.Item>
          </Form>
        </Content>
      </Layout>
    </LayoutSider>
  );

}

