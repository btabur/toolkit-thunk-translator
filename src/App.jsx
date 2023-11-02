import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getLanguages} from './redux/actions/trtanslateActions'

import './style.scss';



const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getLanguages())
  },[])
 
  return (
    <div className='main-page'>
      <div className='container'>
        <h1>Translator</h1>
        {/* Üst Kısım */}
        <div className='upper'>
          <select></select>
          <button>Değiş</button>
          <select></select>
        </div>
        {/* orta Kısım */}
        <div className='middle'>
          <textarea placeholder='enter the text you want to translate'></textarea>
          <textarea disabled></textarea>
        </div>
        {/* alt kısım */}
       <button id='translate-btn'>Translate</button>
      </div>
      

    </div>
  )
}

export default App

