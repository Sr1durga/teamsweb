import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import  {Home28Filled} from "@fluentui/react-icons";
import {LockOpen28Filled } from "@fluentui/react-icons";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import React , {useState , useEffect} from 'react';
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

 const handleLogout = () => {
  localStorage.clear() ; window.location.reload();
 }

  const onSearchChange = (e , values) => {
    console.log(values);
    const url = '/profile/'+values;
    history.push(url);
  }

  const [getAllUsers, setgetAllUsers] = useState([]);
  const getUsers = async() => {
    const res =  await axios.get('/api/users/getUsers');
    console.log(res);
    setgetAllUsers(res.data.data);

  }


  useEffect(() => {
    getUsers();
  }, [])

 const history = useHistory();
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Microsoft Teams</span>
        </Link>
      </div>
      
      <div className="topbarCenter">
        <div className="searchbar">
          
         
          <Autocomplete className="searchAuto"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={getAllUsers.map((option) => option.username)}
        onChange={onSearchChange}
        renderInput={(params) => (
          <TextField className ="searchInput"
            {...params}
            label="Search"
            display="flex"
           
           
            InputProps={{ ...params.InputProps, type: 'search' ,size:25}}
          />
         
        )}
        />
         <Search className="searchIcon" />
         
        </div>
      </div>
      <div className="topbarRight">
     
    
   
        <div className="topbarLinks">
         {/* <span className="topbarLink"><a href="/videochat">Video Chat</a></span>*/}
         {/*<span className="topbarLink"><a href="/messenger">Messenger</a></span> */}
       
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        
        </Link>
       
       
        </div>
        <div className="topbarIcons">
        <div class="vertLine">
        
        {/* <div className="topbarIconItem">
            {/*<Person />
            <button onClick={()=>{history.push("/videochat")}}> <VideoCallIcon/> </button>
            /*<span className="topbarIconBadge">1</span>
            </div> */}
          
          
          {/*<div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
  </div> */}
  
          <div className="topbarIconItema">
            {/*<Notifications />*/}
            <button onClick={()=>{history.push("/")}}> <Home28Filled primaryFill="white" style={{ backgroundcolor:"transparent"}}/> </button>
          </div>
          </div>
          <div className="topbarIconItemb">
            <button onClick={handleLogout}>
            <LockOpen28Filled  primaryFill="white" style={{ backgroundcolor:"transparent"}} />
            </button>
           
          </div>
        </div>
        {/*<Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
          </Link>*/}
      </div>
    </div>
  );
}
