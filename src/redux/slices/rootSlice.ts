 import { createSlice } from '@reduxjs/toolkit';

export interface HeroState {
    id: string,
    marvel_id: string,
    name: string,
    description: string,
    img: string,

}

const initialState: HeroState = {
    id: '',
    marvel_id: '',
    name: '',
    description: '',
    img: '',
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseMarvelId: (state, action) => { state.marvel_id = action.payload },
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseImg: (state, action) => { state.img = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const {
    chooseMarvelId,
    chooseName,
    chooseDescription,
    chooseImg
    
} = rootSlice.actions;