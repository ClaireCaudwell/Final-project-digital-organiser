import React from "react";
import { NavLink } from "react-router-dom";

export const AddScheduleTaskButton = () => {

    return (
        <section className="schedule-component-container">          
            <div className="add-schedule-container">
                <h4>Add to your schedule</h4>
                <NavLink className="link" to="/addedittask">
                    <button type="button" >+</button>
                </NavLink>
            </div>
        </section>
    );
};