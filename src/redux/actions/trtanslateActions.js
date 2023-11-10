import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from '../../constans/index';


export const getLanguages = createAsyncThunk("getLanguages", async()=> {
    const res = await axios.request(options)


    //slice a göndermek istediğimiz veri
   return res.data.data.languages;
});

//çeviri için istek atma

export const translateText = createAsyncThunk("translateText", 
  async (param)=> {

    //api isteği

const params = new URLSearchParams();
params.set('source_language', param.sourceLang.value);
params.set('target_language', param.targetLang.value);
params.set('text', param.text);

const options2 = {
  method: 'POST',
  url: 'https://text-translator2.p.rapidapi.com/translate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '28f66ef8c2mshf0f2a43acd94a34p1552fejsn50d66535fa1c',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
  data: params,
};
const res = await axios.request(options2)
return res.data.data.translatedText;

})


