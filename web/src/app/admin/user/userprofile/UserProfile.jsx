import React, { useEffect, useState } from 'react';
import { Avatar, Layout, Typography, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const { Text } = Typography;

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        
        if (userEmail) {
            fetchUserData(userEmail);
        }
    }, []);

    const fetchUserData = async (userEmail) => {
        try {
            const userDocRef = doc(db, "users", userEmail);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                const data = userDocSnapshot.data();
                setUserData(data);
                setName(data.name);
                setPhotoUrl(data.photoUrl || '');
                setPhone(data.phone || '');
            } else {
                console.error("No user data available for this email.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            const userDocRef = doc(db, "users", userEmail);
            try {
                await updateDoc(userDocRef, {
                    name: name,
                    photoUrl: photoUrl,
                    phone: phone
                });
                setEditing(false);
                setUserData({ ...userData, name, photoUrl, phone });
                message.success('Profile updated successfully!');
            } catch (error) {
                message.error('Failed to update profile. Please try again.');
                console.error("Error updating user data:", error);
            }
        }
    };

    const handleCancel = () => {
        setName(userData.name);
        setPhotoUrl(userData.photoUrl || '');
        setPhone(userData.phone || '');
        setEditing(false);
    };

    return (
        <Layout.Content style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            {userData ? (
                <div style={{ textAlign: 'center' }}>
                    {editing ? (
                        <>
                            <Avatar size={128} src={photoUrl} icon={<UserOutlined />} />
                            <br /><br />
                            <Input
                                placeholder="Edit Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Input
                                placeholder="Edit Phone Number"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Button type="primary" onClick={handleSave}>Save</Button>
                            <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Avatar size={128} src={photoUrl} icon={<UserOutlined />} />
                            <br /><br />
                            <Text strong>Name: {name}</Text>
                            <br />
                            <Text strong>Phone: {phone}</Text>
                            <br />
                            <Button type="link" onClick={handleEdit}>Edit Profile</Button>
                        </>
                    )}
                    <br />
                    <Text strong>Email: {localStorage.getItem('userEmail')}</Text>
                    <br />
                    <Text strong>Role: {userData.role || 'Not specified'}</Text>
                </div>
            ) : (
                <Text type="danger">User data is not available or user is not logged in.</Text>
            )}
        </Layout.Content>
    );
};

export default UserProfile;
