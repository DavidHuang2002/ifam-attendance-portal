import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
import Link from 'next/link';

const EventCard = ({
    event,
}) => {
    const {title, description} = event;
    return (
        <Card hoverable 
            style={{ 
                width: '100%' }} 
            actions={[
                <Link href="../admin/editEvent"> 
                <SettingOutlined key="setting" />
                </Link>,
                <Link href="../admin/attendanceOld"> 
                <EditOutlined key="edit" />
                </Link>,
                <EllipsisOutlined key="ellipsis" />,
          ]}>
            <Meta title={event.title} description={event.description} />
        </Card>
    );
}

export function UpcomingEvents() {
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
        <h1 style={{ marginBottom: '20px' }}>Upcoming Events</h1>
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