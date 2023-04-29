import React, {useEffect, useState} from "react"
import { NewEvent } from "../components/NewEvent";
import {Calendar} from "../components/Calendar";
import Plans from "../components/Plans";
import SharedInformations from "../components/SharedInformations";
import PropsIdUser from "../components/props/PropsIdUser";
import PropsNewEvent from "../components/props/PropsNewEvent";
import { useNavigate } from "react-router-dom";


export const CalendarPage = (id:PropsIdUser) => {

    const [informations, setInf] = useState(new SharedInformations('2023-05-14', parseInt(localStorage.id)));
    const [propsNewEvent, setPropsNewEvent] = useState(new PropsNewEvent(-1, '', '2023-05-14T22:00:00.000Z', '2023-05-14T22:00:00.000Z', '', '#88c20cff', parseInt(localStorage.id), 1, true));
    const [change, setChange] = useState(false);

    function handleDateChoice(d:string) {
        setInf(new SharedInformations(d, parseInt(localStorage.id)));
        console.log(informations.date + '... calendar page');

      }

      function handleEventChoice(event:PropsNewEvent) {
        setPropsNewEvent(event);
      }

      function signalChange() {
        setChange(true);
      }

      function ackChange(){
        setChange(false);
      }

      useEffect(() => {
        
      }, [informations.date]);

      let navigate = useNavigate();
      const goToLogoutrPage = async() =>{
        localStorage.clear();
        let path = `/logged_out`; 
        navigate(path);
    }

    //do new event sa musi dostat natiahnuty event z plans, z toho na ktore sa kliklo
    return (
      <div>
        <div className="calendar-page">
            <div className='background-container'>
            <button className="logout-button" onClick={goToLogoutrPage}>Log out</button>

            <Calendar handleDateChoice={handleDateChoice} idOfLogedUser={parseInt(localStorage.id)} render={change} ackChange={ackChange}/> 
            </div>
            <Plans handleEventChoice={handleEventChoice} sharedInformations={informations} render={change} ackChange={ackChange}/>
            <NewEvent event={propsNewEvent} sharedInformations={informations} signalChange={signalChange} />

        </div>
        </div>
    )
}

export default CalendarPage;

//cez kalendar potrebujem posunut datum do plans, a cez vyber posuniem generatoru aj meno prihlaseneho a uzivatela ktoreho si vybral