import React from "react";

export const Loading = () => {
    return (
        <div>
            {isLoading &&
                <p>Organiser is loading</p>
            }
        </div>
    );
};