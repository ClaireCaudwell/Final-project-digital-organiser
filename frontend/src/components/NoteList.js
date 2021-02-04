import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getNotes } from "../reducer/note";
import { Note } from "./Note";

export const NoteList = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const listOfNotes = useSelector((store) => store.note.notesArray);

    useEffect(() => {
        dispatch(getNotes(userId));
    }, [dispatch, userId]);

    return (
        <section>
            {listOfNotes.map(notes => (
                <Note key={notes._id} noteItem={notes}/>
            ))}        
        </section>
    );
};