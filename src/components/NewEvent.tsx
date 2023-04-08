import React, {useState, useEffect} from "react";
import Select from "react-select";
import ValueType from "react-select";
import { ActionMeta } from "react-select";
import MultiValue from "react-select";
import OptionTypeBase from "react-select";
import makeAnimated from 'react-select/animated';
import { getNicknames } from '../api/User';



import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputColor from 'react-input-color';

import { DateTimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import Plans from "./Plans";
import LongMenu from "./LongMenu";
import Event from "./Event";
import dayjs from 'dayjs';
import Time from "../configs/Time";
import { addEvent } from "../api/Events";
import { response } from "express";


interface OptionType {
  value: string;
  label: string;
}

interface Nickname{
  user_id: number;
  nickname: string;
}

interface Participant{
  value: number;
  label: string;
}

class ParticipantP implements Participant{
  value: number;
  label: string;

  constructor (value: number, label: string){
      this.value = value;
      this.label = label;
  }
}

export const NewEvent = () => {

    //nazov, typ, farba, od, do, poznamka, kto ma vidiet, kto sa ucasti
    const [name, setName] = useState('');
    const [type, setType] = useState(false);
    const [color, setColor] = useState('0x8ba613'); 
    const [time_from, setFrom] = useState<Date | null>(null);
    const [time_to, setTo] = useState<Date | null>(null);
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [selectionOfParticipants, setSelectionOfParticipants] = useState<Participant[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
    const [idOfevent, setIdOfEvent] = useState(-1);

    const animatedComponents = makeAnimated();

    const handleSubmit = () => {
        console.log(time_from);

        //  const {id_of_type, name, from, to, date, colour } = body;

        let id_of_type = 2;
        if (type) id_of_type = 1;

        setComment('skuskaskuska');

        let idOfEvent = -1;
        let colorString:string = '' + color;

        let time_fromString:string = '';
           if (time_from !== null) time_fromString = time_from?.toISOString();

        let time_toString:string = '';
           if (time_to !== null) time_toString = time_to?.toISOString();


        addEvent({'id_of_type':id_of_type, 'name':name, 'from':time_from, 'to':time_to, 'date':date, 'colour':color}).then(
          (response) => {
            setIdOfEvent(response[0].event_id);
        });
      
       console.log({color});



 //       const newEvent = new Event(id, id_of_type, name, time_from?.toISOString, time_to?.toISOString, color);
      //  createEvent(newEvent);
        
    }

    const handleTimeFrom = (date:Date|null) => {
      setFrom(date);
      if (date === null) setDate('');
      else setDate(date.toJSON().slice(0, 10));
    }

    

    const options: OptionType[] = [
        { value: 'private', label: 'skola',  },
        { value: 'private', label: 'hobby' },
        { value: 'private', label: 'stretnutia' },
        { value: 'public', label: 'spolocne plany' },
        { value: 'public', label: 'ine' }


      ]

      //doplnit nicknames z databazy

      const handleSelection = (selectedOption: OptionType | null) =>{
        if (selectedOption === null) {
          setType(true);
          return;
        }

        if (selectedOption.value === 'private')
                  setType(true);

        else setType(false);
      };


      const handleColorChange = (newColor: { hex: string; }) => {
        setColor(newColor.hex);
      };
      

/*
      function handleSelectedParticipants(
        newValue: ValueType<Participant, true>,
        actionMeta: ActionMeta<Participant>
      ) {
        // `newValue` will be an array of selected options
        const newSelectedOptions = newValue as Participant[];
    
        // Update the selected options state
        setSelectedParticipants(newSelectedOptions);
      }
      */

/*
      const handleSelectPart = (selected: MultiValue<Participant>) => {
        if (selected) {
          const newSelectedOptions = selected.map((option:Participant) => ({
            label: option.label as string,
            id: option.id as number,
          }));
          setSelectedParticipants(newSelectedOptions);
        } else {
          setSelectedParticipants([]);
        }
      };
      */

      const setNewOptions = () => {
  
        let nicknamesArray = new Array<Participant>();
        
        getNicknames().then((nicknames)=>{
          nicknames.forEach(function (value:Nickname) {
            nicknamesArray.push(new ParticipantP(value.user_id, value.nickname));
       });});
        return nicknamesArray;
      
      };
      
      useEffect(() => {
        setSelectionOfParticipants(setNewOptions());
      }, []);
      
  
    return (
      <div>
        <div className="new-event-container">
        <form onSubmit={handleSubmit} className="new-event-buttons">
            <label htmlFor="name">name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="konzultacie so skolitelom" id="name" name="name" />

            <label htmlFor="type"> type </label>
            <Select 
               onChange={handleSelection}
               options={options} />

            <Select
             isDisabled={type}
             closeMenuOnSelect={true}
             components={animatedComponents}
             isMulti
             value={selectedParticipants}
             options={selectionOfParticipants}
             />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
          
            <label htmlFor="time_from">from </label>            
            <DateTimePicker
            defaultValue={time_from}
            disablePast
            onChange={handleTimeFrom}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
            <label htmlFor="time_to">to </label>            
            <DateTimePicker
            defaultValue={time_to}
            disablePast
            onChange={(newValue)=> setTo(newValue)}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />

            </LocalizationProvider>
            <label htmlFor="comment">comment </label>
            <input value={comment} onChange={(e) => setComment(e.target.value)} type="comment" placeholder="comment" id="comment" name="comment" />
           
            <label htmlFor="color">color</label>
            <InputColor
             initialValue="#8ba613"
             onChange={handleColorChange}
             placement="right"
             />
             <p>color: {idOfevent}</p>
        <div className="buttons-new-event">
        <button className="button-front-page" onClick={() => handleSubmit()}>Save changes</button>
        <button className="button-front-page">Delete event</button>
        </div>

        </form>
        </div>
        </div>
    )
}

export default NewEvent;