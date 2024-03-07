// Instructs Next.js that this module should only be executed on the client side. 
// Required for using some ant-design components
"use client"; 

// Admin Dashboard Page

import React from "react";
import Link from "next/link";

import { UpcomingEvents } from "@/components/event/UpComingEvents";
import { LayoutSider } from "../../components/dashBoard/LayoutSider";

import { Layout, Menu, Button, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
const { Breadcrumb, Header, Sider, Content } = Layout;

const Dashboard = () => {
  // Theme tokens are being used here to access and apply custom theming options.
  // It demonstrates an advanced theming technique with Ant Design's `theme` utility
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <LayoutSider>
      <Layout style={{ marginLeft: 192 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            minHeight: 200,
            position: "sticky",
          }}
        >
          <h1 style={{ marginTop: 100, marginLeft: 40, fontSize: 50 }}>
            Welcome back to the Admin Portal!
          </h1>
        </Header>
        <Content
          style={{
            padding: "0 30px",
            margin: "24px 16px",
            overflow: "auto",
            marginBottom: 50,
          }}
        >
          <div
            className="site-layout-content"
            style={{
              background: "#fff",
              padding: 24,
              textAlign: "left",
              marginTop: 20,
            }}
          >
            <UpcomingEvents admin />
          </div>
        </Content>
        <Footer style={{ minHeight: 50 }}></Footer>
      </Layout>
    </LayoutSider>
  );
};
export default Dashboard;
