import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateEventForm({ onEventCreate }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!title || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    // Create new event object
    const newEvent = {
      title: title,
      start: startDate,
      end: endDate,
    };

    // Pass the new event to the parent component
    onEventCreate(newEvent);

    // Clear form inputs
    setTitle("");
    setStartDate(null);
    setEndDate(null);
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