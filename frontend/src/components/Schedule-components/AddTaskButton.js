import React from "react";
import { NavLink } from "react-router-dom";

export const AddTaskButton = () => {

    return (
        <section className="section-container">          
            <div className="add-task-container">
                <NavLink to="/addtask">
                    <button type="button" >Add date +</button>
                </NavLink>
                <p>Click on a date in your schedule to edit or delete</p>
            </div>
        </section>
    );
};