import React, {useState, useEffect} from "react";
import Date from "../configs/Date";
import { Weekdays } from "../configs/Weekdays";
import { monthDates } from "../configs/MonthDays";
import PropsButtonEvent from "./props/PropsButtonEvent";
import PropsButtonGenerator from "./props/PropsButtonGenerator";
import { getNicknames } from "../api/User";
import { getEventByDate } from "../api/Events";
import ButtonEvent from "./ButtonEvent";
import EventInf from "./props/EventInf";
import EventInfFromQuery from "./props/EventInfFromQuery";
import PropsNewEvent from "./props/PropsNewEvent";

type ChildComponentProps = {
  handleEventChoice: (event:PropsNewEvent) => void;
  forButtonGenerator: PropsButtonGenerator;
};

export const ButtonGenerator: React.FC<ChildComponentProps> = (prop) => {
    //doplnit fetchovanie z databazy a generovanie eventbuttonikov
    //id mam od loginu, datum zo stlacenia butoniku, a id of user z vyberu v plans
    const [eventsByDate, setEventsByDate] = useState<EventInf[]>([]);
    const [text, setText] = useState('');
    const [buttons, setButtons] = useState<string[]>([""]);

    function addNewButton() {
          const newButtons = [``];
          setButtons(newButtons);
  }



  function loadEvents() {
    const newEvents = new Array<EventInf>();

    getEventByDate(prop.forButtonGenerator.idOfLogedUser, prop.forButtonGenerator.idOfUserWithPlans, prop.forButtonGenerator.date).then((eventsByDate)=>{
        eventsByDate.forEach(function (value:EventInf) {
             if (value.visible) {
                 newEvents.push(new EventInfFromQuery(value.event_id, value.type_id, value.name, 
                 value.from_time, value.to_time, value.date_time, value.colour, value.user_id, value.visible));
            } else {
                newEvents.push(new EventInfFromQuery(-1, value.type_id, 'OCUPIED', 
                value.from_time, value.to_time, value.date_time, '#abababff', value.user_id, value.visible));
        }
     });});

    setEventsByDate(newEvents);
}

      
      useEffect(() => {
        loadEvents();

      }, [prop.forButtonGenerator.idOfUserWithPlans, prop.forButtonGenerator.date]);
      

      const handleClick1 = () =>{
        if(eventsByDate.length > 0)
                     setText('tralalala');

      }

      const handleClick2 = () =>{
        if(eventsByDate.length > 0)
                     setText('hihihihi');

      }
    
    return(
    <div>
         <div className="weekdays-container">
            <label>{text}</label>
            <button onClick={addNewButton}>Load events</button>

            </div>

            <div className="event-buttons">
             {eventsByDate.map((value:EventInf) => (

                <ButtonEvent handleEventChoice={prop.handleEventChoice} event={value} />
               
             ))}
          </div>

            <div className="reload-button">
             {buttons.map((button, index) => (
               <button key={index}>{button}</button>
             ))}
          </div>
    </div>
    )

}

export default ButtonGenerator;