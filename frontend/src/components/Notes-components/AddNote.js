import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNote, note } from "../../reducer/note";

export const AddNote = () => {

    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const colourSchemeState = useSelector((store) => store.user.toggleColourscheme);

    // Adds an empty object to the notes array in the backend
    // Each object is given an _id and delete: false properties
    const onAddNote = () => {
        dispatch(addNote(userId));
        dispatch(note.actions.setStatusMessage({ statusMessage: null }));
    };
 
    return (
        <section className="section-container">   
            <button 
                type="button" 
                // className="add-note-button"
                className={colourSchemeState ? "add-note-button-two" : "add-note-button-one"}
                onClick={onAddNote}>
                Add a note +
            </button>
        </section>
    );
};