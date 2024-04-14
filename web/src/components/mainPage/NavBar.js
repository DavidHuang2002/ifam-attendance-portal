import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import Link from "next/link";
import styled from 'styled-components';
import 'typeface-quicksand';



const { Header, Content, Footer } = Layout;
   
export function NavBar() {
    // Assuming you have a section with id="events" on this page for anchor link
    const menuItems = [
    {
      key: "1",
      label: (
        <Link href="/">Home</Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/events" passHref>Events</Link>
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
    <Header style={{ background: "#385B97"}}>
      <div className="logo">
        <Menu mode="horizontal" items={menuItems} selectable={false} 
          style={{ 
            flex: 1,
            background: "#385B97",
            color: "white" }} />
      
      </div>
      </Header>
      );
}