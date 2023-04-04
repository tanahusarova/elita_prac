import React, { useRef, useState } from 'react';
import LongMenu from './LongMenu';
import Props from './Props';
import PropsString from './PropsString';
import { getNicknames, addUser } from '../api/UserApi';
import { strict } from 'assert';

const OthersPlans = () => {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = () => {
};



const setPropString = () => {
  
  let nicknamesArray = new Array<string>();
  
  getNicknames().then((nicknames)=>{
    nicknames.forEach(function (value) {
      nicknamesArray.push(value.nickname);
 });});
  return new PropsString(nicknamesArray, 'Others');

};


 return (
 <div>
        <LongMenu {...setPropString()} />
    </div>
    );
};

export default OthersPlans;