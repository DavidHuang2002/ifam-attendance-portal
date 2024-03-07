"use client";

import React from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import Link from "next/link";

import HeroSection from "@/components/mainPage/HeroSection";
import { UpcomingEvents } from "@/components/event/UpComingEvents";
import { ContactInfo } from "@/components/mainPage/ContactInfo";

const { Header, Content, Footer } = Layout;

export default function HomePage() {
  return (
    <Layout className="layout">
      <Header style={{ background: "white" }}>
        <div className="logo" />
        {/* TODO menu Item children is deprecated. Fix it by using items*/}
        <Menu mode="horizontal" style={{ flex: 1 }} selectable={false}>
          {/* <Menu.Item key="1">Home Page</Menu.Item> */}
          <Menu.Item key="2">
            <a href="#events">Events</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="#contact">About Us</a>
          </Menu.Item>
          <Menu.Item key="4" style={{ marginLeft: "auto" }}>
            <Link href="/admin">Admin Portal</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ background: "#fff", padding: 24, minHeight: 280 }}
        >
          <HeroSection />

          <UpcomingEvents />

          <ContactInfo />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        I-Fam International Family ©2024
      </Footer>
    </Layout>
  );
}
