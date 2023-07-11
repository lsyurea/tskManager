import './CreateEventForm.css'
import { useEffect } from 'react';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEvent } from "../../services/apiService";

function CreateEventForm( {extraFunction}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new event object
    addEvent(title, startDate, endDate);

    // Clear form inputs
    setTitle("");
    setStartDate(null);
    setEndDate(null);
    extraFunction();
  };

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    script1.type = 'module';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    script2.setAttribute('nomodule', '');
    document.body.appendChild(script2);

    return () => {
      // Cleanup script tags if necessary
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="eventCard">
      <a href='/calendar'><span className="icon-close"><ion-icon name="close"></ion-icon></span></a>
      <form className="eventForm" onSubmit={handleSubmit}>
        <div className="input-box">
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          <label htmlFor="title">Title</label>
        </div>
        <div className="date-picker">
          <DatePicker id="startDate" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" required/>
          <label htmlFor="startDate">Start Date</label>
        </div>
        <div className="date-picker">
          <DatePicker id="endDate" selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp" required/>
          <label htmlFor="endDate">End Date</label>
        </div>
        <button className="btn" type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventForm;