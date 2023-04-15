import React, { useState, useRef, MutableRefObject } from "react";
import Date from "../configs/Date";
import { Weekdays } from "../configs/Weekdays";
import { monthDates } from "../configs/MonthDays";
import SharedInformations from "./SharedInformations";
import { getEventByDate } from "../api/Events";
import ButtonFakeDate from "./ButtonFakeDate";
import {ButtonDate, ButtonDateRef, ChildComponentPropsButtonDate} from "./ButtonDate";

type ChildComponentProps = {
    handleDateChoice: (id: string) => void;
    idOfLogedUser: number;
  };  

export const Calendar: React.FC<ChildComponentProps> = (prop) => {
    const [buttonDateRef, setButtonDateRef] = useState<MutableRefObject<ButtonDateRef | null>>(useRef<ButtonDateRef>(null));


    const addClickEventListenerToButton = (buttonId: string) => {
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        button.addEventListener('click', (event: MouseEvent) => {
          // Get the ID of the clicked button
          const clickedButtonId = buttonId;
      
          // Reset the color of all buttons
          document.querySelectorAll('button').forEach(button => {
            button.style.backgroundColor = '';
          });
      
          // Set the color of the clicked button
          const clickedButton = document.getElementById(clickedButtonId);
          if (clickedButton) {
            clickedButton.style.backgroundColor = '#ebf2cbff';
          }
        });
      }

    const onButtonClick = (ref: MutableRefObject<ButtonDateRef | null>, date:number) =>{
        if (buttonDateRef?.current) {
            buttonDateRef.current.changeFont('unclicked');
        }
        if (ref?.current) {
            ref.current.changeFont('clicked');
            setButtonDateRef(ref);
        }
        setDate(date);

    }

      
    const setDate = (date:number) =>{
        let tmp:string = '2023-05-';
        if (date === 1) tmp = '2023-04-30';
        if (date < 11) tmp = '2023-05-0';
        tmp = tmp + (date - 1);

        prop.handleDateChoice(tmp);

    }

    const generateDates = (date: number) => {
        for (let i = 0; i < 7; i++){
            let id_str = '';
            
            if (date === 64) {
                let result =  <ButtonFakeDate/>;
            return result;
            }

            if(date - 10 < 0) {
                let str = '0' + date;
                let prop:ChildComponentPropsButtonDate = new ChildComponentPropsButtonDate(date, str, onButtonClick);
                let result = <ButtonDate {...prop} />;
                return result;
            }

            let str = '' + date;
            let prop:ChildComponentPropsButtonDate = new ChildComponentPropsButtonDate(date, str, onButtonClick);
            let result = <ButtonDate {...prop} />;
            return result;

        }
    }
    
    const generateWeeks = (dates: Array<Date>) => {
        let daysInWeek = 7;
        let tempArray:Array<Date[]> = [];

        if (dates.length % 7 !== 0) {
            let tmp = 7 - (dates.length % 7);
            for (let i = 0; i < tmp; i++){
                let date:Date = {day: 64};
                dates.push(date);
            }
        }

        for (let i = 0; i < dates.length; i += daysInWeek) {
            tempArray.push(dates.slice(i, i+daysInWeek));
        }

        

        return tempArray;
    }
    
    return(
        <div className="calendar-container">
            <div className="datepicker-container">
                <span>May 2023</span>
            </div>
            <div className="weekdays-container">
                {Weekdays.map(day => (
                    <div className="week-day">{day}</div>
                ))}
            </div>
            <div className="calendar">
                {generateWeeks(monthDates).map(week => 
                    (<div className="week"> 
                    {week.map(day => (generateDates(day.day)))}
                </div>))
                
                }

            </div>

        </div>
    )

}

export default Calendar;