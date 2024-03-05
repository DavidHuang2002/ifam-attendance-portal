import React from 'react';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { QuitPortal } from '../../components/dashBoard/QuitPortalButton';

export function SideBar() {
  const pathname = usePathname();

  // Function to determine the selected key based on the current pathname
  const getSelectedKey = () => {
    const pathMap = {
      '/admin': '1',
      '/admin/manageMainPage': '2',
      '/admin/createEvent': '3',
      // Add more mappings here for other paths and keys
    };
    return pathMap[pathname] || '1';
  };

  // Dynamically creating menu items
  const menuItems = [
    {
      key: '1',
      label: (
        <Link href="/admin">
          Main Dashboard
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/admin/manageMainPage">
          Manage Main Page
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/admin/createEvent">
          Create Event
        </Link>
      ),
    },
    {
      key: '4',
      label: 'Manage Past Events',
    },
    {
      key: '5',
      label: 'Event Activities',
    },
  ];

  return (
    <Sider>
      <div className="demo-logo-vertical" />
      <Menu
        style={{ marginTop: 200 }}
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={menuItems} // Use the `items` prop to dynamically render menu items
      />

      <QuitPortal />
    </Sider>
  );
}
