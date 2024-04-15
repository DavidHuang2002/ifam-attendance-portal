
"use client";
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import {LayoutSider } from '@/components/dashBoard/LayoutSider'; // Ensure this path matches your project structure
import UserProfile from './UserProfile'; // Adjust the import path to where your EventForm.jsx is located
import { useRouter } from 'next/navigation';

const { Content } = Layout;

function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  // callback for redirecting to the admin page after the event is saved
  const afterSave = () => router.push('/admin/');
  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <LayoutSider>
      <Layout style={{ marginLeft: 180 }}>
        <Content style={{ padding: '100px', margin: 0, minHeight: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <h1>{username ? `${username}'s Profile` : 'User Profile'}</h1>
          </div>
          <UserProfile  />
        </Content>
      </Layout>
    </LayoutSider>
  );
};

export default Page;
