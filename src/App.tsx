import './App.css';
import { Login } from './main_pages/Login';
import { Register } from './main_pages/Register';
import { CalendarPage } from './main_pages/CalendarPage';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import setAuthToken from "./auth";
import PropsIdUser from './components/props/PropsIdUser';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [idOfLoggedUser, setIdOfUser] = useState(new PropsIdUser(5));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  const toggleForm = (formName:string) => {
    setCurrentForm(formName);
  }

  useEffect(() => {
    // Check for token to keep user logged in
    if (localStorage.getItem("jwtToken")) {
      // Set auth token header auth
      const token = localStorage.getItem("jwtToken");
      setAuthToken(token!);
      // Decode token and get user info and exp
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <BrowserRouter>
    <div className="App">
      {
        <Routes>
        <Route path="/login" element={isAuthenticated ? <CalendarPage {...idOfLoggedUser}/> : <Login />} />
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
