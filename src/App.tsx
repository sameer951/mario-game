import React, { useState } from "react";
import { BoardComponet } from "./app/components/board.componet";

export default function App() {

  const [state, setState] = useState({ row: 10, column: 10 });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  }
  return (
    <div className="App container-fluid">
      <div className="row">
        <input type="text" className="form-control col-3 m-2" name='row' value={state.row} placeholder="row" onChange={handleChange} />
        <input type="text" className="form-control col-3 m-2" name='column' value={state.column} placeholder="columns" onChange={handleChange} />
      </div>
      <div className="mt-5">
        <BoardComponet row={state.row} column={state.column}></BoardComponet>
      </div>
    </div>
  );
}