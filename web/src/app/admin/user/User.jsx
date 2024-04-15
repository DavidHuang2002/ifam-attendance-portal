import React, { useEffect, useState } from 'react';
import { db } from "@/firebase/config";
import { Modal, Form, Input, Select, Button, Space, Table } from 'antd';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { EditOutlined, DeleteOutlined, StopOutlined , PlusOutlined, DownloadOutlined,NotificationOutlined} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { useRouter } from "next/navigation"; // Correct import for Next.js
// Define the columns for your table with specified widths


const { Option } = Select;

const User = () => {
 const router = useRouter(); // Use useRouter hook for navigation
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  const fetchUserData = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      key: doc.id, // Using the document ID as key
      email: doc.id, // Assuming the document ID is the user's email
    }));
    setData(usersData);
    setFilteredData(usersData); // Initialize filteredData with fetched data
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = data.filter(item => {
        return (
          item.name?.toLowerCase().includes(lowercasedFilter) ||
          item.email?.toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredData(filteredData);
    }
  }, [searchTerm, data]);
  
  const onSave = async (id) => {
    const fields = form.getFieldsValue();
    await updateDoc(doc(db, 'users', id), {
      name: fields.name,
      role: fields.role,
      phone: fields.phone,
    });
    setIsModalVisible(false);
    setEditingUser(null);
    // Fetch the updated data
    fetchUserData();
  };
  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure delete this user?',
      content: 'This action cannot be undone and will permanently delete the user from the system.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk: async () => {
        try {
          // Delete from Firestore
          await deleteDoc(doc(db, 'users', record.email));
  
          // Delete from Firebase Authentication (Client-side example, see note below)
          const auth = getAuth();
          const user = auth.currentUser;
          if(user && user.email === record.email) { // This check is simplistic, you likely need a more secure approach
            await deleteUser(user);
          }
  
          console.log('User deleted successfully');
          // Optionally, refresh the data in your component to reflect the deletion
        } catch (error) {
          console.error('Error deleting user:', error);
          Modal.error({
            title: 'Error',
            content: 'Failed to delete the user. Please try again later.',
          });
        }
      },
    });
  };
  const handleDisable = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to disable this user?',
      content: 'Disabling the user will prevent them from logging in and accessing the system.',
      okText: 'Yes, disable',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk: async () => {
        try {
          // Update the user document in Firestore to mark as disabled
          await updateDoc(doc(db, 'users', record.email), {
            isDisabled: true,
          });
  
          // Optionally, disable Firebase Authentication user server-side (see below)
          console.log('User disabled successfully');
          // Optionally, refresh the component's state or data to reflect the change
        } catch (error) {
          console.error('Error disabling user:', error);
          Modal.error({
            title: 'Error',
            content: 'Failed to disable the user. Please try again later.',
          });
        }
      },
    });
  };
  const onAddUser = () => {
    router.push("/admin/user/createuser/")
  };

  const navigateToNotificationForm = () => {
    router.push("/admin/user/usernotification/")
  };

  const onExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(({ key, ...item }) => item));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };
  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = data.filter(item => {
      return (
        item.name.toLowerCase().includes(lowercasedFilter) ||
        item.email.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredData(filteredData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200, // Set your desired width
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 300, // Set your desired width
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 200, // Set your desired width
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 200, // Set your desired width
    },
    {
      title: 'Action',
      key: 'action',
      width: 300, // Adjust width as needed for the action buttons
      render: (_, record) => (
        <Space size="middle">
           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
          <Button icon={<StopOutlined />} onClick={() => handleDisable(record)}>Disable</Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ margin: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
       <Input
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sstyle={{ flexGrow: 2, marginRight: '20px' }}
        />
         
      </div>
      
    <Space direction="vertical" size="left" style={{ width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
    <Space>
    <Button type="primary" icon={<PlusOutlined />} onClick={onAddUser}>Add User</Button>
          <Button type="primary" icon={<DownloadOutlined />} onClick={onExportToExcel}>Export to Excel</Button>
          <Button type="primary" icon={<NotificationOutlined />} onClick={navigateToNotificationForm}>Send Notification</Button>


        </Space>
        
        </div>
        {filteredData.length > 0 ? (
        <Table columns={columns} dataSource={filteredData} pagination={false} />
      ) : (
        <div>No results found.</div>
      )}
      <Modal title="Edit User" visible={isModalVisible} onOk={() => onSave(editingUser.email)} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="attendance">Attendance</Option>
              <Option value="student">Student</Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
    
  </div>
  );
};

export default User;
