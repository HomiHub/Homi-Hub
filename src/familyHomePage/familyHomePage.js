import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../components/firebase";
import {db} from "../components/firebase";
import { set, ref, onValue } from "firebase/database";

function FamilyHomePage() {

  let navigate = useNavigate();
  const[email, setEmail] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const id = auth.currentUser.uid;

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      console.log(data);
      if(data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  const handleEmailChange=(e) => {
    setEmail(e.target.value)
  };

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const logout = async () => {
    await signOut(auth);
  };

  

  return (
    <div>
        <h1>Welcome to your family page</h1>
        {todos.map((query) => (
          <>
            <p>{query.hello}</p>
            <button>Testing</button>
          </>
        ))}
    </div>
  );
}

export default FamilyHomePage;