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
            <Content style={{ marginLeft: '200px', padding: '24px', minHeight: '100vh' }}>
                <h1>Past events</h1>
                <Table columns={columns} dataSource={data} />
            </Content>
        </LayoutSider>
    );
}