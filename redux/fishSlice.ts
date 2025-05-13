// redux/fishSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FishState {
    fishes: string[];
}

const initialState: FishState = {
    fishes: [],
};

const fishSlice = createSlice({
    name: 'fish',
    initialState,
    reducers: {
        setFishes: (state, action: PayloadAction<string[]>) => {
            state.fishes = action.payload;
        },
    },
});

export const { setFishes } = fishSlice.actions;
export default fishSlice.reducer;
