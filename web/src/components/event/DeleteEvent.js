import { message } from "antd"
import { deleteEvent } from "@/service/back-end/event";


export const handleDeleteEvent = async (eventId, setEvents) => {
    try {
      await deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event.eventId !== eventId));
      message.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      message.error('Failed to delete event');
    }
  };