import { Card } from 'antd';

const { Meta } = Card;

const EventCard = ({
    event,
}) => {
    const {title, description} = event;
    return (
        <Card hoverable style={{ width: '100%' }}>
            <Meta title={event.title} description={event.description} />
        </Card>
    );
}

export function UpcomingEvents() {
    const events = [
        { title: 'Event 1', description: 'Event Details' },
        { title: 'Event 2', description: 'Event Details' },
        { title: 'Event 3', description: 'Event Details' },
    ];
  return (
    <div>
        <h1 style={{ marginBottom: '20px' }}>Our Upcoming Events</h1>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
        </div>
    </div>
  );
}