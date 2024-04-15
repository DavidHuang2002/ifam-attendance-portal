import React, { useState } from 'react';
import { Form, Input, Button, Select, notification as antdNotification } from 'antd';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";  // Ensure this path is correct

const { Option } = Select;

const NotificationForm = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { role, title, description } = values;
        const usersRef = collection(db, "users");  // Use db instead of firestore
        const q = query(usersRef, where("role", "==", role));

        const querySnapshot = await getDocs(q);
        const batch = [];

        querySnapshot.forEach((doc) => {
            const notificationRef = collection(db, "notifications");  // Use db instead of firestore
            const data = {
                userId: doc.id,
                title: title,
                description: description,
                read: false,
                timestamp: serverTimestamp()
            };
            batch.push(addDoc(notificationRef, data));
        });

        try {
            await Promise.all(batch);
            antdNotification.success({
                message: 'Notifications Sent',
                description: `Notifications have been sent to all users with the role ${role}.`
            });
            form.resetFields();
        } catch (error) {
            antdNotification.error({
                message: 'Error',
                description: 'Failed to send notifications. Try again later.'
            });
            console.error("Error sending notifications: ", error);
        }
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical" style={{ margin: '40px' }}>
            <Form.Item name="role" label="User Role" rules={[{ required: true, message: 'Please select a role!' }]}>
                <Select placeholder="Select the role">
                    <Option value="admin">Administrator</Option>
                    <Option value="attandance">Attandance</Option>
                    <Option value="exprot">Export</Option>
                </Select>
            </Form.Item>
            <Form.Item name="title" label="Notification Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Notification Description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Send Notification</Button>
            </Form.Item>
        </Form>
    );
};

export default NotificationForm;
