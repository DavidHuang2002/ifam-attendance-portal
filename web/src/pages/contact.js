import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import emailjs from 'emailjs-com';

const { Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const ContactForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    emailjs.send('service_z6ftge9', 'template_skqdme9', values, 'VYHdyH1a8DTcRyrEv')
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        // Optionally, handle successful form submission (e.g., showing a success message)
      }, error => {
        console.log('FAILED...', error.text);
        // Optionally, handle form submission error (e.g., showing an error message)
      });
  };

  return (
    <div style={{ paddingTop: '20px', maxWidth: 600, margin: '20px auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Contact Us</Title>
      <Form
        {...layout}
        name="contact-form"
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off"
      >
        <Form.Item
          name="user_name"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user_email"
          label="Email"
          rules={[{ type: 'email', required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user_subject"
          label="Subject"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
