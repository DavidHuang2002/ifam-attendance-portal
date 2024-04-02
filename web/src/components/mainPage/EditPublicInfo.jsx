// Component for editing the public information on the landing page. It fetches all info from Firestore and initializes the form with the data.


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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // Added for handling date and time conversion

const { TextArea } = Input;

function EditPublicInfo () {
    return (
        <div>
          <Form
          style={{
          maxWidth: 600,
          margin: "auto",
          textAlign: "center",
        }}>
          <Form.Item name="name" label="Organization Name">
            <Input />
            </Form.Item>
          <Form.Item name="description" label="Organization Description">
              <TextArea rows={4} placeholder="Include a short desctiption of the organization" />
            </Form.Item>
            <Form.Item name="contactInto" label="Contact Information">
              <TextArea rows={4} placeholder="Include contact information" />
            </Form.Item>
            <Form.Item
              name="pagePics"
              label="Upload Pictures for Landing Page"
              /*valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}*/
            >
              <Upload
                listType="picture-card"
              >
                <Button icon={<PlusOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit"> Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
}

export default EditPublicInfo