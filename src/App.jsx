import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getLanguages, translateText} from './redux/actions/trtanslateActions'
import './style.scss';
import Select from 'react-select';



const App = () => {
  const dispatch = useDispatch()
  const state = useSelector((store)=> store.translateState)
  const [text,setText]= useState('')
  const [sourceLang,setSourceLang]= useState({
    value:'tr',
    label:'Turkish'
  })
  const [targetLang,setTargetLang]= useState({
    value:'en',
    label:'English'
  })
  

  //kod ve name değerlerine sahip olan objelerin 
  // keylerini value ve label şeklinde değiştirdik 
  // kullanılan react-select kütüphanesi bu şekilde kullanıma izin verdiği için
 const refinedData= useMemo(() => { //useMemo fonksiyonları ön bellekte tutarak tekrar tekrar render olmasını engeller
   return state.languages.map((i)=>({ 
    value:i.code,
    label:i.name,
  }))
},[state.languages])

  useEffect(()=> {
    dispatch(getLanguages())
  },[])
 
  return (
    <div className='main-page'>
      <div className='container'>
        <h1>Translator</h1>
        {/* Üst Kısım */}
        <div className='upper'>
         <Select
         isLoading={state.isLoading}
         onChange={setSourceLang}
         value={sourceLang}
          className='select' options={refinedData}/>
          <button>Değiş</button>
          <Select
             isLoading={state.isLoading}
             value={targetLang}
             onChange={setTargetLang}
          className='select' options={refinedData}/>
        </div>
        {/* orta Kısım */}
        <div className='middle'>
          <textarea onChange={(e)=> setText(e.target.value)} placeholder='enter the text you want to translate'></textarea>
          <textarea disabled></textarea>
        </div>
        {/* alt kısım */}
       <button onClick={()=> {dispatch(translateText(sourceLang,targetLang,text))}} id='translate-btn'>Translate</button>
      </div>
      

    </div>
  )
}

export default App

