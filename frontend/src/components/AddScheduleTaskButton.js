import React from "react";
import { Link } from 'react-router-dom';

export const AddScheduleTaskButton = () => {

    return (
        <section className="schedule-component-container">
            <div>
                <h4>Add to your schedule</h4>
                <button>
                    <Link className="link" to="/addtask">Schedule</Link>
                </button>
            </div>
        </section>
    );
};