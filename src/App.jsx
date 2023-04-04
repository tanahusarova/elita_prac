import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import React, { useState } from 'react';
import { CalendarComp } from './CalendarComp';

function App() {
  const [currentForm, setCurrentForm] = useState('calendar');

  const toggleForm = (formName :string) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
        currentForm === 'register' ? <Register onFormSwitch={toggleForm}/> :
        <CalendarComp onFormSwitch={toggleForm}/>
        }
    </div>
  );
}

export default App;
