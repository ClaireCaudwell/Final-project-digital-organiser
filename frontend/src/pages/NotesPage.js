import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../components/Header-components/Header";
import { AddNote } from "../components/Notes-components/AddNote";
import { NoteList } from "../components/Notes-components/NoteList";
import { getNotes, note } from "../reducer/note";

import "./NotesPage.css"

export const NotesPage = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);

    useEffect(() => {
        dispatch(getNotes(userId));
        dispatch(note.actions.setStatusMessage({ statusMessage: null }));
    }, [dispatch, userId]);

    return (
        <>
            <Header />
            <main className="main-container">
                <AddNote />
                <NoteList />
            </main>
        </>
    );
};