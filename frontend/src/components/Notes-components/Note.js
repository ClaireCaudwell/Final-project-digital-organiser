import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteNote, updateNote } from "../../reducer/note";
import { NoteColourOptions } from "./NoteColourOptions";

export const Note = ({ noteItem }) => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const [ noteText, setNoteText ] = useState(noteItem.noteText);
    const [ showColourOptions, setShowColourOptions ] = useState(false);

    const noteId = noteItem._id;

    // null is the fourth parameter for the colourNumber as don't want to update in this dispatch to the fetch
    const onUpdateNote = () => {
        dispatch(updateNote(userId, noteId, noteText, null));
    };

    const onDelete = () => {
        dispatch(deleteNote(userId, noteId));
    };

    const onClickOptions = () => {
        setShowColourOptions(true);
    };

    const colours = ["colour-0","colour-1", "colour-2", "colour-3"];
    
    return (
        <>
        <div className="note-container">
            <div className={"input-note-container " + colours[noteItem.colour]}>
                {showColourOptions && <NoteColourOptions setShowColourOptions={setShowColourOptions} noteItem={noteItem}/>}
                <div className="button-container">
                    <button 
                        type="button" 
                        className={"note-buttons "  + colours[noteItem.colour]} 
                        onClick={onClickOptions}>
                            ...
                    </button>
                    <button 
                        type="button" 
                        className={"note-buttons "  + colours[noteItem.colour]} 
                        onClick={onDelete}>
                            x
                    </button>
                </div>
                <textarea
                    className={"note-input "  + colours[noteItem.colour]}
                    type="text"
                    value={noteText}
                    onChange={event => setNoteText(event.target.value)}
                    onBlur={onUpdateNote}
                    required
                    minLength="2"
                    maxLength="170"
                    rows="6"
                    cols="20"                 
                />
            </div>
        </div>
        </>
    );
};