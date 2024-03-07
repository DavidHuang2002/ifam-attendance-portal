"use client";
import React from 'react';
import { Layout } from 'antd';
import {LayoutSider } from '../../../components/dashBoard/LayoutSider'; // Ensure this path matches your project structure
import CreateEvent from './CreateEvent'; // Adjust the import path to where your EventForm.jsx is located
import { useRouter } from 'next/navigation';

const { Content } = Layout;

function Page() {
  const router = useRouter();

  // callback for redirecting to the admin page after the event is saved
  const afterSave = () => router.push('/admin/');

  return (
    <LayoutSider>
      <Layout style={{ marginLeft: 180 }}>
        <Content style={{ padding: '100px', margin: 0, minHeight: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <h1>Create Event</h1>
          </div>
          <CreateEvent afterSave={afterSave} />
        </Content>
      </Layout>
    </LayoutSider>
  );
};

export default Page;

