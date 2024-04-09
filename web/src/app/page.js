"use client";
import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import Link from "next/link";
import styled from 'styled-components';
import 'typeface-quicksand';

import HeroSection from "@/components/mainPage/HeroSection";
//import {UpcomingEvents} from "@/components/event/UpComingEvents"; // Assuming default export
import {ContactInfo} from "@/components/mainPage/ContactInfo"; // Assuming default export
import { UpcomingEvents } from "@/components/event/UpComingEvents";
import LandingPage from "@/components/mainPage/NewLanding";



const { Header, Content, Footer } = Layout;


export default function HomePage() {
  // Define menu items
  const menuItems = [
    // Assuming you have a section with id="events" on this page for anchor link
    {
      key: "2",
      label: (
        <Link href="/events">Events</Link>
      ),
    },
    // Assuming "About Us" is meant to be an anchor link to a section on this page
    {
      key: "3",
      label: (
        <Link href="#contact">About Us</Link>
      ),
    },
    // For navigation with Next.js Link
    {
      key: "4",
      label: (
        <Link href="/contact" passHref>
          Contact Us
        </Link>
      ),
    },
    // Test Landing Page
    // Admin Portal link
    {
      key: "6",
      label: (
        <Link href="/signin" passHref>
         Admin Portal
        </Link>
      ),
      style: { marginLeft: "auto" },
    },
  ];

  return (
    <Layout className="layout" style={{background: '#fff'}}>
      <Header style={{ background: "#2C5C9B"}}>
        <div className="logo" />
        <Menu mode="horizontal" items={menuItems} selectable={false} 
          style={{ 
            flex: 1,
            background: "#2C5C9B",
            color: "white" }} />
      </Header>
      <LandingPage />
      <UpcomingEvents />
      <Footer style={{ textAlign: "center" }}>
        I-Fam International Family ©2024
      </Footer>
    </Layout>
  );
}
