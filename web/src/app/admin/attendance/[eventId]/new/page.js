"use client";
import React from "react";
import { Button, Form, Input, Select, Checkbox, message } from "antd";
import Link from "next/link";
import { getOldMemberAttendanceRoute } from "@/constants/front-end-routes";
import { postAttednace, postParticipant } from "@/constants/api-endpoints";
import { GRAD_STUDENT_CLASS } from "@/constants/participant";
import { useRouter } from "next/navigation";
import { getGraduationYear } from "@/utils/utils";

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

export default function Attendance({ params: { eventId } }) {
  const router = useRouter();

  const [form] = Form.useForm();
  const oldMemberAttendanceHref = getOldMemberAttendanceRoute(eventId);

  const onFinish = async (formValues) => {
    const { email } = formValues.user;
    console.log("formValues", formValues);
    try {
      const newMemberRes = await postParticipant(formValues.user);
      const attendanceRes = await postAttednace(eventId, email);

      if (attendanceRes.status == 200) {
        message.success("Attendance recorded");
      } else {
        message.error("Failed to submit attendance");
      }

      if (newMemberRes.status == 200) {
        message.success("registered as a new member");
      } else {
        message.error("Failed to register as a new member");
      }

      form.resetFields();
      router.push(oldMemberAttendanceHref);
    } catch (error) {
      message.error("Failed to submit attendance");
      console.error(error);
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
        <Form.Item name={["user", "class"]} label="Class">
          <Select
            showSearch
            placeholder="Select your grade"
            optionFilterProp="grade"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: getGraduationYear("Undergraduate Freshman"),
                label: "Undergraduate Freshman",
              },
              {
                value: getGraduationYear("Undergraduate Sophomore"),
                label: "Undergraduate Sophomore",
              },
              {
                value: getGraduationYear("Undergraduate Junior"),
                label: "Undergraduate Junior",
              },
              {
                value: getGraduationYear("Undergraduate Senior"),
                label: "Undergraduate Senior",
              },
              {
                value: GRAD_STUDENT_CLASS,
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
