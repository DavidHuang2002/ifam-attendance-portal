
import { Modal, Button, Form, Input, Spin, message } from "antd";
import { useAtom } from "jotai";
import { RsvpModalOpenAtom } from "@/jotaiStore/store";
import { useState, useEffect, use } from "react";

import { createRSVP } from "@/service/back-end/rsvp";

export default function RsvpModal({ eventId, eventName}) {
  const [open, setOpen] = useAtom(RsvpModalOpenAtom);


  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setEmail("");
    setShowMessage(false);
    setLoading(false);
  }, [open]);

  const submitRSVP = async (email, eventId) => {
    console.log("RSVP submitted:", email);
    setLoading(true);
    
    try{
      const docRef = await createRSVP(email, eventId);
      setLoading(false);
      setShowMessage(true);

      console.log("RSVP created:", docRef);
    } catch (error) {
      console.error("Failed to submit RSVP:", error);
      message.error("Failed to submit RSVP. Please try again later.");
      setLoading(false);
    }
  };
  
  const handleSubmit = () => {
    submitRSVP(email, eventId);
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
        <Spin spinning={loading} tip="Submitting your RSVP...">
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
        </Spin>
      </Modal>
    </div>
  );
}