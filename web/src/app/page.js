"use client";

import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import Image from 'next/image';


const { Header, Content, Footer } = Layout;

export default function HomePage() {
  return (
    <Layout className="layout">
      <Header style={{background: "white"}}>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home Page</Menu.Item>
          <Menu.Item key="2">About Us</Menu.Item>
          <Menu.Item key="3">Events</Menu.Item>
          <Menu.Item key="4">Admin Portal</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <div style={{ marginBottom: '20px',}}>
            <Image
              alt="I-Fam Logo"
              src="/ifam.jpeg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} // optional
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Contact Information</h2>
              <p>Name: John Smith</p>
              <p>Email: john.smith@gmail.com</p>
              <p>Number: 6150000000</p>
            </div>
            <Button type="primary" size="large">Check Out Our Upcoming Events!</Button>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>I-Fam International Family ©2024</Footer>
    </Layout>
  );
}
