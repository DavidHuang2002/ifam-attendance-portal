"use client";
import React from "react";
import { Button, Form, Input, Select, Checkbox, message } from "antd";
import Link from "next/link";
import { getOldMemberAttendanceRoute } from "@/constants/front-end-routes";

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

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const handleSubmission = () => {
  message.success("Submitted");
  console.log("Submitted");
};

export default function Attendance({ params: { eventId } }) {
  const [form] = Form.useForm();
  const oldMemberAttendanceHref = getOldMemberAttendanceRoute(eventId);

  const onFinish = async (formValues) => {
    const { email } = formValues;

    try {
      await postAttednace(eventId, email);
      message.success("Submitted");
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit attendance");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 500,
          margin: "auto",
          textAlign: "center",
        }}
        validateMessages={validateMessages}
      >
        <h1>New Member Attendance</h1>
        <Link href={oldMemberAttendanceHref}>
          <Button type="primary">I'm a returning member</Button>
        </Link>
        <h2 style={{}}>Tell us about yourself!</h2>
        <Form.Item name={["user", "name"]} label="Name">
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
          <Button type="primary" htmlType="submit" onClick={handleSubmission}>
            <Link href={oldMemberAttendanceHref}> Submit </Link>
          </Button>
        </Form.Item>
        <Form.Item>
          <Link href="/admin">Return to Dashboard</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
