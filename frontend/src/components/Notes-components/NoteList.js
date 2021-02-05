import React from "react";
import { useSelector } from "react-redux";

import { Note } from "./Note";

export const NoteList = () => {
    const listOfNotes = useSelector((store) => store.note.notesArray);

    return (
        <section>
            {listOfNotes.map(notes => (
                <Note key={notes._id} noteItem={notes}/>
            ))}        
        </section>
    );
};