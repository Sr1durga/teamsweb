import "./sidebar.css";
import { Users } from "../../dummyData";
import { useHistory } from "react-router-dom";
import {Chat28Filled} from "@fluentui/react-icons";
import {Home28Filled} from "@fluentui/react-icons";
import {CalendarToday28Filled} from "@fluentui/react-icons";


export default function Sidebar({setRender}) {
  const history = useHistory();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <button onClick={()=>{history.push("/")}}>
            <Home28Filled className="sidebarIcon" primaryFill="gray" style={{ backgroundcolor:"transparent"}}/></button> 
            <span className="sidebarListItemText"></span>
          </li>
          <li className="sidebarListItem">
          <button onClick={()=>{history.push("/calendar")}}>
            <CalendarToday28Filled className="sidebarIcon" primaryFill="gray" style={{ backgroundcolor:"transparent"}}/></button> 
            <span className="sidebarListItemText"></span>
          </li>
          <li className="sidebarListItem">
          <button onClick={()=>{history.push("/messenger")}}> <Chat28Filled className="sidebarIcon" primaryFill="gray" style={{ backgroundcolor:"transparent"}}/> </button>
            
          
          </li>
          </ul>
        </div>
        </div> 
        );
      }
         
