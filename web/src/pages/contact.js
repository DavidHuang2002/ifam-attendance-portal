import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router'; // Import useRouter from next/router

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
  const router = useRouter(); // Create an instance of useRouter

  const onFinish = (values) => {
    console.log('Success:', values);
    
    // First email: Send the user's message to the intended recipient
    emailjs.send('service_z6ftge9', 'template_skqdme9', values, 'VYHdyH1a8DTcRyrEv')
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
      
      // Formatted message for the second email
      const formattedMessage = `Hi ${values.user_name},<br/><br/>
        We wish to inform you that your email has been successfully received.<br/>
        Rest assured, we will provide a response at the earliest opportunity.<br/><br/>
        We appreciate your patience and cooperation.<br/><br/>
        Best regards,<br/>
        IFAM team`;

      const userNotificationData = {
        user_email: values.user_email, // Correctly passing the user's email to 'user_email'
        message: formattedMessage, // Assuming the template uses 'message_html' for HTML content
      };

      // Second email: Send a notification to the user
      return emailjs.send('service_z6ftge9', 'template_qfyxrv3', userNotificationData, 'VYHdyH1a8DTcRyrEv');
    })
    .then(notificationResponse => {
      console.log('User notification email sent!', notificationResponse.status, notificationResponse.text);
      // After sending both emails, navigate to HomePage or show a success message
      router.push('/');
    })
    .catch(error => {
      console.log('FAILED...', error.text);
      // Handle errors
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
