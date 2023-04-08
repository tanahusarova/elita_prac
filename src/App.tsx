import './App.css';
import { Login } from './main_pages/Login';
import { Register } from './main_pages/Register';
import { CalendarPage } from './main_pages/CalendarPage';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropsIdUser from './components/props/PropsIdUser';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [idOfLoggedUser, setIdOfUser] = useState(new PropsIdUser(5));

  const toggleForm = (formName:string) => {
    setCurrentForm(formName);
  }

  return (
    <BrowserRouter>
    <div className="App">
      {
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<CalendarPage {...idOfLoggedUser}/>} />

        </Routes>
        /*
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
        currentForm === 'register' ? <Register onFormSwitch={toggleForm}/> :
        <CalendarComp onFormSwitch={toggleForm}/>


         currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
        <Register onFormSwitch={toggleForm}/>

        */
        }
    </div>
    </BrowserRouter>
  );
}

export default App;
