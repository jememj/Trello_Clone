import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import { createTask } from "../../../redux/BoardSlice";
import { addColumnTask } from "../../../redux/BoardSlice";

const CreateTask = ({ colId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleCreateTask = (e) => {
    if (text) {
      const taskId = uuidv4();
      dispatch(createTask({ id: taskId, text, colId }));
      dispatch(addColumnTask({ taskId, id: colId, text }));
      setText("");
    }
    e.preventDefault();
  };

  return (
    <form className="create-task" onSubmit={handleCreateTask}>
      <input
        className="create-task__input"
        placeholder="Add task"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button className="button create-task__button" onClick={handleCreateTask}>
        +
      </button>
    </form>
  );
};

export default CreateTask;
