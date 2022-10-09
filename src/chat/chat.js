import React, { useRef, useState } from 'react';
import './chat.css';

import firebase from components;

import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//   // your config
// })

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();


function chat() {

  const [user] = useAuthState(auth);

  return (
    <div className="chat">
      <header>
        <h1>⚛️🔥💬</h1>
      </header>

      <section>
        <ChatRoom />
      </section>

    </div>
  );
}


function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;


  }

  return (<>

  </>)
}


function ChatMessage(props) {
  
}


export default chat;