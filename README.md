## toolkit thunk kullanımı

1. createAsyncThunk() :asekron işlemler yapıp sonucunu aşama aşama slice a bildiren asekron thunk fonksiyonudur.
- apiden gelen cevapları sırası ile slice a gönderir. bunun için arkaplanda  3 faklı metod kullanır.
 - pending :api cevap vermedi ise
 - fullfilled : api den başarılı cevap geldi ise
 - rejected : api den olumsuz cevap geldi ise

```javascript
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//iki parametre alır. 
// aksiyonun tipi
//asekron bir fonksiyon
export const getUser = createAsyncThunk("getUsers",async()=> {
    //veritabanı işlemleri
    const res = await axios("https://jsonplaceholder.typicode.com/todos");

    //aksiyonun payloadını belirleme

    return res.data;

})
```

2. actiondan gelen veriler slice da karşılanır. Thunk fonksiyonunda extraReducer() netodu kullanılır.

``` javascript
import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";

const initialState = {
    users:[],
    isLoading:true,
    isError:false
}

export const userSlice= createSlice({
    name:"users",
    initialState,
   //thunk aksiyonları için
    extraReducers: (builder) => {
       builder.addCase(getUser.pending,(state)=> {
        state.isLoading=true;
       })
       builder.addCase(getUser.fulfilled,(state,action)=> {
        state.isLoading=false;
        state.isError=false;
        state.users=action.payload;
       })
       builder.addCase(getUser.rejected,(state,action)=> {
        state.isLoading=false;
        state.isError=true
       })
    }
})
```
3. İşlemler fonksiyon olarak tanımlandığı için istenilen yerden çağrılabilir. Böylece kod kalabalığının önüne geçilmiş olur. dispatch ile de reducer a emir iletilir


`dispatch(getUser())`






### Notlar

1. useMemo() : Ağır hessaplamalar ve işlemler yapıldığında kulanılır. Önbelleğe kaydeder ve bağımlı değişken değiştiğinde sadece çalışır ve böylece gereksir render ların önüne geçer

```javascript
 const newCount = useMemo(()=> {
    [...new Array(1000000).forEach((item)=> {  
      // işlemler
    })]
    return count*2;
  },[count])
```

2. React.memo() : bileşenleri hafızada tutarak gereksiz renderların önüne geçer 
- Kapsayıcı bir bileşende bir state değiştiğinde kapsadığı tüm kısım tekrar render olur

 ```javascript
 import React, {memo} from 'react'

const Button = () => {
  return (
    <button>Artır</button>
  )
}

export default React.memo(Button)

 ```

 3. useCallBack() : fonksiyonu hafızada tutmaya yarar. 
 
 inputa bir değer girildiğinde handleClick fonksiyonu tekrar tekrar çalışmaması için kullanılır

 ```javascript
 const App = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = useState('');

  // fonksiyonu cache'leme (hafızada tutma)
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <p>{name}</p>
      <Button handleClick={handleClick} />
      <input type="text" onChange={(e) => setName(e.target.value)} />
    </div>
  );
};
 ```