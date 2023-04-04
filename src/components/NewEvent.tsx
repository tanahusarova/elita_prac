import React, {useState} from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';



import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputColor from 'react-input-color';

import { DateTimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import Plans from "./Plans";
import LongMenu from "./LongMenu";
import Event from "./Event";
import dayjs from "dayjs";
import Time from "../configs/Time";



export const NewEvent = () => {

    //nazov, typ, farba, od, do, poznamka, kto ma vidiet, kto sa ucasti
    const [name, setName] = useState('');
    const [type, setType] = useState(false);
    const [color, setColor] = useState(Number("0x8ba613")); 
    const [time_from, setFrom] = useState(new Time(0));
    const [time_to, setTo] = React.useState(new Time(0));
    const [comment, setComment] = useState('');
    const [date, setDate] = useState(null);
    const [next, Inc] = useState(0);


    const animatedComponents = makeAnimated();

    const handleSubmit = () => {
        console.log(time_from);
      //  id:number, id_of_type:number, name:string, 
      //          from:Time, to:Time,  id_of_colour:number) 

        let id = 3;

        let id_of_type = 2;
        if (type) id_of_type = 1;

        const newEvent = new Event(id, id_of_type, name, time_from, time_to, color);
      //  createEvent(newEvent);
        
    }

    

    const options = [
        { value: 'private', label: 'skola',  },
        { value: 'private', label: 'hobby' },
        { value: 'private', label: 'stretnutia' },
        { value: 'public', label: 'spolocne plany' },
        { value: 'public', label: 'ine' }


      ]

    const optionsNames = [
        { value: 'jozko', label: 'jozko' },
        { value: 'ferko', label: 'ferko' },
        { value: 'lubka', label: 'lubka' },
        { value: 'kika', label: 'kika' }

      ]

      const handleSelection = (selectedOption) =>{
        if (selectedOption.value === 'private')
                  setType(true);
        else setType(false);
      };

    return (
      <div>
        <div className="new-event-container">
        <form onSubmit={handleSubmit} className="new-event-buttons">
            <label htmlFor="name">name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="konzultacie so skolitelom" id="name" name="name" />

            <label htmlFor="type"> type </label>
            <Select onChange={handleSelection} options={options} />

            <Select
             isDisabled={type}
             closeMenuOnSelect={true}
             components={animatedComponents}
             isMulti
             options={optionsNames}
             />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
          
            <label htmlFor="time_from">from </label>            
            <DateTimePicker
            defaultValue={time_from}
            disablePast
     //       onChange={(newValue)=> setFrom(newValue)}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
            <label htmlFor="time_to">to </label>            
            <DateTimePicker
            defaultValue={time_to}
            disablePast
     //       onChange={(newValue)=> setTo(newValue)}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />

            </LocalizationProvider>
            <label htmlFor="comment">comment </label>
            <input value={comment} onChange={(e) => setComment(e.target.value)} type="comment" placeholder="comment" id="comment" name="comment" />
           
            <label htmlFor="color">color</label>
            <InputColor
             initialValue="#8ba613"
      //       onChange={setColor}
             placement="right"
             />
            
        <button className="button-front-page" type="submit" onClick={() => handleSubmit()}>Save changes</button>
        </form>
        </div>
        </div>
    )
}

export default NewEvent;