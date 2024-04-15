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
import LandingContent from "@/components/mainPage/NewLanding";
import { NavBar } from "@/components/mainPage/NavBar";



const { Header, Content, Footer } = Layout;


export default function HomePage() {
    return (
    <Layout className="layout" style={{background: '#fff'}}>
      <NavBar />
      <LandingContent />
      <Footer style={{ textAlign: "center" }}>
        I-Fam International Family ©2024
      </Footer>
    </Layout>
  );
}
