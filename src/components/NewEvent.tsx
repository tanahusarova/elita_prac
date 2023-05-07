import React, {useState, useEffect} from "react";
import Select from "react-select";
import ValueType from "react-select";
import { ActionMeta } from "react-select";
import MultiValue from "react-select";
import OptionTypeBase from "react-select";
import makeAnimated from 'react-select/animated';
import { getNicknames } from '../api/User';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import * as moment from 'moment-timezone';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputColor from 'react-input-color';

import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
//import { DatePicker } from '@mui/x-date-pickers';
import Plans from "./Plans";
import LongMenu from "./LongMenu";
import Event from "./Event";
import Time from "../configs/Time";
import { addComment, addEvent, addEventWithParticipants, addObserver, addParticipant, deleteEvent, updateEvent } from "../api/Events";
import { response } from "express";
import SharedInformations from "./SharedInformations";
import PropsNewEvent from "./props/PropsNewEvent";

dayjs.extend(utc);


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
  signalChange: () => void;
};

moment.tz.setDefault('UTC');


export const NewEvent: React.FC<ChildComponentProps> = (props) => {

    //nazov, typ, farba, od, do, poznamka, kto ma vidiet, kto sa ucasti
    const [name, setName] = useState('');
    const [type, setType] = useState(4);
    const [typePrivate, setTypePrivate] = useState(true);
    const [color, setColor] = useState('#88c20cff'); 
    const [time_from, setFrom] = useState<null | Date>(new Date('2023-05-15T22:00:00.000Z'));
    const [time_to, setTo] = useState<null | Date>(new Date('2023-05-15T22:00:00.000Z'));
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('2023-05-15');
    const [selectionOfParticipants, setSelectionOfParticipants] = useState<Participant[]>([{value:2, label:'lololo'}, {value:3, label:'hihihi'}]);
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
    const [hiddenFromParticipants, sethiddenPart] = useState<Participant[]>([]);
    const [newE, setNewE] = useState(true);
    const [selectedType, setSelectedType] = useState<OptionType | null>(null);



    const animatedComponents = makeAnimated();


  const resetInputs = () =>{
    setName('');
    setType(4);
    setTypePrivate(true);
    setColor('#88c20cff');
    setFrom(new Date('2023-05-15T22:00:00.000Z'));
    setTo(new Date('2023-05-15T22:00:00.000Z'));
    setComment('');
    setDate('2023-05-15');
    setSelectedParticipants([]);
    sethiddenPart([]);
    setNewE(true);
    setSelectedType(null);
  }


   async function handleSubmit (e:any) {
        e.preventDefault();
       let idOfUser = parseInt(localStorage.id);

        let time_fromString:string = '';

        //do databazy sa uklada UTC
        if (time_from) {
      //    let time_from_UTC = new Date(Date.UTC(time_from.getFullYear() , time_from.getMonth(), time_from.getDate(), time_from.getHours(), time_from.getMinutes(), time_from.getSeconds()));
          time_fromString = time_from?.toISOString();
          setDate(time_from.toJSON().slice(0, 10));
        }

        let time_toString:string = '';

        if (time_to) {
     //     let time_to_UTC = new Date(Date.UTC(time_to.getFullYear() , time_to.getMonth(), time_to.getDate(), time_to.getHours(), time_to.getMinutes(), time_to.getSeconds()));
          time_toString = time_to?.toISOString();

        }

        let partArray = new Array<{user_id_p:number}>();
        let obserArray = new Array<{user_id_o:number, visible:boolean}>();

        let nameToSave = name;
        if (!name) nameToSave = 'without name';

        //  const {id_of_type, name, from, to, date, colour, comment, user_id} = body;

        if (!newE){
          updateEvent(props.event.event_id, {id_of_type: type, name:nameToSave, from:time_fromString, to:time_toString, 
                      date:date, colour:color, comment:comment, user_id:idOfUser});

        }else{
  
        partArray.push({user_id_p:idOfUser});
        obserArray.push({user_id_o:idOfUser, visible:true});


        for (let i = 0; i < selectedParticipants.length; i++){
          partArray.push({user_id_p:selectedParticipants[i].value});
        }

        for (let i = 0; i < selectionOfParticipants.length; i++){
          let visible = !hiddenFromParticipants.includes(selectionOfParticipants[i]);
          obserArray.push({user_id_o:selectionOfParticipants[i].value, visible:visible});
        } 


        addEventWithParticipants({event:{ id_of_type: type, name: nameToSave, from: time_fromString, to: time_toString,
                                  date: date, colour: color }, participants: partArray, observers:obserArray,
                                  comments:{user_id_c:idOfUser, comment: comment}})
                                  .then((res) => { props.signalChange(); }
                                  ).catch(err => console.log('problem s pridavanim eventu v new evente'));
      }
     props.signalChange();
     resetInputs();
    }

    const handleTimeFrom = (date:Dayjs|null) => {
      if (date === null) {
        setFrom(null);
        setDate('');
      }
      else {
        {
     //     const result = new Date(Date.UTC(date.toDate().getFullYear() , date.toDate().getMonth(), date.toDate().getDate(), 
     //                             date.toDate().getHours(), date.toDate().getMinutes(), date.toDate().getSeconds()));
          setFrom(date.toDate());

          if (time_to?.getTime() && (date.toDate().getTime() > time_to?.getTime()))
                setTo(date.toDate());

          setDate(date.toDate().toJSON().slice(0, 10));
          console.log(date.toDate().toJSON().slice(0, 10));
        }

      }
      
    }

    

    const options: OptionType[] = [
        { value: 2, label: 'school'},
        { value: 3, label: 'hobby' },
        { value: 4, label: 'other plans' },
        { value: 5, label: 'mutual plans' },


      ]

      //doplnit nicknames z databazy

      const handleSelection = (selectedOption: OptionType | null) =>{
        if (selectedOption === null) {
          setTypePrivate(true);
          setSelectedType(selectedOption);
          setSelectedParticipants([]);
          return;
        }

        if (selectedOption.value <= 4){
          setTypePrivate(true);
          setType(selectedOption.value);
        }

        else{
          setTypePrivate(false)
          setType(selectedOption.value);

        }
        setSelectedParticipants([]);
        setSelectedType(selectedOption);

      };


      const handleColorChange = (newColor: { hex: string; }) => {
        setColor(newColor.hex);
      };

      const handleDelete = (e:any) => {
        e.preventDefault();
        resetInputs();
        props.signalChange();

        if (props.event.event_id > 0){
          deleteEvent(props.event.event_id).catch((err)=>{
            console.log(err);
          })
        }
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
        if (props.event.idOfWathedUser === props.sharedInformations.idOfLoggedUser){
          setNewE(props.event.new_event);
          setName(props.event.name);
          let date = new Date(props.event.time_from);
          setFrom(date);
          setDate(date.toJSON().slice(0, 10));
          setTypePrivate(true);



          for (let i = 0; i < 4; i++){
            if (options[i].value === props.event.type)
              setSelectedType({value: props.event.type, label:options[i].label});
          }


          date = new Date(props.event.time_to);
          setTo(date);
          setComment(props.event.comment);
          setColor(props.event.colour);
          setSelectedParticipants([]);
          sethiddenPart([]);
        }
      }, [props.event]);
      

    return (
      <div>
        <div className="new-event-container">
        <form className="new-event-buttons">
            <label htmlFor="name">name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="konzultacie so skolitelom" id="name" name="name" />

            <label htmlFor="type"> type </label>
            <Select 
               onChange={handleSelection}
               options={options}
               value= {selectedType} />

            <Select
             placeholder="choose participants..."
             isDisabled={!newE || typePrivate}
             closeMenuOnSelect={true}
             value={selectedParticipants}
             components={animatedComponents}
             isMulti
             options={selectionOfParticipants.filter(item => !hiddenFromParticipants.includes(item))}
             onChange={(selectedOptions) => 
              setSelectedParticipants(selectedOptions as Participant[])} />

            <label htmlFor="hidden"> hidden from </label>
            <Select
             closeMenuOnSelect={true}
             isDisabled={!newE}
             value={hiddenFromParticipants}
             components={animatedComponents}
             isMulti
             options={selectionOfParticipants.filter(item => !selectedParticipants.includes(item))}
             onChange={(selectedOptions) => {
              sethiddenPart(selectedOptions as Participant[]);
              console.log(hiddenFromParticipants);}} />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
          
            <label htmlFor="time_from">from </label>            
            <DateTimePicker
            disablePast              
            value={dayjs(time_from)}
            onChange={(newValue) => handleTimeFrom(newValue)}
            views={['year', 'month', 'day', 'hours', 'minutes']}
            />
            <label htmlFor="time_to">to </label>            
            <DateTimePicker
            value ={dayjs(time_to)}
            disablePast  
            minDate={dayjs(time_from)}            
            onChange={(newValue) => {
              if (newValue === null)
                  setTo(new Date());
              else {
             //   const result = new Date(Date.UTC(newValue.toDate().getFullYear() , newValue.toDate().getMonth(), newValue.toDate().getDate(), newValue.toDate().getHours(), newValue.toDate().getMinutes(), newValue.toDate().getSeconds()));
                setTo(newValue.toDate());
              }
            }}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />

            </LocalizationProvider>
            <label htmlFor="comment">comment </label>
            <input value={comment} onChange={(e) => setComment(e.target.value)} type="comment" placeholder="comment" id="comment" name="comment" />
           
            <label htmlFor="color">color</label>
            <InputColor
             initialValue={color}
             onChange={handleColorChange}
             placement="right"
             />
        <div className="buttons-new-event">
        <button className="button-front-page" 
          onClick={(e) => handleSubmit(e)}>Save changes</button>
        <button className="button-front-page" 
          onClick={(e) => handleDelete(e)}>Delete event</button>
        </div>
        </form>
        </div>
        </div>
    )
}

export default NewEvent;