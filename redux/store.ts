import { configureStore } from "@reduxjs/toolkit";
import fishReducer from "./fishSlice";

export const store = configureStore({
    reducer: {
        fish: fishReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
