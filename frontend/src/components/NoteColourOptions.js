import React from "react";

export const NoteColourOptions = () => {

    return(
        <>
        <div className="Colour-square-container">
            <button className="colour-square dark-green">&#x2713;</button>
            <button className="colour-square light-green"></button>
            <button className="colour-square light-blue"></button>
            <button className="colour-square light-grey"></button>
        </div>
        </>
    );
};