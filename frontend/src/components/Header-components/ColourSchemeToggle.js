import React from "react";

export const ColourSchemeToggle = () => {


    return (
        <div className="toggle-container">
            <label className="switch">
                <input 
                    type="checkbox"
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
};