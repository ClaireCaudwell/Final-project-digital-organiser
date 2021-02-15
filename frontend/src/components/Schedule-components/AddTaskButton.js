import React from "react";

import { BasicContainer, BasicLink } from "../../styled-components/GlobalStyle";
import { AddTaskContainer, AddButton, AddTaskParagraph } from "../../styled-components/Schedule";

export const AddTaskButton = () => {

    return (
        <BasicContainer>          
            <AddTaskContainer>
                <BasicLink to="/addtask">
                    <AddButton type="button" >Add task +</AddButton>
                </BasicLink>
                <AddTaskParagraph>Click on a task in your schedule to edit or delete</AddTaskParagraph>
            </AddTaskContainer>
        </BasicContainer>
    );
};