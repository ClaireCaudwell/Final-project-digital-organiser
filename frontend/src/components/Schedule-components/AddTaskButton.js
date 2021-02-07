import React from "react";
import { NavLink } from "react-router-dom";

export const AddTaskButton = () => {

    return (
        <section className="schedule-div">          
            <div className="add-task-container">
                <NavLink to="/addtask">
                    <button type="add-task-button" >Add date +</button>
                </NavLink>
                <p>Click on a scheduled item to edit or delete</p>
            </div>
        </section>
    );
};