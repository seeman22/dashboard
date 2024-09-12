import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Router } from 'react-router-dom';
import Routerpath from './router/Routerpath';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { handletoken } from './redux/reducers/AuthReducers';

function App() {
  const dispatch=useDispatch();
  const userdata=localStorage.getItem('userdata');
  
  useEffect(()=>{
    console.log(userdata , "=====>userdata");
    const parsedData = JSON.parse(userdata||"{}");
    dispatch(handletoken(parsedData));
  },[userdata])

  return (
    <div className="App">
      
    <Routerpath/>
    </div>
  );
}

export default App;
