import React from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import "./style.scss";
import { removeTask } from "../../../redux/BoardSlice";

const Task = ({ task, index }) => {
  const dispatch = useDispatch();
  const { id, colId } = task;

  const deleteTask = () => {
    dispatch(removeTask({ id, colId }));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className="task cursor"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task__name">{task.text}</div>
          <button className="button task__button" onClick={deleteTask}>
            🗑️
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
