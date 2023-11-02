import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from '../../constans/index';


export const getLanguages = createAsyncThunk("getLanguages", async()=> {
    const res = await axios.request(options)


    //slice a göndermek istediğimiz veri
   return res.data.data.languages;
})