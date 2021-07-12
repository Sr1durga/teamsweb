import "./rightbar.css";

import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {  useToasts } from 'react-toast-notifications';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  
 const [getAllUsers, setgetAllUsers] = useState([]);
  const getUsers = async() => {
    const res =  await axios.get('/users/getUsers');
    console.log(res);
    setgetAllUsers(res.data.data);
  }

  const { addToast } = useToasts();

   const [expand, setExpand] = useState(false);

   const [city , setCity] = useState("");
   const [from , setFrom] = useState("");

   const savDets =async () => {
     
     
           try {
             const res = await axios.post(`/users/saveDetails/${user._id}`, {
               city ,
               from
             });
            if(res.data.success === true){
              //setExpand(!expand);
              addToast('Update Successfully', { appearance: 'success' , autoDismiss: true });
              setTimeout(() => {
                
                window.location.reload();
                       } , 1800);
            }
           } catch (error) {
             console.log(error);
           }
   }

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    getUsers();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="peopleContainer">
        <div className="rightbarTitle">People around you</div>
        <div className="peopleContainer"></div>

        <ul className="rightbarFriendList">
          {getAllUsers.map((u) => (
            <Online key={u.id} userDets={u} />
          ))}
        </ul>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            {expand && <div> <TextField
          required
          placeholder="Enter City"
          onChange={(e) => {setCity(e.target.value)}}

          fullWidth
          required
        label="City"
        value={city}
        
        /></div>}
            {!expand && <span className="rightbarInfoValue">{user.city}</span>}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            {expand && <div> <TextField
          required
          placeholder="Enter From"
          onChange={(e) => {setFrom(e.target.value)}}
          fullWidth
          required
        label="From"
        value={from}
        
        /></div>}
            {!expand && <span className="rightbarInfoValue">{user.from}</span>}
          </div>
          
          <div className="rightbarInfoItem">
           
            <span className="rightbarInfoValue"  onClick={() => setExpand(!expand)}> 
            {!expand &&  < EditIcon />}
            
            </span>
            <span className="rightbarInfoValue" > 
            
            {expand &&  < SaveAltIcon onClick={savDets}/>}
            </span>
            
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
