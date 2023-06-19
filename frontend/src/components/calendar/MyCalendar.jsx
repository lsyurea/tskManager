import "./MyCalendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";

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
  // const [events, setEvents] = useState([]);
  const events = [
    {
      title: 'Big Meeting',
      allDay: true,
      start: new Date(2023, 0, 0),
      end: new Date(2023, 0, 12),
    },
    // Add more events as needed
  ];

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
    <div className="cal">
      <Calendar className="cal-in" localizer={localizer} events={events} startAccessor="start" endAccessor="end" components={{
        dateCellWrapper: renderDay,
      }}/>
    </div>
  );
}

export default MyCalendar;