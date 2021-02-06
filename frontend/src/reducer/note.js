import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notesArray: [], 
    statusMessage: null,
    errorMessage: null,
};

export const note = createSlice({
    name: "note",
    initialState: initialState,
    reducers: {
        setNotesArray: (state, action) => {
            const { arrayOfNotes } = action.payload;
            state.notesArray = arrayOfNotes;
        },
        setStatusMessage: (state, action) => {
            const { statusMessage } = action.payload;
            state.statusMessage = statusMessage; 
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.errorMessage = errorMessage; 
        },
        setLogOut: (state) => {
            state.notesArray = [];
            state.statusMessage = null;
            state.errorMessage = null;
        }
    }
});

// Thunk for adding a note
export const addNote = (userId) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/note`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Couldn't retrieve note"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(note.actions.setStatusMessage({ statusMessage: json.statusMessage}));
        })
        .catch((error) => {
            dispatch(note.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
        .finally(() => {
            dispatch(getNotes(userId));
        })
    };
};

// Thunk for getting the array of notes
export const getNotes = (userId) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/note`,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "No notes"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(note.actions.setNotesArray({ arrayOfNotes: json.notes }));
            dispatch(note.actions.setStatusMessage({ statusMessage: json.statusMessage}));
        })
        .catch((error) => {
            dispatch(note.actions.setErrorMessage({ errorMessage: error.toString() }));
        })
    };
};

export const updateNote = (userId, noteId, noteText, colourNumber) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/note/${noteId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ noteText, colourNumber }),
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Couldn't update note"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(note.actions.setStatusMessage({ statusMessage: json.statusMessage}));
        })
        .catch((error) => {
            dispatch(note.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
        .finally(() => {
            dispatch(getNotes(userId));
        })
    };
};

export const deleteNote = (userId, noteId) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/note/${noteId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "No note to delete"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(note.actions.setStatusMessage({ statusMessage: json.statusMessage}));
        })        
        .catch((error) => {
            dispatch(note.actions.setErrorMessage({ errorMessage: error.toString() }));
        })
        .finally(() => {
            dispatch(getNotes(userId));
        })
    };
};