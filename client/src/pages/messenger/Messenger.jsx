import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";

import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { Send24Filled } from "@fluentui/react-icons";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef(io("https://socket-teams-backend.herokuapp.com"));
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("https://socket-teams-backend.herokuapp.com");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });


        });

    }, []);
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users);

        });
    }, [user]);


    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/api/conversations/" + user._id);
                console.log(res.data);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }

        };
        getConversations();
    }, [user._id]);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/api/messages/" + currentChat?._id);
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }


        };
        getMessages();
    }, [currentChat]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,


        };
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });
        try {
            const res = await axios.post("/api/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("");
        } catch (err) {
            console.log(err)

        }
    };


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })

    }, [messages])

    return (
        <>

            <Topbar />


            <div className="messenger">
                <Sidebar />
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {
                            conversations.map((c, index) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversation conversation={c} currentUser={user} key={index} />
                                </div>
                            ))
                        }




                    </div>


                </div>

                <div className="chatBoxWrapper">
                    {
                        currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {
                                        messages.map(m => (
                                            <div ref={scrollRef}>


                                                <Message message={m} own={m.sender === user._id} />
                                            </div>
                                        ))}


                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}>

                                    </textarea>
                                    <div className ="buttonspace">
                                    <button className="chatSubmitButton" onClick={handleSubmit}><Send24Filled primary fill ={"black"} />
                                    </button>
                                    </div>

                                </div>
                            </>
                        ) : (<span className="noConversationText">
                            Open a conversation to start a chat.
                        </span>)}


                </div>



               



            </div>


        </>
    );
}