import React from "react";
import { useSelector } from "react-redux";

import { LoaderDiv, LoaderAnimation } from "../styled-components/SignupLogin";
import { BasicP } from "../styled-components/GlobalStyle";

export const Loading = () => {

    const isLoading = useSelector((store) => store.user.isLoading);
    return (
        <>
            {isLoading &&
                <LoaderDiv>
                    <BasicP>Your organiser is loading</BasicP>
                    <LoaderAnimation></LoaderAnimation>
                </LoaderDiv>
            }
        </>
    );
};