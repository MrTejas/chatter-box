import React from "react"
import Navbar from "../components/Navbar"
import Chat from "../components/Chat"
import Chats from "../components/Chats"
import Input from "../components/Input"
import Message from "../components/Message"
import Search from "../components/Search"
import Sidebar from "../components/Sidebar"


const Home = ()=>{
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}
export default Home