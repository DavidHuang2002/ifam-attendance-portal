"use client";

// Admin Dashboard Page

import React from 'react';
import Link from 'next/link';

import { UpcomingEvents } from '../../components/dashBoard/UpcomingEventsAdmin';
import { SideBar } from '../../components/dashBoard/SideBar';



import { Layout, Menu, Button, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
const {Breadcrumb, Header, Sider, Content } = Layout;


const Dashboard = () => {
  //const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
        {/* TODO separate the sider to its own component*/}
      <Sider trigger={null}
        style={{ 
            overflow: 'auto', 
            height: '100vh', 
            position: 'fixed', left: 0, top: 0, bottom: 0,
            }}
      >
        <SideBar />
      </Sider> 
      <Layout style={{ marginLeft: 192 }}> 
        <Header style={{ padding: 0, background: colorBgContainer, minHeight: 200, position: 'sticky'}} >
            <h1 style={{ marginTop: 100, marginLeft: 40, fontSize: 50, }}>
                
                Welcome back to the Admin Portal!
                
            </h1>
        </Header>
        <Content 
            style={{ 
                padding: '0 30px', 
                margin: '24px 16px', 
                overflow: 'auto', 
                marginBottom: 50,
                }}>
            
            <div className="site-layout-content" 
                style={{ background: '#fff', padding: 24, textAlign: 'left', marginTop: 20,}} >

            <UpcomingEvents />

            </div>

           

        </Content>
        <Footer style={{minHeight: 50}}></Footer>
      </Layout>
      </Layout>
  );
};
export default Dashboard;
