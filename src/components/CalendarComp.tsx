import React, {useState} from "react"
import { NewEvent } from "./NewEvent";
import {Calendar} from "./Calendar";
import Plans from "./Plans";


export const CalendarComp = (props) => {
    //doplnit moje vyplnovacky
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="calendar-page">
            <div className='background-container'>
            <Calendar></Calendar>
            </div>
            <Plans/>
            <NewEvent/>

        </div>
    )
}

export default CalendarComp;

