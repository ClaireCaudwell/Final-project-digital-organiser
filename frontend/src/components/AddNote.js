import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNote, getNotes, note } from "../reducer/note"; 

export const AddNote = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);

    const [ noteText, setNoteText ] = useState("");

    useEffect(() => {
        dispatch(note.actions.setStatusMessage({ statusMessage: null }));
    }, [dispatch]);

    const onAddNote = (event) => {
        event.preventDefault();
        dispatch(addNote(userId, noteText));
        dispatch(getNotes(userId));
        dispatch(note.actions.setStatusMessage({ statusMessage: null }));
        setNoteText("");
    };
 
    return (
        <section>          
            <div>
                <input
                    type="text"
                    value={noteText}
                    onChange={event => setNoteText(event.target.value)}
                    required
                    minLength="2"
                    maxLength="80"                 
                />
                <div className="wrapper">
                    <h4>Type & add</h4>
                    <button type="submit" onClick={onAddNote}>+</button>
                </div>                
            </div>
        </section>
    );
};