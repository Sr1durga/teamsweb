import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import CalendarNew from "../calendar/Calendar";
import {useState} from 'react';
import "./home.css"

export default function Home() {


  const [render, setRender] = useState(2);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        {render ===1 &&  <Feed/>}
        {render ===2 &&  <CalendarNew/>}
        
        
        <Rightbar/>
      </div>
    </>
  );
}
