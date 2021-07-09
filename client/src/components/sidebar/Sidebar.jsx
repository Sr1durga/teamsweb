import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useHistory } from "react-router-dom";
import {Chat28Regular} from "@fluentui/react-icons";
import {Home28Regular} from "@fluentui/react-icons";
import {CalendarToday28Regular} from "@fluentui/react-icons";


export default function Sidebar({setRender}) {
  const history = useHistory();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <button onClick={()=>{history.push("/")}}>
            <Home28Regular className="sidebarIcon" primaryFill="white" style={{ backgroundcolor:"transparent"}}/></button> 
            <span className="sidebarListItemText"></span>
          </li>
          <li className="sidebarListItem">
          <button onClick={()=>{history.push("/calendar")}}>
            <CalendarToday28Regular className="sidebarIcon" primaryFill="white" style={{ backgroundcolor:"transparent"}}/></button> 
            <span className="sidebarListItemText"></span>
          </li>
          <li className="sidebarListItem">
          <button onClick={()=>{history.push("/messenger")}}> <Chat28Regular className="sidebarIcon" primaryFill="white" style={{ backgroundcolor:"transparent"}}/> </button>
            
            {/*<span className="sidebarListItemText"> </span>*/}
          </li>
          </ul>
        </div>
        </div> 
        );
      }
         {/* <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        {/*<ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
          </ul> 
         }
             </div>
    </div>
  
*/}
