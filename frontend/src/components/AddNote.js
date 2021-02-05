import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNote, getNotes, note } from "../reducer/note";

export const AddNote = () => {

    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);

    // Adds an empty object to the notes array in the backend
    // Each object is given an _id and delete: false properties
    const onAddNote = () => {
        dispatch(addNote(userId));
        dispatch(getNotes(userId));
        dispatch(note.actions.setStatusMessage({ statusMessage: null }));
    };
 
    return (
        <section>   
            <div className="add-schedule-container">
                <h4 className="add-note-text">Add a note</h4>
                <button type="button" onClick={onAddNote}>
                    +
                </button>
            </div>
        </section>
    );
};