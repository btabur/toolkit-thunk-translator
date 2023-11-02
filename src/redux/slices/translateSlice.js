import { createSlice } from '@reduxjs/toolkit';
import { getLanguages } from '../actions/trtanslateActions';

const initialState = {
    isLoading: true,
    isError: false,
    languages: [],
    isTextLoading: false,
    isTextError: false,
    answer: '',
  };

  
  export const translateSlice = createSlice({
    name: 'translate',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getLanguages.pending, (state)=> {
                state.isLoading=true;

        })
        builder.addCase(getLanguages.fulfilled,(state,action)=> {
            state.isLoading=false;
            state.isError=false;
            state.languages;
            state.languages = action.payload;


        })
        builder.addCase(getLanguages.rejected,(state)=> {
            state.isLoading=false;
            state.isError=true;
            

        })

    }

  })