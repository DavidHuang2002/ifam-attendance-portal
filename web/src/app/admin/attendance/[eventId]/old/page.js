"use client";
import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import Link from "next/link";
import { getNewMemberAttendanceRoute } from "@/constants/front-end-routes";
import { postAttednace } from "@/constants/api-endpoints";
import { useRouter } from "next/navigation";
const { confirm } = Modal;

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

const handleSubmission = () => {
  console.log("Submitted");
};

export default function Attendance({ params: { eventId } }) {
  const [form] = Form.useForm();
  const newMemberAttendanceHref = getNewMemberAttendanceRoute(eventId);
  const router = useRouter();

  const showGoToNewMemberPageConfirm = () => {
    confirm({
      title: "New member?",
      content:
        "You are not registered yet. Go to the new member page to register",
      onOk() {
        router.push(newMemberAttendanceHref);
      },
    });
  };

  const onFinish = async (formValues) => {
    const { email } = formValues;

    try {
      const res = await postAttednace(eventId, email);
      if (res.status == 200) {
        message.success("Submitted");
        form.resetFields();
      } else if (res.status == 404) {
        showGoToNewMemberPageConfirm();
      }
    } catch (error) {
      message.error("Failed to submit attendance");
    }
  };
  // console.log("eventId", eventId);
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
        <h1>Returning Member Attendance</h1>
        <Link href={newMemberAttendanceHref}>
          <Button type="primary">I'm a new member</Button>
        </Link>
        <h2>Record your attendance</h2>
        <Form.Item
          name={"email"}
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
