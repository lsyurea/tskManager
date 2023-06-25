import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '../../helper/SupabaseClient'

function CreateEventForm( {extraFunction}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const user = () => JSON.parse(sessionStorage.getItem('token')).user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!title || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    // Create new event object
    addEvent();

    // Clear form inputs
    setTitle("");
    setStartDate(null);
    setEndDate(null);
    extraFunction();
  };

  const addEvent = async () => {
    if (!user()) return
    const { error } = await supabase.from('events').insert([
      {
        user_id: user().id,
        title: title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      }
    ]);
    if (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEventForm;