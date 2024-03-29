
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import CreateEventForm from "./CreateEventForm";
import { useLocation } from "react-router-dom";
import "./MyCalendar.css";

const locales = {
  "en-GB": import("date-fns/locale/en-GB"),
};



const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MyCalendar() {
  const location = useLocation();
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

  // create event
  const handleEventCreate = () => { 
    setShowForm(false);
  }

  useEffect(() => {
    setEvents(JSON.parse(sessionStorage.getItem('events')));
  }, [location]);

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
    <div className="cal-wrapper">
        {!showForm && (
          <div>
            <div className="cal">
              <Calendar className="cal-in" localizer={localizer} events={events.map(x => {
                x.start = new Date(x.start);
                x.end = new Date(x.end);
                return x;
              })} startAccessor="start" endAccessor="end" components={{
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