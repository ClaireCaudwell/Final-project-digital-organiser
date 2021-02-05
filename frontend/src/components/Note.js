import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteNote, updateNote, getNotes } from "../reducer/note";
import { NoteColourOptions } from "./NoteColourOptions";

export const Note = ({ noteItem }) => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const [ noteText, setNoteText ] = useState(noteItem.noteText);
    const [ showColourOptions, setShowColourOptions ] = useState(false);

    const noteId = noteItem._id;

    const onUpdateNote = () => {
        dispatch(updateNote(userId, noteId, noteText));
        dispatch(getNotes(userId));
    };

    const onDelete = () => {
        dispatch(deleteNote(userId, noteId));
        dispatch(getNotes(userId));
    };

    const onClickOptions = () => {
        setShowColourOptions(true);
    };

    return (
        <div className="note-container">
            <div className="input-note-container">
                <div className="button-container">
                    <button type="button" className="note-buttons" onClick={onClickOptions}>...</button>
                    <button type="button" className="note-buttons" onClick={onDelete}>x</button>
                </div>
                <textarea
                    className="note-input"
                    type="text"
                    value={noteText}
                    onChange={event => setNoteText(event.target.value)}
                    onBlur={onUpdateNote}
                    required
                    minLength="2"
                    maxLength="80"
                    rows="5"
                    cols="20"                 
                />
            </div>
            {showColourOptions && <NoteColourOptions />}
        </div>
    );
};