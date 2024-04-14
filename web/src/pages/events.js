import React from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import 'typeface-quicksand';
import Link from "next/link";
import { Layout, Menu, Breadcrumb } from "antd";

import {UpcomingEvents} from "@/components/event/UpComingEvents";
//import {NavBar} from "@/components/mainPage/NavBar"

const { Header, Content, Footer } = Layout;

// Styled Components
const Wrapper = styled.div`
  width: 100%;
`;

const HeadingSection = styled.section`
    background: white;
`;

const PageHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 6rem;
`;

const EventsSection = styled.p`
    padding: 2rem 8rem;
    height: 600px;
    background: white;`
;


export default function EventsPage() {
    // Define menu items
    const menuItems = [
      // Assuming you have a section with id="events" on this page for anchor link
      {
        key: "1",
        label: (
          <Link href="../">Home</Link>
        ),
      },
      {
        key: "2",
        label: (
          "Events"
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
          <Link href="../contact" passHref>
            Contact Us
          </Link>
        ),
      },
      // Test Landing Page
      // Admin Portal link
      {
        key: "6",
        label: (
          <Link href="../signin" passHref>
           Admin Portal
          </Link>
        ),
        style: { marginLeft: "auto" },
      },
    ];
  
    return (
      <Layout className="layout" style={{background: '#fff'}}>
        <Header style={{ background: "#385B97"}}>
          <div className="logo" />
          <Menu mode="horizontal" items={menuItems} selectable={false} 
            style={{ 
              flex: 1,
              background: "#385B97",
              color: "white" }} />
        </Header>
        <HeadingSection>
            <PageHeading> Our Upcoming Events</PageHeading>
        </HeadingSection>
        <EventsSection>
            <UpcomingEvents />
        </EventsSection>
        <Footer style={{ textAlign: "center" }}>
          I-Fam International Family ©2024
        </Footer>
      </Layout>
    );
  }
  