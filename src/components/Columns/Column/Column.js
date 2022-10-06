import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { updateColumnTitle } from "../../../redux/BoardSlice";
import CreateTask from "../../Tasks/CreateTask/CreateTask";
import { removeColumn } from "../../../redux/BoardSlice";
import TextAreaAutoHeight from "../../common/TextAreaAutoHeight";
import Task from "../../Tasks/Task/Task";
import "./style.scss";

const Column = ({ tasksList, column, index }) => {
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const { id } = column;
  const [title, setTitle] = useState(column.title);
  const [isFocus, setIsFocus] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);

  const handleFocus = (value) => {
    setIsFocus(value);
    if (value && titleRef?.current?.clientHeight) {
      setInputHeight(titleRef.current.clientHeight);
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="column__container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="column__content">
            <div
              className="column-header"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
                handleFocus(true);
              }}
              {...provided.dragHandleProps}
            >
              <div className="column-header__text">
                {isFocus ? (
                  <TextAreaAutoHeight
                    autoFocus
                    type="text"
                    className="column-header__input"
                    value={title}
                    maxLength="250"
                    height={inputHeight}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      dispatch(
                        updateColumnTitle({ id, title: e.target.value })
                      );
                    }}
                    onBlur={() => {
                      handleFocus(false);
                    }}
                  />
                ) : (
                  <div className="column-header__title cursor" ref={titleRef}>
                    {title}
                  </div>
                )}
              </div>

              <button
                className="button column-header__button"
                onClick={() => dispatch(removeColumn({ id }))}
              >
                🗑️
              </button>
            </div>
            <Droppable droppableId={id} type="TASK">
              {(provided) => (
                <ul
                  className="column__taskUl"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasksList.map((task, index) =>
                    task ? (
                      <Task key={task.id} task={task} index={index} />
                    ) : null
                  )}
                  {provided.placeholder}
                  <CreateTask colId={column.id} />
                </ul>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
