import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteNote, updateNote } from "../../reducer/note";
import { NoteColourOptions } from "./NoteColourOptions";

import { 
    NoteContainer,
    NoteButtonContainer,
    NoteButton,
    NoteTextArea

} from "../../styled-components/NotesPage";

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
    // The index number for each element/className is matched to the the colour number for the note e.g. if a note has colour number 0 then the corresponding CSS className will be "noteColourZero" in the styled componenets etc
    const colours = ["noteColourZero", "noteColourOne", "noteColourTwo", "noteColourThree"];

    // Concatenating the first string class name with the second
    // The second is made up of the colours array where the index matches the note's colour number
    return (
        <>
        <NoteContainer noteColour={colours[noteItem.colour]}>
            {showColourOptions && <NoteColourOptions setShowColourOptions={setShowColourOptions} noteItem={noteItem}/>}
            <NoteButtonContainer>
                <NoteButton
                    type="button" 
                    buttonColour={colours[noteItem.colour]} 
                    onClick={onClickOptions}>
                        ...
                </NoteButton>
                <NoteButton 
                    type="button" 
                    buttonColour={colours[noteItem.colour]} 
                    onClick={onDelete}>
                        x
                </NoteButton>
            </NoteButtonContainer>
            <NoteTextArea
                className={colours[noteItem.colour]}
                type="text"
                value={noteText}
                onChange={event => setNoteText(event.target.value)}
                onBlur={onUpdateNote}
                maxLength="170"
                rows="6"
                cols="25"                 
            />
        </NoteContainer>
        </>
    );
};