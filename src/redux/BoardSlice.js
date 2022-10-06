import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: {},
  columnOrder: [],
  tasks: {},
};

const BoardSlice = createSlice({
  name: "BoardSlice",
  initialState,
  reducers: {
    addColumnTask(state, action) {
      const { taskId, id, text } = action.payload;
      state.columns[id].text = text;
      state.columns[id].taskIds = [...state.columns[id].taskIds, taskId];
    },
    createColumn(state, action) {
      const { id, title } = action.payload;
      state.columns[id] = { id, title, taskIds: [] };
      state.columnOrder.push(id);
    },
    removeColumn(state, action) {
      const { id } = action.payload;
      state.columnOrder = state.columnOrder.filter((item) => item !== id);
      delete state.columns[id];
    },
    updateColumnTaskIndex(state, action) {
      const { newColumn } = action.payload;
      state.columns[newColumn.id] = newColumn;
    },
    updateOtherColumnTaskIndex(state, action) {
      const { newStart, newFinish } = action.payload;
      state.columns[newStart.id] = newStart;
      state.columns[newFinish.id] = newFinish;
    },
    updateColumnTitle(state, action) {
      const { id, title } = action.payload;
      state.columns[id].title = title;
    },
    createTask(state, action) {
      const { id, text, colId } = action.payload;
      state.tasks[id] = {
        id,
        text,
        colId,
      };

      // state.tasks = {
      //   ...state.tasks,
      //   [id]: {
      //     id,
      //     text,
      //     colId,
      //   },
      // };
    },
    removeTask(state, action) {
      const { id, colId } = action.payload;
      state.columns[colId].taskIds = state.columns[colId].taskIds.filter(
        (item) => item !== id
      );
      delete state.tasks[id];
    },
    reorderColumns(state, action) {
      const { columnOrder } = action.payload;
      state.columnOrder = columnOrder;
    },
  },
});

export const {
  addColumnTask,
  createColumn,
  removeColumn,
  updateColumnTaskIndex,
  updateOtherColumnTaskIndex,
  updateColumnTitle,
  createTask,
  removeTask,
  reorderColumns,
} = BoardSlice.actions;

export default BoardSlice.reducer;
