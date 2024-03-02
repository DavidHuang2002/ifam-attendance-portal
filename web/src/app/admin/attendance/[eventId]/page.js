"use client";
import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  AutoComplete,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";

const layout = {
  position: "absolute",
  marginTop: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  // labelCol: {
  //   span: 8,
  // },
  // wrapperCol: {
  //   span: 12,
  // },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    // number: "${label} is not a valid number!",
  },
  // number: {
  // range: "${label} must be between ${min} and ${max}",
  // },
};
/* eslint-enable no-template-curly-in-string */

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
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        marginTop: '70px',
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
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
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
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
      {/* <br /> */}
      <Checkbox onChange={onChange}>Nashville xxx Community</Checkbox>
      {/* <br /> */}
      <Checkbox onChange={onChange}>Program c</Checkbox>
      {/* <br />
      <br /> */}
      </Form.Item>
      {/* <Form.Item name={["user", "website"]} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Introduction">
        <Input.TextArea />
      </Form.Item> */}
      <Form.Item
      // wrapperCol={{
      //   ...layout.wrapperCol,
      //   offset: 8,
      // }}
      >
        <Button type="primary" htmlType="submit">
          <Link href="/admin">Submit</Link>
        </Button>
      </Form.Item>
    </Form>
  );
}
// export default App;
