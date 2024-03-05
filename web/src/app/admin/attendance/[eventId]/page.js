"use client";
import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Checkbox,
} from "antd";
import Link from "next/link";

const layout = {
  position: "absolute",
  marginTop: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const onFinish = (values) => {
  console.log(values);
};

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function Attendance() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 500,
          margin: 'auto',
          textAlign: "center",
        }}
      validateMessages={validateMessages}
    >
      <h1>New Member Attendance</h1>
      <Link href="/admin/attendance/old">
        <Button type="primary">
          I'm a returning member
        </Button>
      </Link>
      <h2 style={{}}>Tell us about yourself!</h2>
      <Form.Item
        name={["user", "name"]}
        label="Name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["user", "grade"]} label="Grade">
        <Select
          showSearch
          placeholder="Select your grade"
          optionFilterProp="grade"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "Undergraduate Freshman",
              label: "Undergraduate Freshman",
            },
            {
              value: "Undergraduate Sophomore",
              label: "Undergraduate Sophomore",
            },
            {
              value: "Undergraduate Junior",
              label: "Undergraduate Junior",
            },
            {
              value: "Undergraduate Senior",
              label: "Undergraduate Senior",
            },
            {
              value: "Graduate",
              label: "Graduate",
            },
          ]}
        />
      </Form.Item>
      <Form.Item>
      <p>What I-Fam program are you interested in?</p>
      <Checkbox onChange={onChange}>I-FAM Vanderbilt</Checkbox>
      <Checkbox onChange={onChange}>Nashville xxx Community</Checkbox>
      <Checkbox onChange={onChange}>Program c</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          <Link href="/admin/attendance/old">
            Submit
          </Link>
        </Button>
      </Form.Item>
      <Form.Item>
      <Link href= "/admin">
          Return to Dashboard
        </Link>
      </Form.Item>
    </Form>
    </div>
  );
}
