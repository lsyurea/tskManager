
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { supabase } from '../../services/SupabaseClient'
import CreateEventForm from "./CreateEventForm";
import "./MyCalendar.css";

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

function MyCalendar() {
  // authentication
  const user = () => {
    const curToken = JSON.parse(sessionStorage.getItem('token'));
    return curToken ? curToken.user : curToken;
  }

  // events
  const [events, setEvents] = useState([]);

  // to hide create form
  const [showForm, setShowForm] = useState(false);



  const handleEventClick = () => {
    setShowForm(true);
  }

  // fetch events from database
  const fetchEvent = async () => {
    if (!user()) return
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
  const handleEventCreate = () => { 
    setShowForm(false);
  }

  useEffect(() => {
    fetchEvent();
  });

  if (user() == null) {
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
            <CreateEventForm extraFunction={handleEventCreate}/>
        </div>)
        }
      </div>
    </>
  );
}

export default MyCalendar;