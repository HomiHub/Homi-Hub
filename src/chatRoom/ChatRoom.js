import React, { useEffect, useRef, useState } from "react";
import { db, firestore } from "../components/firebase";
import { useAuth } from "../components/auth";
import "./chatroom.css"
import { collection, addDoc, getDocs, onSnapshot, doc, getDoc, serverTimestamp, useCollectionData, limit, orderBy } from "firebase/firestore";
import { get, query, ref, set } from "firebase/database";
import { FirebaseError } from "firebase/app";
 function ChatRoom() {

    const authUser = useAuth().user;    
    const[userFamily, setUserFamily] = useState(null);
    const[message, setMessage] = useState("");
    

    const messagesRef = collection(firestore, `/families/${userFamily}/messages`);

    getCurrentUserFamily();

    const [allMessages, setAllMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMouseOver, setMouseOver] = useState(false);

    //used to automatically scroll to the last message
    const dummy = useRef()

    useEffect(() => {
        loadMessages();
        console.log("here then?");
    },[userFamily]);

     function loadMessages() {
        const messagesQuery = query(
            messagesRef, 
            orderBy('createdAt', 'desc'),
            limit(50),
        );
        onSnapshot(messagesQuery, (messagesSnapshot) => {
            console.log("priting... ", messagesSnapshot);
            setAllMessages([]);
             messagesSnapshot.forEach((mess)=>{
                setAllMessages(msgs => [...msgs, mess.data()]);
            });
            console.log("CAREFULL!");
            setLoading(false);
            console.log("true");
        })
    }

    const hadnleMessageChange= (e) => {
        setMessage(e.target.value);
    }

    function handleMouseOver(){
        setMouseOver(true);
    };
    
    function handleMouseOut(){
    setMouseOver(false);
    };
    

    function getCurrentUserFamily() {
        if(authUser !== null) {
            const currentUserUid = authUser.uid;
            const userRef = ref(db,`users/${currentUserUid}`);
            get(userRef).then((snapshot) => {
                let tempFams = snapshot.val();
                setUserFamily(Object.keys(tempFams.families)[0]);
            });
        }
    }

    async function sendMessage(e) {
        e.preventDefault();
        if(message === "") {return}
        await addDoc(messagesRef, {
            createdAt: serverTimestamp(),
            text: message,
            uid: authUser.uid 
        });
        setMessage("");

        dummy.current.scrollIntoView({behavior: 'smooth'});
    }


    function ChatMessage(props) {
        const text = props.message.text;
        const muid = props.message.uid;
        const messageClass = muid === authUser.uid? 'sent' : 'received';

        return (
            <div className={`message${messageClass}`}>
                <p> {text} </p>
            </div>
        )
    }


    if(loading){
        return <p>loading chat...</p>
    }
    else{
        return ( 
            <div>
                <p>Welcome to the Family Chat Room!</p>
                <div className="chatbox">
                    {allMessages && allMessages.reverse().map((msg)=> <ChatMessage key={msg.createdAt} message={{text: msg.text, uid: msg.uid}}/>)}
                    <div ref={dummy}></div>
                </div>
                <form className="form" onSubmit={sendMessage}>
                        <input className="messageInput" type="text" placeholder="Message" value={message} onChange={hadnleMessageChange}/>
                        <button className="messageButton" type="submit"  style={{backgroundColor: isMouseOver ? "black": "#369dfc" }} onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}>send</button>
                </form>
            </div>
        );
    }
}

export default ChatRoom;