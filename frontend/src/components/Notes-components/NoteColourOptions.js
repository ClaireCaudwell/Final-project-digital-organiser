import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateNote } from "../../reducer/note";
import { 
    ColourSquareContainer, 
    DropdownColourMenu,
    ColourSquare
} from "../../styled-components/NotesPage";

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

    // Arrays of names for the background colours and hover colours for the colour squares
    // Passing them in as props to the styled component and based on this string sent in the property is matched in the light or dark theme document
    const colours = ["noteColourZero", "noteColourOne", "noteColourTwo", "noteColourThree"];
    const hoverColours = ["noteHoverColourZero", "noteHoverColourOne", "noteHoverColourTwo", "noteHoverColourThree"];

    return (
        <DropdownColourMenu>
            <ColourSquareContainer onClick={onUnclickOptions}>
                <ColourSquare
                    noteColour={colours[0]}
                    hoverColour={hoverColours[0]}
                    id="colourButton"
                    onClick={() => onChooseColour(0)}
                ></ColourSquare>
                <ColourSquare 
                    noteColour={colours[1]} 
                    hoverColour={hoverColours[1]}
                    id="colourButton"
                    onClick={() => onChooseColour(1)}
                ></ColourSquare>
                <ColourSquare 
                    noteColour={colours[2]}
                    hoverColour={hoverColours[2]}
                    id="colourButton"
                    onClick={() => onChooseColour(2)}
                ></ColourSquare>
                <ColourSquare 
                    noteColour={colours[3]}
                    hoverColour={hoverColours[3]} 
                    id="colourButton"
                    onClick={() => onChooseColour(3)}
                ></ColourSquare>
            </ColourSquareContainer>
        </DropdownColourMenu>
    );
};