import React, {useEffect, useState} from "react"
import { NewEvent } from "../components/NewEvent";
import {Calendar} from "../components/Calendar";
import Plans from "../components/Plans";
import SharedInformations from "../components/SharedInformations";
import PropsIdUser from "../components/props/PropsIdUser";
import PropsNewEvent from "../components/props/PropsNewEvent";


export const CalendarPage = (id:PropsIdUser) => {
    let inf = SharedInformations.getInstance();
    inf.date = '2008-11-11';
    inf.idOfLoggedUser = id.id;
    const [informations, setInf] = useState(inf);
    const [propsNewEvent, setPropsNewEvent] = useState(new PropsNewEvent('', '', '', '', '0x8ba613'));


    function handleDateChoice(d:string) {
        let tmp = informations;
        tmp.date = d;
        setInf(tmp);
      }

      function handlePropsChange(name: string, time_from: string,time_to: string,
        comment: string, colour:string) {
        
        setPropsNewEvent(new PropsNewEvent(name, time_from, time_to, comment, colour));
      }

      function handleEventChoice(event:PropsNewEvent) {
        setPropsNewEvent(event);
      }

      useEffect(() => {
      }, [propsNewEvent]);

    //do new event sa musi dostat natiahnuty event z plans, z toho na ktore sa kliklo
    return (
        <div className="calendar-page">
            <div className='background-container'>
            <Calendar handleDateChoice={handleDateChoice}/> 
            </div>
            <Plans handleEventChoice={handleEventChoice} sharedInformations={informations}/>
            <NewEvent event={propsNewEvent} sharedInformations={informations}/>

        </div>
    )
}

export default CalendarPage;

//cez kalendar potrebujem posunut datum do plans, a cez vyber posuniem generatoru aj meno prihlaseneho a uzivatela ktoreho si vybral