import "./topbar.css";
import { Search, Person, Chat, Notifications , LockOpenOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { useHistory } from "react-router-dom";

import {Chat28Regular} from "@fluentui/react-icons";
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

 const handleLogout = () => {
  localStorage.clear() ; window.location.reload();
 }
 const history = useHistory();
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MICROSOFT TEAMS</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
         {/* <span className="topbarLink"><a href="/videochat">Video Chat</a></span>*/}
         {/*<span className="topbarLink"><a href="/messenger">Messenger</a></span> */}
        </div>
        <div className="topbarIcons">
        {/* <div className="topbarIconItem">
            {/*<Person />
            <button onClick={()=>{history.push("/videochat")}}> <VideoCallIcon/> </button>
            /*<span className="topbarIconBadge">1</span>
            </div> */}
          
          
          {/*<div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
  </div> */}
          <div className="topbarIconItem">
            {/*<Notifications />*/}
            <button onClick={()=>{history.push("/messenger")}}> <Chat28Regular primaryFill="white" style={{ backgroundcolor:"transparent"}}/> </button>
          </div>
          <div className="topbarIconItem">
            <button onClick={handleLogout}>
            <LockOpenOutlined  />
            </button>
           
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
