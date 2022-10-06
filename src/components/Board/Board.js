import React from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  updateColumnTaskIndex,
  updateOtherColumnTaskIndex,
  reorderColumns,
} from "../../redux/BoardSlice";
import Column from "../Columns/Column/Column";
import CreateColumn from "../Columns/CreateColumn/CreateColumn";

const Board = () => {
  const dispatch = useDispatch();
  const [columns, columnOrder, tasks] = useSelector((state) => [
    state.BoardSlice.columns,
    state.BoardSlice.columnOrder,
    state.BoardSlice.tasks,
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (result.type === "COLUMN") {
      const result = Array.from(columnOrder);
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);
      dispatch(reorderColumns({ columnOrder: result }));
      return;
    }

    if (result.type === "TASK") {
      const start = columns[source.droppableId];
      const finish = columns[destination.droppableId];
      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, result.draggableId);
        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };
        dispatch(updateColumnTaskIndex({ newColumn }));
        return;
      }
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, result.draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };
      dispatch(updateOtherColumnTaskIndex({ newStart, newFinish }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <main
            className="board__container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              const tasksList = column.taskIds.map((taskId) => tasks[taskId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasksList={tasksList}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
            <CreateColumn />
          </main>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
