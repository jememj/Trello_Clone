import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { createColumn } from "../../../redux/BoardSlice";
import "./style.scss";

const CreateColumn = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleCreateColumn = (e) => {
    e.preventDefault();
    if (title) {
      const id = uuid();
      dispatch(createColumn({ id, title }));
      setTitle("");
    }
  };

  return (
    <form className="create-column" onSubmit={handleCreateColumn}>
      <input
        className="create-column__input"
        type="text"
        placeholder="Add list"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="250"
      />
      <button className="button create-column__button">+</button>
    </form>
  );
};

export default CreateColumn;
