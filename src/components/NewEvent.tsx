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
import { addComment, addEvent, addObserver, addParticipant, deleteEvent } from "../api/Events";
import { response } from "express";
import SharedInformations from "./SharedInformations";
import PropsNewEvent from "./props/PropsNewEvent";


interface OptionType {
  value: number;
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

type ChildComponentProps = {
  event: PropsNewEvent;
  sharedInformations: SharedInformations;
};

export const NewEvent: React.FC<ChildComponentProps> = (props) => {

    //nazov, typ, farba, od, do, poznamka, kto ma vidiet, kto sa ucasti
    const [name, setName] = useState('');
    const [type, setType] = useState(3);
    const [typePrivate, setTypePrivate] = useState(false);
    const [color, setColor] = useState('#90a822ff'); 
    const [time_from, setFrom] = useState<Date | null>(null);
    const [time_to, setTo] = useState<Date | null>(null);
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [selectionOfParticipants, setSelectionOfParticipants] = useState<Participant[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
    const [hiddenFromParticipants, sethiddenPart] = useState<Participant[]>([]);
    const [idOfevent, setIdOfEvent] = useState(31);
    const [newE, setNewE] = useState(true);
    const [pomocnyText, setPomocnyText] = useState('vsetko je v poriadku');


    const animatedComponents = makeAnimated();

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

    const handleSubmit = () => {
        console.log(time_from);

        let time_fromString:string = '';
           if (time_from) time_fromString = time_from?.toISOString();

        let time_toString:string = '';
           if (time_to) time_toString = time_to?.toISOString();

       
       addEvent({'id_of_type':type, 'name':name, 'from':time_fromString, 'to':time_toString, 'date':date, 'colour':color}).then((event)=> {
          setPomocnyText('som tu preslo to');

          setIdOfEvent(event.event_id);
          let id:number = event.event_id;
          addParticipant({'event_id': id, 'user_id':props.sharedInformations.idOfLoggedUser});
          addObserver({'event_id': id, 'user_id':props.sharedInformations.idOfLoggedUser, 'visible':true});

          if (comment)
              addComment({'event_id': id, 'user_id': props.sharedInformations.idOfLoggedUser, 'comment': comment});

          for (let i = 0; i < selectedParticipants.length; i++){
              addParticipant({'event_id': id, 'user_id':selectedParticipants[i].value});
          }
        
          for (let i = 0; i < hiddenFromParticipants.length; i++){
            addObserver({'event_id': id, 'user_id':hiddenFromParticipants[i].value, 'visible':false});
          }
        
          var tmp = selectionOfParticipants.filter((item) => !hiddenFromParticipants.includes(item));
          for (let i = 0; i < hiddenFromParticipants.length; i++){
            addObserver({'event_id': id, 'user_id':tmp[i].value, 'visible':true});            }

       }).catch((error) => {
        // Better way would be to throw error here and let the client handle (e.g. show error message)
        // Returning empty array for simplicity only!
        console.log("teraz sme tu");
        delay(5000);
    });;

//       console.log(idOfevent);
//       addParticipant({'event_id': id, 'user_id':props.sharedInformations.idOfLoggedUser});
//       addObserver({'event_id': id, 'user_id':props.sharedInformations.idOfLoggedUser, 'visible':true});

/*
      if (comment)
        addComment({'event_id': id, 'user_id': props.sharedInformations.idOfLoggedUser, 'comment': comment});
      
      //const {event_id, user_id} = body;

      for (let i = 0; i < selectedParticipants.length; i++){
        addParticipant({'event_id': idOfevent, 'user_id':selectedParticipants[i].value});
      }

      for (let i = 0; i < hiddenFromParticipants.length; i++){
        addObserver({'event_id': idOfevent, 'user_id':hiddenFromParticipants[i].value, 'visible':false});
      }

      var tmp = selectionOfParticipants.filter((item) => !hiddenFromParticipants.includes(item));
      for (let i = 0; i < hiddenFromParticipants.length; i++){
        addObserver({'event_id': idOfevent, 'user_id':tmp[i].value, 'visible':true});
      }
      */
        
    }

    const handleTimeFrom = (date:Date|null) => {
      setFrom(date);
      if (date === null) setDate('');
      else setDate(date.toJSON().slice(0, 10));
    }

    

    const options: OptionType[] = [
        { value: 1, label: 'school',  },
        { value: 2, label: 'hobby' },
        { value: 3, label: 'other plans' },
        { value: 4, label: 'mutual plans' },


      ]

      //doplnit nicknames z databazy

      const handleSelection = (selectedOption: OptionType | null) =>{
        if (selectedOption === null) {
          setTypePrivate(true);
          return;
        }

        if (selectedOption.value < 4){
          setTypePrivate(true);
          setType(selectedOption.value);
        }

        else{
          setTypePrivate(false)
          setType(selectedOption.value);

        }
      };


      const handleColorChange = (newColor: { hex: string; }) => {
        setColor(newColor.hex);
      };

      const handleDelete = () => {
        setName('');
        setColor('#90a822ff');
        setTypePrivate(false);
        setFrom(null);
        setDate('');
        setTo(null);
        setComment('');
        deleteEvent(idOfevent);
      };

      const setNewOptions = () => {
  
        let nicknamesArray = new Array<Participant>();
        
        getNicknames().then((nicknames)=>{
          nicknames.forEach(function (value:Nickname) {
            if (value.user_id !== props.sharedInformations.idOfLoggedUser)
                nicknamesArray.push(new ParticipantP(value.user_id, value.nickname));
       });});
        return nicknamesArray;
      
      };
      
      useEffect(() => {
        setSelectionOfParticipants(setNewOptions());
      }, []);

      useEffect(() => {
        setName(props.event.name);
        setFrom(new Date(props.event.time_from));
        setTo(new Date(props.event.time_to));
        setComment(props.event.comment);
        setColor(props.event.colour);
      }, [props.event]);
      


    return (
      <div>
        <div className="new-event-container">
        <form className="new-event-buttons">
          <label>{pomocnyText}</label>
            <label htmlFor="name">name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="konzultacie so skolitelom" id="name" name="name" />

            <label htmlFor="type"> type </label>
            <Select 
               onChange={handleSelection}
               options={options} />

            <Select
             isDisabled={typePrivate}
             closeMenuOnSelect={true}
             components={animatedComponents}
             isMulti
             options={selectionOfParticipants}
             onChange={(selectedOptions) => 
              setSelectedParticipants(selectedOptions as Participant[])} />

            <label htmlFor="hidden"> hidden from </label>
            <Select
             closeMenuOnSelect={true}
             components={animatedComponents}
             isMulti
             options={selectionOfParticipants.filter(item => !selectedParticipants.includes(item))}
             onChange={(selectedOptions) => 
              sethiddenPart(selectedOptions as Participant[])} />

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
             initialValue="#90a822ff"
             onChange={handleColorChange}
             placement="right"
             />
        <div className="buttons-new-event">
        <button className="button-front-page" 
          onClick={() => handleSubmit()}>Save changes</button>
        <button className="button-front-page" 
          onClick={() => handleDelete()}>Delete event</button>
        </div>

        </form>
        </div>
        </div>
    )
}

export default NewEvent;