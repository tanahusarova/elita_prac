import React from "react";
import Date from "../configs/Date";
import { Weekdays } from "../configs/Weekdays";
import { monthDates } from "../configs/MonthDays";


export const Calendar: React.FC<{}> = ({}) => {

    function handleClick() {
    }

    const generateDates = (date: number) => {
        for (let i = 0; i < 7; i++){
            let result = <button className="date" value={date} 
            onClick={handleClick}>
                <p>{date}</p></button>;

            if (date === 64) 
                result = <button className="date-fake" value={date
            }><h4>00</h4></button>;

            else if(date - 10 < 0) 
                result = <button className="date" value={date
            } onClick={handleClick}><p>0{date}</p></button>;

            return result;
        }
    }
    
    const generateWeeks = (dates: Array<Date>) => {
        let daysInWeek = 7;
        let tempArray:any[] = [];

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