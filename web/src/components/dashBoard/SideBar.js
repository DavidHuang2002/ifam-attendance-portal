import React from 'react';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Link from 'next/link';

import { QuitPortal } from '../../components/dashBoard/QuitPortalButton';

export function SideBar() {
    return (
        <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          style={{marginTop: 200,}}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Main Dashboard</Menu.Item>
          <Menu.Item key="2">Manage Main Page</Menu.Item>
          <Menu.Item key="3">
            <Link href="../admin/createEvent">
              Create Event
            </Link>
          </Menu.Item>
          <Menu.Item key="4">Manage Past Events</Menu.Item>
          <Menu.Item key="5">Event Activities</Menu.Item>
          </Menu>

          <QuitPortal />

        </Sider>
    );
}

