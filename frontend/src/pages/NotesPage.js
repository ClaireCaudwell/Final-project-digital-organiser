import React from "react";

import { Header } from "../components/Header";
import { AddNote } from "../components/AddNote";
import { NoteList } from "../components/NoteList";
// import { note } from "../reducer/note";

export const NotesPage = () => {

    return (
        <>
            <Header />
            <main>
                <AddNote />
                <NoteList />
            </main>
        </>
    );
};