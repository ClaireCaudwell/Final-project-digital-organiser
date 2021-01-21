import React from "react";
import { NavLink } from "react-router-dom";


export const AddScheduleTaskButton = () => {

    return (
        <section className="schedule-component-container">
            <div>
                <h4>Add to your schedule</h4>
                <NavLink className="link" to="/addtask">
                    <button type="button" >Schedule</button>
                </NavLink>
            </div>
        </section>
    );
};