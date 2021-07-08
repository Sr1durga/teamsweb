import React , {useState} from 'react';
import "./calendar.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarNew() {

    const [value, onChange] = useState(new Date());

    return (
        <div className="feed">
        <div className="feedWrapper">
        <Calendar
        onChange={onChange}
        value={value}
        className="react-calendar"
      />
        </div>
      </div>
    )
}

export default CalendarNew
