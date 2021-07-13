import React , {useState} from 'react';
import "./calendar.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TaskNew from '../../components/tasknew/TaskNew';

function CalendarNew() {

    const [value, onChange] = useState(new Date());

    return (
      <>
      <Topbar />
      <div className="pageContainer">
      
  
        <Sidebar />
       
       
       <div id="calendar">
       <Calendar
       onChange={onChange}
       value={value}
       className="react-calendar"
     />
       </div>
       <div id ="todo">
         <TaskNew/>
       </div>
        
        
        

      </div>
    
      </>
        
    )
}

export default CalendarNew
