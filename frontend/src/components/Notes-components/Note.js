import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteNote, updateNote } from "../../reducer/note";
import { NoteColourOptions } from "./NoteColourOptions";

export const Note = ({ noteItem }) => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const [ noteText, setNoteText ] = useState(noteItem.noteText);
    const [ showColourOptions, setShowColourOptions ] = useState(false);
    const [ colour, setColour ] = useState(0);

    const noteId = noteItem._id;

    const onUpdateNote = () => {
        dispatch(updateNote(userId, noteId, noteText));
    };

    const onDelete = () => {
        dispatch(deleteNote(userId, noteId));
    };

    const onClickOptions = () => {
        setShowColourOptions(true);
    };


    return (
        <>
        {/* <div 
            className="note-container" 
            className={colour === 0 ? "dark-green" : colour === 1 ? "light-green" : colour === 2 ? "light-blue" : "light-grey"} >
            <div className="input-note-container">
                {showColourOptions && <NoteColourOptions setShowColourOptions={setShowColourOptions} setColour={setColour}/>}
                <div className="button-container">
                    <button type="button" className="note-buttons show" onClick={onClickOptions}>...</button>
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
        </div> */}
        </>
    );
};