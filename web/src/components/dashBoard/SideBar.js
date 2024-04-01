// SideBar Component

// This component creates a sidebar navigation for an admin dashboard using Ant Design's `Sider` and `Menu` components.
// It leverages Next.js's `usePathname` hook for active link highlighting based on the current route.
// The sidebar includes a list of navigable items and a custom button (`QuitPortal`) for additional actions.

import React from "react";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider"; // Importing Sider component directly from its source.
import { usePathname } from "next/navigation"; // Next.js hook to get the current pathname for route-aware logic.
import Link from "next/link"; // Next.js Link component for client-side navigation.
import { QuitPortal } from "../../components/dashBoard/QuitPortalButton"; // Custom component, possibly for logging out or exiting the portal.

export function SideBar() {
  const pathname = usePathname(); // Hook to access the current pathname.

  // Determines the selected key for the Menu based on the current route, for highlighting the active menu item.
  const getSelectedKey = () => {
    const pathMap = {
      "/admin": "1",
      "/admin/manageMainPage": "2",
      "/admin/event/create": "3",
      // Additional mappings can be added to handle more paths.
    };
    return pathMap[pathname] || ""; // Returns the corresponding key or an empty string if the path is not mapped.
  };

  // Array of objects representing menu items. Includes both navigable links and placeholders for future implementation.
  const menuItems = [
    {
      key: "1",
      label: <Link href="/admin">Main Dashboard</Link>, // Link to the main dashboard.
    },
    {
      key: "2",
      label: <Link href="/admin/manageMainPage">Manage Main Page</Link>,
      disabled: true, // Placeholder item, currently disabled.
    },
    {
      key: "3",
      label: <Link href="/admin/event/create">Create Event</Link>, // Link to create a new event.
    },
    // Additional disabled menu items serving as placeholders for future features.
    {
      key: "4",
      label: "Manage Past Events",
      disabled: true,
    },
    {
      key: "5",
      label: "Event Activities",
      disabled: true,
    },
  ];

  return (
    <Sider>
      <div className="demo-logo-vertical" />
      <Menu
        style={{ marginTop: 200 }} // Positioning the menu below a logo or top section.
        theme="dark" // Dark theme for the sidebar.
        mode="inline" // Inline menu style, typical for sidebar navigation.
        selectedKeys={[getSelectedKey()]} // Array with the current active menu item based on the pathname.
        items={menuItems} // Dynamically generated menu items.
      />
      <QuitPortal />
    </Sider>
  );
}
