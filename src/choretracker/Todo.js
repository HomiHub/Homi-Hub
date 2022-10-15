import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiFileEditLine } from 'react-icons/ri';


// This component deals with each individual chore/todo item in the list

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  // initializing "edit"
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  
  // used to set edits and change "chore"
  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // handles the edit and delete functions of the buttons
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <AiFillCloseCircle
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <RiFileEditLine
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;
