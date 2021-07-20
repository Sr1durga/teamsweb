import React,{ createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
//var socket = io('https://localhost:3000', { transport : ['websocket'] });

const socket = io('https://socket-teams-backend.herokuapp.com');
//const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef({srcObject : ""});
  const userVideo = useRef();
  const connectionRef = useRef();
  const [ check , setCheck] = useState(false);

  useEffect(() => {
    if(!check)return;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      //console.log("hi");
      console.log("wassup bro");
      setStream(currentStream);
      // if(myVideo.current !== undefined){
         myVideo.current.srcObject = currentStream;
      // }
      // let video = myVideo.current;
      // video.srcObject = currentStream;
     
      }).catch((e) => {
  console.log(e);
      });
  },[check] );

 const togglCheck =() =>{
   setCheck(true);
 }

  useEffect(() => {
    
   
      
   console.log("tf is this ?");
    socket.on('me', (id) => {
      console.log("from context " + id);
      setMe(id);
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      console.log("calluser socekt")
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      togglCheck,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };