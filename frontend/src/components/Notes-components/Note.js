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

    // null is the fourth parameter for the colourNumber as don't want to update this in dispatch to the fetch to PATCH endpoint
    const onUpdateNote = () => {
        dispatch(updateNote(userId, noteId, noteText, null));
    };

    // Dispatching to the fetch to the DELETE endpoint in backend to delete the note object from the array
    const onDelete = () => {
        dispatch(deleteNote(userId, noteId));
    };

    // If true will mount the NoteColourOptions component
    const onClickOptions = () => {
        setShowColourOptions(true);
    };

    // When the array of notes is returned from the backend to redux and accessed in this component via useSelector, the colour property of each note will be read. It'll be a number between 0-3
    // This number is then used to set the background-colour for the note
    // The colours array represents the className for each of the colours in styled components
    // To get the className/colour that matches the colour number the note has, the colours array is used 
    // The index number for each element/className is matched to the the colour number for the note e.g. if a note has colour number 0 then the corresponding CSS className will be "colour-0" in the styled componenets etc
    const colours = ["colour-0","colour-1", "colour-2", "colour-3"];    

    // Concatenating the first string class name with the second
    // The second is made up of the colours array where the index matches the note's colour number
    return (
        <>
        <div className={"note-container " + colours[noteItem.colour]}>
            {showColourOptions && <NoteColourOptions setShowColourOptions={setShowColourOptions} noteItem={noteItem}/>}
            <div className="note-button-container">
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
                className={"note-textarea "  + colours[noteItem.colour]}
                type="text"
                value={noteText}
                onChange={event => setNoteText(event.target.value)}
                onBlur={onUpdateNote}
                maxLength="170"
                rows="6"
                cols="25"                 
            />
        </div>
        </>
    );
};