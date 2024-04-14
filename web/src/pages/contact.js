import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import styled from 'styled-components';

import { NavBar } from '@/components/mainPage/NavBar';
import { Head } from 'next/document';

const { Title } = Typography;

// formatting components on the page
const Wrapper = styled.div`
  width: 100%;
`;

const HeadingSection = styled.section`
    background: white;
`;

const PageHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 6rem;
`;

const FormSection = styled.section`
  paddingTop: 20px;
  maxWidth: 600;
  margin: 20px;
`;

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
      
      // Formatted message for the second emai

      const userNotificationData = {
        user_subject:"IFAM-PORTAL - Acknowledgment of Contact Form Submission.",
        user_email: values.user_email, // Correctly passing the user's email to 'user_email'
        message1:`We wish to inform you that your email has been successfully received.`, // Assuming the template uses 'message_html' for HTML content
        message2:`Rest assured, we will provide a response at the earliest opportunity.`,
        message3:`We appreciate your patience and cooperation.`,
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
  <Wrapper>
    <NavBar />
    <PageHeading>Contact Us</PageHeading>
    <div style={{ paddingTop: '20px', maxWidth: 600, margin: '20px auto' }}>
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
          <Button type="primary" htmlType="submit" style={{background: "#DDA722"}}>
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
    </Wrapper>
  );
};

export default ContactForm;
