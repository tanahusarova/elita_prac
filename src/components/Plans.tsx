import React, { useRef, useState, useEffect } from 'react';
import LongMenu from './LongMenu';
import {Props, Pair} from './props/Props';
import PropsString from './props/PropsString';
import { strict } from 'assert';
import { getNicknames } from '../api/User';
import PropsButtonEvent from './props/PropsButtonEvent';
import ButtonEvent from './ButtonEvent';
import ButtonGenerator from './ButtonGenerator';
import PropsButtonGenerator from './props/PropsButtonGenerator';
import SharedInformations from './SharedInformations';
import PropsNewEvent from './props/PropsNewEvent';

type ChildComponentProps = {
  handleEventChoice: (event: PropsNewEvent) => void;
  sharedInformations: SharedInformations;
};

export const Plans: React.FC<ChildComponentProps> = (prop) => {  
  
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);
  const [propString, setPropString] = useState(new PropsString([], "PLANS"));
  const loginUser = prop.sharedInformations.idOfLoggedUser; 
  const [watchedUser, setWatchedUser] = useState(prop.sharedInformations.idOfLoggedUser); //prepisat na prihlaseneho
  const [watchedUserName, setWatchedUserName] = useState('Mine');
  const [propsGenerator, setPropGenerator] = useState(new PropsButtonGenerator(loginUser, loginUser, '2023-05-01'));

  //erarne sa mu vykresluju jeho plany

  const handleChange = () => {
};

const setNewPropString = () => {
  
  let nicknamesArray = new Array<Pair>();
  nicknamesArray.push({label:'Mine', value:loginUser});
  
  getNicknames().then((nicknames)=>{
    nicknames.forEach(function (nick:any) {
      if (nick.user_id !== loginUser) 
           nicknamesArray.push({label:(nick.nickname), value:(nick.user_id)});
 });});
  return new PropsString(nicknamesArray, 'PLANS');

};

useEffect(() => {
  let nicknames = setNewPropString();
  setPropString(nicknames);
  setPropGenerator(new PropsButtonGenerator(prop.sharedInformations.idOfLoggedUser, watchedUser, prop.sharedInformations.date));

}, []);

useEffect(() => {
  console.log('pouziva sa useEffect plans wathedUser');
  console.log(watchedUser);
  setPropGenerator(new PropsButtonGenerator(prop.sharedInformations.idOfLoggedUser, watchedUser, prop.sharedInformations.date));
}, [watchedUser]);


useEffect(() => {
  console.log('pouziva sa useEffect plans prop');
  console.log(prop.sharedInformations.date);
  console.log(prop.sharedInformations.idOfLoggedUser);
  setPropGenerator(new PropsButtonGenerator(prop.sharedInformations.idOfLoggedUser, watchedUser, prop.sharedInformations.date));
  }, [prop.sharedInformations.date, prop.sharedInformations.idOfLoggedUser]);


function handleIdChoice(id:number, name:string) {
  setWatchedUser(id);
  setWatchedUserName(name);
}

//vyriesit ako sa tu dostanem ku loginu z menu a ku id vybranehi z long menu plus ku datumu z kalendara
//long menu pride tu, ale datum a login uzivatela si potrebujem preniest

//pridat callback function do button generator
 return (
 <div className='plans-container'>
  <div className='plans-label'>
    <label>{watchedUserName}</label>
        <LongMenu forMenu={propString} handleIdChoice={handleIdChoice} />
      </div>
      <div className='plans-events'>
        <ButtonGenerator handleEventChoice={prop.handleEventChoice} forButtonGenerator={propsGenerator} />
        </div>
    </div>
    );
};

export default Plans;