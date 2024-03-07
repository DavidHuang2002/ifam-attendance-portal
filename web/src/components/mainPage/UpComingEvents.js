import React from 'react';
import EventCard from '@/components/event/EventCard';

export function UpcomingEvents() {
    const events = [
        { eventName: 'Event 1', eventDetails: 'Event Details', eventTime: '2024-03-05T17:14:29.659Z', eventLocation: 'FGH 100' },
    ];
  return (
    <div id='events'>
        <h1 style={{ marginBottom: '20px' }}>Our Upcoming Events</h1>
            <div style={{ background: '#ECECEC' }}>
                <div style={{ 
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    maxHeight: "60vh",
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