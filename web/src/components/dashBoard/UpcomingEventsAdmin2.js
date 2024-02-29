import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const EventCard = ({
    event,
}) => {
    const {title, description} = event;
    return (
        <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
    );
}

export function UpcomingEvents2() {
    const events = [
        { title: 'Event 1', description: 'Event Details' },
        { title: 'Event 2', description: 'Event Details' },
        { title: 'Event 3', description: 'Event Details' },
        { title: 'Event 1', description: 'Event Details' },
        { title: 'Event 2', description: 'Event Details' },
        { title: 'Event 3', description: 'Event Details' },
        { title: 'Event 1', description: 'Event Details' },
        { title: 'Event 2', description: 'Event Details' },
        { title: 'Event 3', description: 'Event Details' },
        { title: 'Event 1', description: 'Event Details' },
        { title: 'Event 2', description: 'Event Details' },
        { title: 'Event 3', description: 'Event Details' },
    ];
  return (
    <div>
        <h1 style={{ marginBottom: '20px' }}>Manage Upcoming Events</h1>
            <div style={{ background: '#ECECEC' }}>
                <div style={{ 
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    maxHeight: "51vh",
                    overflowY: "auto",
                    padding: "30px"
                }}>
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
        </div>
    </div>
  );
}