import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNote, note } from "../../reducer/note";
import { AddButton } from "../../styled-components/Schedule";
import { AddNoteSection } from "../../styled-components/NotesPage";

export const AddNote = () => {

    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);

    const onAddNote = () => {
        dispatch(addNote(userId));
        dispatch(note.actions.setStatusMessage({ statusMessage: null }));
    };
 
    return (
        <AddNoteSection>   
            <AddButton 
                type="button"
                onClick={onAddNote}>
                Add note +
            </AddButton>
        </AddNoteSection>
    );
};