import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteNote, getNotes } from "../reducer/note"; 

export const Note = ({ noteItem }) => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);

    const noteId = noteItem._id;

    const onDelete = () => {
        dispatch(deleteNote(userId, noteId));
        dispatch(getNotes(userId));
    };

    return (
        <div className="note-container">
            <div className="delete-button-container">
                <button type="submit" className="delete-note-button" onClick={onDelete}>x</button>
            </div>
            <div className="text-container">
                <p>{noteItem.noteText}</p>
            </div>
        </div>
    );
};