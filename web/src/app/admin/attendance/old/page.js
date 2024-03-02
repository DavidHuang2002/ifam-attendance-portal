"use client";
import React from "react";
import { Button, Form, Input, InputNumber, Select, Checkbox, AutoComplete } from "antd";
import Link from 'next/link';

const layout = {
  position: 'absolute',
  top:100,
  left:0,
  right:0,
  bottom:0,
  overflow: 'hidden'
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


export default function Attendance() {
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 500,
        marginTop: '250px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
      }}
      validateMessages={validateMessages}
    >
      
      <h1>Returning Member Attendance</h1>
      <Link href="/admin/attendance/page">
        <Button type="primary">
          I'm a returning member
          </Button>
        </Link>
      {/* <Button type="default" htmlType="returningmember">
          I'm a new member
      </Button> */}
      <h2>Record your attendance</h2>
      { <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item> }
      {/* <Form.Item
        name={["user", "grade"]}
        label="Grade"
      >
        </Form.Item> */}
      <Form.Item>
      <Button type="primary" htmlType="submit">
        <Link href="/admin">
          Submit
        </Link>
        </Button>
      </Form.Item>
    </Form>
  );
}
// export default App;
