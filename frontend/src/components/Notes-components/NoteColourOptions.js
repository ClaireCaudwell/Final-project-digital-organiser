import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateNote } from "../../reducer/note";

export const NoteColourOptions = ({ setShowColourOptions, noteItem }) => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const noteId = noteItem._id;

    // useEffect(() => {
    //     document.body.remove().addEventListener();
    // });

    const onUnclickOptions = () => {
        setShowColourOptions(false);
    };

    document.body.addEventListener("click", (event) => {
        const isButton = event.target.id === "colourButton";
        if(!isButton) {
            onUnclickOptions();
        }
    });

    const onChooseColour = (colourNumber) => {
        dispatch(updateNote(userId, noteId, null, colourNumber));
    };

    return (
        <div className="dropdown">
            <div className="Colour-square-container" onClick={onUnclickOptions}>
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