import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Layout, Tooltip, Typography, Modal } from 'antd';
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { collection, query, where, getDocs, orderBy, writeBatch, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";

const { Link } = Typography;

const Header = ({ onSignOut }) => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');  // Make sure 'userName' is the correct key
        if (storedUserName) {
            setUserName(storedUserName);
        }
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const storedUserEmail = localStorage.getItem('userEmail');
        if (!storedUserEmail) return;

        const notificationsRef = collection(db, "notifications");
        const q = query(
            notificationsRef, 
            where("userId", "==", storedUserEmail), 
            where("read", "==", false), 
            orderBy("timestamp", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            const unreadNotifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotifications(unreadNotifications);
            setNotificationCount(unreadNotifications.length);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const markNotificationsAsRead = async () => {
        const batch = writeBatch(db);
        notifications.forEach(notification => {
            const notificationRef = doc(db, "notifications", notification.id);
            batch.update(notificationRef, { read: true });
        });

        await batch.commit();
        fetchNotifications();  // Refresh notifications
    };
    const onProfileUser = () => {
        router.push("/admin/user/userprofile/")
      }
    const showModal = () => {
        if (notificationCount > 0) {
            setIsModalVisible(true);
        } else {
            console.log("No notifications to display.");
        }
    };

    const handleOk = async () => {
        await markNotificationsAsRead();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout.Header style={{
            background: '#fff',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px'
        }}>
            <Tooltip title={`You have ${notificationCount} new notifications`}>
                <Badge count={notificationCount} overflowCount={99} onClick={showModal}>
                
                    <Avatar style={{ backgroundColor: '#f56a00' }} icon={<NotificationOutlined />} />
                
                </Badge>
            </Tooltip>
<Modal title="Notifications" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>{notification.description}</li>
                    ))}
                </ul>
            </Modal>

            <Tooltip title={`Signed in as ${userName || 'Not signed in'}`}>
            <Link onClick={onProfileUser} >
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Link>
            </Tooltip>
            <Link onClick={onSignOut} style={{ cursor: 'pointer', color: '#1890ff' }}>Sign Out</Link>
        </Layout.Header>
    );
};

export default Header;

