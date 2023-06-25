import "./MyCalendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { supabase } from '../../helper/SupabaseClient'
import CreateEventForm from "./CreateEventForm";

const locales = {
  "en-US": import("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MyCalendar( {token} ) {

  // events
  const [events, setEvents] = useState([]);
  // event
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  // to hide create form
  const [showForm, setShowForm] = useState(false);



  const handleEventClick = () => {
    setShowForm(true);
  }

  // authentication
  const user = () => {
    return token.user;
  }

  // fetch events from database
  const fetchEvent = async () => {
    const {data: events, error} = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user().id)

    if (error) {
      console.log(error);
    } else {
      const formattedEvents = events.map(event => (
        {
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }
      ))
      setEvents(formattedEvents);
    }
  }

  // create event
  const handleEventCreate = (newEvent) => { 
    setNewEvent(newEvent);
    setShowForm(false);
    addEvent();

  }

  const addEvent = async () => {
    if (!user()) return
    const { error } = await supabase.from('events').insert([
      {
        user_id: user().id,
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
      }
    ]);
    if (error) {
      alert(error);
      return;   
    } else {
      fetchEvent();
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  if (token == null) {
    return (
    <>
      <div>
        <h1>Please login first</h1>
      </div>
    </>
    )}

  // to render all dates in the calendar
  const renderDay = ({ date }) => {
    if (date) {
      return (
        <div className="custom-day">
          <div className="custom-day-number">{date.getDate()}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
    <div>
        {!showForm && (
          <div>
            <div className="cal">
              <Calendar className="cal-in" localizer={localizer} events={events} startAccessor="start" endAccessor="end" components={{
                dateCellWrapper: renderDay,
              }}/>
            </div>
            <button onClick={handleEventClick}>Create New Event</button>
          </div>)
        } 
        {
          showForm && (
          <div>
            <CreateEventForm onEventCreate={handleEventCreate} />
        </div>)
        }
      </div>
    </>
  );
}

export default MyCalendar;