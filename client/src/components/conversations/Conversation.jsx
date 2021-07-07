import "./conversation.css";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoChatModal from './VideoChatModal';

export default function Conversation({conversation,currentUser}) {
    const [user,setUser] =useState(null);
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    




    useEffect(() =>{
        const friendId = conversation.members.find((m)=>m !== currentUser._id)  
    const getUser = async () =>{
       try{
        //const res = await axios(`/api/users//`+friendId); 
        const res = await axios(`http://localhost:8090/api/users/${friendId}` );  
         //console.log(res);
        setUser(res.data);
       }catch(err){
         console.log(err);  
       }
    
    };
     getUser()     
    //console.log(user);  
   },
   [currentUser,conversation] );
    return (
        <div className="conversation">
        <img className="conversationImg" 
        src={user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"}
         alt=" "/>
        <span className ="conversationName">{user?.username}</span>
        <span>< VideoChatModal name={user?.username}/></span>
        </div>
    )
}
