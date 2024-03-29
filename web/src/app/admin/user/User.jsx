import React, { useState } from 'react';
import { Button, Form, Input, Upload, Select, Avatar, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; // Firestore imports
import { auth } from "@/firebase/config";
import emailjs from 'emailjs-com';
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};
const db = getFirestore(); 
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) message.error('You can only upload JPG/PNG files!');
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) message.error('Image must be smaller than 2MB!');
  return isJpgOrPng && isLt2M;
};

const Users = () => {
  const [form] = Form.useForm(); // Initialize form
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onFinish = async (values) => {
    const { email, password, Name: name, phone, Role: role } = values;

    // Check if the user already exists in Firestore
    const userRef = doc(db, "users", email);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      message.error('This email is already in use. Please login or reset your password if you forgot it.');
      return;
    }

    // Create user in Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await setDoc(userRef, { name, phone, role });

        emailjs.send('service_z6ftge9', 'template_qfyxrv3', {
          user_email: email,
          user_subject: "IFAM-PORTAL",
          message: `Hi ${name},<br/><br/>
          Your account has been successfully created. Here are your login details:<br/>
          <strong>Username:</strong> ${email}<br/>
          <strong>Password:</strong> ${password}<br/><br/>
          For your security, please ensure to change your password upon your first login.<br/><br/>
          Best regards,<br/>
          IFAM team`}, 'VYHdyH1a8DTcRyrEv')
        .then(() => {
          message.success('User created successfully and email sent.');
          form.resetFields(); // Reset form fields
          setImageUrl(''); // Clear avatar image
          setLoading(false); // Stop loading after successful creation and email sending
        })
        .catch((emailError) => {
          console.error('Failed to send email:', emailError);
          setLoading(false); // Stop loading on email error
          // Optionally, handle email sending failure
        });
      })
      .catch((error) => {
        setLoading(false); // Stop loading on auth error
        if (error.code === 'auth/email-already-in-use') {
          message.error('This email is already in use. Please login or reset your password if you forgot it.');
        } else {
          console.error("Error creating user:", error);
          message.error(`Registration failed: ${error.message}`);
        }
      });
  };
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+1</Option>
      </Select>
    </Form.Item>
  );

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form {...formItemLayout} name="register" onFinish={onFinish} scrollToFirstError>
    {/* Form Items including avatar upload and other fields */}
   {/* <Form.Item name="avatar" label="Avatar">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload" // Make sure this points to your actual file upload handling endpoint
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <Avatar src={imageUrl} size={64} alt="avatar" /> : uploadButton}
      </Upload>
    </Form.Item>*/}
      <Form.Item
        name="Name"
        label="Name"
        tooltip="User name?"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="Role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select the role">
          <Option value="admin">Administrator</Option>
          <Option value="attandance">Attandance</Option>
          <Option value="exprot">Export</Option>
          
        </Select>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
    </Form>
  );
};

const uploadButton = (loading) => (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default Users;
