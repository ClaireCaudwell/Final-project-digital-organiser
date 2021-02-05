import React, { useEffect } from "react";

export const NoteColourOptions = ({ setShowColourOptions, setColour }) => {

    useEffect(() => {
        document.body.remove().addEventListener();
    });

    const onUnclickOptions = () => {
        setShowColourOptions(false);
    };

    document.body.addEventListener("click", (event) => {
        const isButton = event.target.id === "colourButton";
        if(!isButton) {
            onUnclickOptions();
        }
    });

    // if the user clicks on a specifc colour the following will happen:
    // 1. The tick will be rendered on that square they click on
    // 2. And the colour of the post it note will change to the colour selected

    // const button = getElementById()
    // const onChooseColour = (event) => {
    //     if(button.className === "dark-green"){
    //         setColour(0);
    //     } else if(className === "light-green"){
    //         setColour(1);
    //     } else if(className === "light-blue"){
    //         setColour(2);
    //     } else {
    //         setColour(3);
    //     }
    // };

    return (
        <div className="dropdown">
            <div className="Colour-square-container" onClick={onUnclickOptions}>
                {/* <button 
                    className="colour-square dark-green" 
                    id="colourButton"

                    onClick={onChooseColour}>
                    &#x2713;
                </button>
                <button 
                    className="colour-square light-green" 
                    id="colourButton"
                    onClick={onChooseColour}>
                    &#x2713;
                </button>
                <button 
                    className="colour-square light-blue" 
                    id="colourButton"
                    onClick={onChooseColour}>
                    &#x2713;
                </button>
                <button 
                    className="colour-square light-grey" 
                    id="colourButton"
                    onClick={onChooseColour}>
                    &#x2713;
                </button> */}
            </div>
        </div>
    );
};