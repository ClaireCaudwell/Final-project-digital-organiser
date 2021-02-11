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
    // Null represents the noteText which we don't want to be updated when the colour is being updated
    const onChooseColour = (colourNumber) => {
        dispatch(updateNote(userId, noteId, null, colourNumber));
    };

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