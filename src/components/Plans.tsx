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


export const Plans: React.FC<SharedInformations> = (inf:SharedInformations) => {  
  
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);
  const [propString, setPropString] = useState(new PropsString([], "PLANS"));
  const loginUser = inf.idOfLoggedUser; 
  const [watchedUser, setWatchedUser] = useState(8); //prepisat na prihlaseneho
  const [watchedUserName, setWatchedUserName] = useState('Mine');
  //erarne sa mu vykresluju jeho plany

  const handleChange = () => {
};

const setNewPropString = () => {
  
  let nicknamesArray = new Array<Pair>();
  nicknamesArray.push({label:'MINE', value:loginUser});
  
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
}, []);

useEffect(() => {
  console.log(watchedUser);
}, [watchedUser]);

function handleIdChoice(id:number, name:string) {
  setWatchedUser(id);
  setWatchedUserName(name);
}

//vyriesit ako sa tu dostanem ku loginu z menu a ku id vybranehi z long menu plus ku datumu z kalendara
//long menu pride tu, ale datum a login uzivatela si potrebujem preniest
 return (
 <div className='plans-container'>
    <label>{watchedUserName}</label>
        <LongMenu forMenu={propString} handleIdChoice={handleIdChoice} />
        <ButtonGenerator {...new PropsButtonGenerator(inf.idOfLoggedUser, watchedUser, inf.date)} />
    </div>
    );
};

export default Plans;