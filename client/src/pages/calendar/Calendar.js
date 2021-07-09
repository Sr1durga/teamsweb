import React , {useState} from 'react';
import "./calendar.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar'
function CalendarNew() {

    const [value, onChange] = useState(new Date());

    return (
      <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="feed">
        <div className="feedWrapper">
        <Calendar
        onChange={onChange}
        value={value}
        className="react-calendar"
      />
        </div>
      </div>
    </div>
      </>
        
    )
}

export default CalendarNew
