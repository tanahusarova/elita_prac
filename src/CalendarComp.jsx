import React, {useState} from "react"
import { DatePicker } from "./components/DatePicker";
import { NewEvent } from "./components/NewEvent";
import { Calendar } from "./components/Calendar";
import Plans from "./components/Plans";


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
            <Calendar />
            </div>
            <Plans/>
            <NewEvent/>

        </div>
    )
}