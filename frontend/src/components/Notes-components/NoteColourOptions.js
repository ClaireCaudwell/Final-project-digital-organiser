import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateNote } from "../../reducer/note";

export const NoteColourOptions = ({ setShowColourOptions, noteItem }) => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const noteId = noteItem._id;

    const onUnclickOptions = () => {
        setShowColourOptions(false);
    };

    // When user doesn't click a button to choose a colour and instead clicks on to the body of the document the onClickedOptions will be set to false and this component will be de-mounted 
    document.body.addEventListener("click", (event) => {
        const isButton = event.target.id === "colourButton";
        if(!isButton) {
            onUnclickOptions();
        }
    });

    // Dispatch to do the fetch for the PATCH endpoint to set the colour number in the notes colour property
    const onChooseColour = (colourNumber) => {
        dispatch(updateNote(userId, noteId, null, colourNumber));
    };

    // User clicks on a button to select which colour they want the note to be
    // This send a specific number to the onChooseColour function
    // The onChooseColour function dispatches the colourNumber and other info to the fetch for the PATCH endpoint in the backend
    // This will set the note object in the user model to that number
    // Sending the textNote in as null as we only want the colourNumber to be updated in the fetch when doing this action 
    return (
        <div className="dropdown-color-menu">
            <div className="colour-square-container" onClick={onUnclickOptions}>
                <button 
                    className="colour-square colour-0 colour-0-hover" 
                    id="colourButton"
                    onClick={() => onChooseColour(0)}
                ></button>
                <button 
                    className="colour-square colour-1 colour-1-hover" 
                    id="colourButton"
                    onClick={() => onChooseColour(1)}
                ></button>
                <button 
                    className="colour-square colour-2 colour-2-hover" 
                    id="colourButton"
                    onClick={() => onChooseColour(2)}
                ></button>
                <button 
                    className="colour-square colour-3 colour-3-hover" 
                    id="colourButton"
                    onClick={() => onChooseColour(3)}
                ></button>
            </div>
        </div>
    );
};