import React, {useState} from "react"
import { NewEvent } from "../components/NewEvent";
import {Calendar} from "../components/Calendar";
import Plans from "../components/Plans";
import SharedInformations from "../components/SharedInformations";
import PropsIdUser from "../components/props/PropsIdUser";


export const CalendarPage = (id:PropsIdUser) => {
    let inf = SharedInformations.getInstance();
    inf.date = '2008-11-11';
    inf.idOfLoggedUser = id.id;
    const [informations, setInf] = useState(inf);

    function handleDateChoice(d:string) {
        let tmp = informations;
        tmp.date = d;
        setInf(tmp);
      }

    return (
        <div className="calendar-page">
            <div className='background-container'>
            <Calendar handleDateChoice={handleDateChoice}/> 
            </div>
            <Plans {...informations}/>
            <NewEvent/>

        </div>
    )
}

export default CalendarPage;

//cez kalendar potrebujem posunut datum do plans, a cez vyber posuniem generatoru aj meno prihlaseneho a uzivatela ktoreho si vybral