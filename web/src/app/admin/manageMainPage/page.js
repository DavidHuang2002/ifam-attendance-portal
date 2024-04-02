"use client";

import React from "react";
import { Layout } from "antd";
import { LayoutSider } from "../../../components/dashBoard/LayoutSider"; // Ensure this path matches your project structure
// import EditEvent from './EditEvent'; // Adjust the import path to where your EventForm.jsx is located
import { upcomingEventsAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import EditPublicInfo from "@/components/mainPage/EditPublicInfo";

const { Content } = Layout;

function manageMainPage() {

    return (
        <LayoutSider>
          <Layout style={{ marginLeft: 180 }}>
            <Content style={{ padding: "100px", margin: 0, minHeight: "280px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h1>Manage Landing Page</h1>
              </div>
              <EditPublicInfo />
            </Content>
          </Layout>
        </LayoutSider>
      );
}

export default manageMainPage;