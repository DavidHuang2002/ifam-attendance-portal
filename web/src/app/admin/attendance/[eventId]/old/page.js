"use client";
import React from "react";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { getNewMemberAttendanceRoute } from "@/constants/front-end-routes";

const layout = {
  position: "absolute",
  top: 100,
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

const handleSubmission = () => {
  message.success("Submitted");
  console.log("Submitted");
};

export default function Attendance({ params: { eventId } }) {
  const newMemberAttendanceHref = getNewMemberAttendanceRoute(eventId);
  console.log("eventId", eventId);
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
        <h1>Returning Member Attendance</h1>
        <Link href={newMemberAttendanceHref}>
          <Button type="primary">I'm a new member</Button>
        </Link>
        <h2>Record your attendance</h2>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmission}>
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Link href="/admin">Return to Dashboard</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
