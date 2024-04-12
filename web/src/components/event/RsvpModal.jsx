
import { Modal, Button, Form, Input } from "antd";
import { useAtom } from "jotai";
import { RsvpModalOpenAtom } from "@/jotaiStore/store";
import { useState } from "react";

export default function RsvpModal({ eventId, eventName}) {
  const [open, setOpen] = useAtom(RsvpModalOpenAtom);


  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = () => {
    // createRSVP(email, eventId);
    console.log("RSVP submitted:", email);
    setShowMessage(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setShowMessage(false);
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div>
      <Modal
        title="RSVP"
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          <p>
            RSVP for <b>{eventName}</b>
          </p>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input value={email} onChange={handleInputChange} />
          </Form.Item>
        </Form>
        {showMessage && (
          <p style={{ marginTop: "10px", color: "green" }}>
            Thank you for your RSVP. We have received your email: {email}
          </p>
        )}
      </Modal>
    </div>
  );
}