import React from 'react';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

import { SideBar } from "./SideBar";

export function LayoutSider({children}) {
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
          { children }
      </ Layout>
    );
}