import "./online.css";
import Button from '@material-ui/core/Button';
import { useContext } from "react";
import axios from'axios';

import {Add16Filled } from '@fluentui/react-icons';
import { AuthContext } from "../../context/AuthContext";
import {  useToasts } from 'react-toast-notifications';
import {  useHistory} from 'react-router-dom';
export default function Online({userDets}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const { addToast } = useToasts();

const history = useHistory();
 const addToConvo = async() => {
   const senderId = user._id;
   console.log("s");
   console.log(senderId);
   const receiverId = userDets._id;
   console.log(receiverId);
   try {
    const res = await axios.post('http://localhost:8090/api/conversations' ,{
      senderId,
      receiverId,
    });
    addToast('You can start chatting', { appearance: 'success' , autoDismiss: true });
         
         setTimeout(() => {
  history.push('/messenger'
  )
         } , 3000);

    console.log(res);
   } catch (error) {
    addToast('You cant start chatting', { appearance: 'error' , autoDismiss: true });
   }
 }
 //addfolower
 const addfollow =async() =>{
  
  console.log("s");
  const userId = user._id;
  console.log(userId);
  const followId = userDets._id;
  console.log(followId);
  console.log("r");
  try {
   const res = await axios.put(`http://localhost:8090/api/users/${followId}/follow` , {
   userId
   });
  
    if(res.data.success === true){
      addToast('Following ' + userDets.username, { appearance: 'success' , autoDismiss: true });
      addToConvo();
      setTimeout( () => {
        window.location.reload();
      } , 1800);
    }else {
      addToast('You are already following ' + userDets.username, { appearance: 'info' , autoDismiss: true });
    }
       

   console.log(res);
  } catch (error) {
    console.log(error);
   
  }
}


 
  return (
    
    <div className="friendsContainer">
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" 
        src={userDets?.profilePicture
            ? PF + userDets.profilePicture
            : PF + "person/noAvatar.png"}
         alt=" "/>
        <span className="rightbarOnline"></span>
      </div>
      <div className="nameContainer">
      <span className="rightbarUsername">{userDets.username} 

      </span>
      </div>
      <div className="friendsSpace"> </div>
      <span>
      
     <div className="rightbarButton">
     <Button onClick={addfollow}>
       
     {<Add16Filled primaryFill="white"/>}
     </Button>
     </div>
     </span>
     

      
    </li>
    </div>
    
  );

}