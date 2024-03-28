"use client"
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { LayoutSider } from '@/components/dashBoard/LayoutSider';
import { Layout, Button } from 'antd';

const { Content } = Layout;

const columns = [
  {
    title: 'Event Name',
    dataIndex: 'EventName',
    key: 'EventName',
    // render: (text) => <a>{text}</a>,
    align: 'center',
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
    align: 'center',
  },
  {
    title: '# Participants',
    dataIndex: 'num_P',
    key: 'num_P',
    align: 'center',
  },
  {
    title: '# RSVP',
    dataIndex: 'num_RSVP',
    key: 'num_RSVP',
    align: 'center',
  },
  {
    title: 'Export Data',
    dataIndex: 'Export',
    key: 'Export',
    align: 'center',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];
const data = [
  {
    EventName: 'I-FAM Dinner',
    Date: 'xx/xx/xxxx',
    num_P: 15,
    num_RSVP: 25,
    // tags: ['nice', 'developer'],
    Export: <Button>Export</Button>,
  },
  {
    EventName: 'I-FAM Event 2',
    Date: 'xx/xx/xxxx',
    num_P: 10,
    num_RSVP: 18,
    // tags: ['loser'],
    Export: <Button>Export</Button>,
  },
  {
    EventName: 'I-FAM Event 3',
    Date: 'xx/xx/xxxx',
    num_P: 17,
    num_RSVP: 20,
    // tags: ['cool', 'teacher'],
    Export: <Button>Export</Button>,
  },
  {
    EventName: 'I-FAM Event 4',
    Date: 'xx/xx/xxxx',
    num_P: 7,
    num_RSVP: 15,
    // tags: ['cool', 'teacher'],
    Export: <Button>Export</Button>,
  },
];
export default function ManagePastEvents() {
    return (
        <LayoutSider>
            <Content style={{ marginLeft: '200px', padding: '24px', minHeight: '280px' }}>
                <Table columns={columns} dataSource={data} />
            </Content>
        </LayoutSider>
    );
}
// export default App;