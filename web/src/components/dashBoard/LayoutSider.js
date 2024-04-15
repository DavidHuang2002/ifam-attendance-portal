import React from 'react';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Header from './HeaderBare';  // Import the Header component
import { SideBar } from "./SideBar";

// cretae a layout with a fixed side bar. Used for all admin pages
export function LayoutSider({children}) {
  const handleSignOut = () => {
    console.log("Handling sign out...");
    // Implement your sign-out logic here
    // For example, clear the user token from storage and redirect to the login page
    window.location.href = '/';
};
    return (
        <Layout hasSider>
          <Sider trigger={null}
            style={{ 
                overflow: 'auto', 
                height: '100vh', 
                position: 'fixed', left: 0, top: 0, bottom: 0,
                }}
          >
            <SideBar />
          </Sider> 
          <Layout >
                <Header notificationCount={5} onSignOut={handleSignOut} />
                <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
}