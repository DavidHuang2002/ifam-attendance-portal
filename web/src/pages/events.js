import React from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import 'typeface-quicksand';
import Link from "next/link";
import { Layout, Menu, Breadcrumb } from "antd";

import {UpcomingEvents} from "@/components/event/UpComingEvents";
import { NavBar } from '@/components/mainPage/NavBar';
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
    return (
      <Layout className="layout" style={{background: '#fff'}}>
        <NavBar />
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
  