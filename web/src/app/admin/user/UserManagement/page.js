"use client";
import { LayoutSider } from "@/components/dashBoard/LayoutSider";
import { Table, Layout, Button } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "Email",
    align: "center",
  },
  {
    title: "Role",
    dataIndex: "Role",
    key: "Role",
    align: "center",
  },
  {
    title: "Action",
    dataIndex: "Action",
    key: "Action",
    align: "center",
  },
];

const change = [
  <div>
    <Button>Edit</Button> | <Button>Delete</Button>
  </div>,
];

const data = [
  {
    Name: "John Doe",
    Email: "...@vanderbilt.edu",
    Role: "Admin",
    Action: change,
  },
  {
    Name: "Billy bob joe",
    Email: "...@vanderbilt.edu",
    Role: "non-admin",
    Action: change,
  },
  {
    Name: "Millie Joe",
    Email: "...@vanderbilt.edu",
    Role: "User Admin",
    Action: change,
  },
  {
    Name: "Alex Shane",
    Email: "...@vanderbilt.edu",
    Role: "Admin",
    Action: change,
  },
];

export default function UserManagement() {
  return (
    <LayoutSider>
      <Content
        style={{ marginLeft: "200px", padding: "24px", minHeight: "100vh" }}
      >
        <h1>User Management</h1>
        <Table columns={columns} dataSource={data} />
      </Content>
    </LayoutSider>
  );
}
