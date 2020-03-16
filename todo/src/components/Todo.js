import React, { useState, useReducer } from "react";
import { initialState, todoReducer } from "../reducers/todoReducer";
import * as moment from "moment";

const Todo = () => {

    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [newTodo, updateNewTodo] = useState("");
    const [newDate, updateNewDate] = useState("MM/DD/YYYY");

    const handleChanges = e => {
        updateNewTodo(e.target.value);
      };
    
    const handleDate = e => {
        updateNewDate(e.target.value);
    }

    return(
        <div className="todo-page">
            <div className="todo-form">
                <label>
                    New To-Do Item:
                <input 
                    type="text"
                    name="newTodoText"
                    value={newTodo}
                    onChange={handleChanges}
                />
                </label>
                <label>
                    Date Due:
                    <input 
                        type="text"
                        name="newDateText"
                        value={newDate}
                        onChange={handleDate}
                    />
                </label>
                <button
                    onClick={() => dispatch({
                        type: "ADD_ITEM",
                        payload: {item: newTodo, due: newDate}
                    })}>
                    Add Item
                </button>
                <button
                    onClick={() => dispatch({
                        type: "CLEAR_DONE"
                    })}>
                    Clear Completed Tasks
                </button>
            </div>
            <div className="todo-list">
                <ul>
                {state.map(item => (
                    <li>
                        <div 
                            className={`todo-item ${item.completed? "done" : ""}`}
                            onClick={() => dispatch({
                                type: "TOGGLE_COMPLETED",
                                payload: item.id
                            })}>
                            {item.item}
                        </div>
                        {item.completed? (
                            <div className="done-date">
                                Done: {item.done.fromNow()}
                            </div>
                        ):
                            (item.due.diff(moment()) > 0)?
                                (<div
                                className="due-date">
                                    Due: {item.due.fromNow()}
                                </div>):
                                (<div
                                className="overdue-date">
                                    Due: {item.due.fromNow()}
                                </div>)
                            }
                    </li>
                ))}
                </ul>
                
            </div>
        </div>
    )
}

export default Todo;