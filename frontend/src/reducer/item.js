import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item: {
        itemId: 0,
        item: null,
        date: 0,
        time: 0,
        delete: false,
    }
};

export const scheduleItem = createSlice({
    name: "scheduleItem",
    initialState: initialState,
    reducers: {
        setItemId: (state, action) => {
            const { itemId } = action.payload;
            state.login.userId = itemId; 
        },
        setItem: (state, action) => {
            const { item } = action.payload;
            state.login.item = item; 
        },
    }
}); 