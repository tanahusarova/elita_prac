import React, { useRef, useState } from 'react';
import LongMenu from './LongMenu';
import Props from './Props';
import PropsString from './PropsString';
import { getNicknames, addUser } from '../api/UserApi';

const OthersPlans = () => {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = () => {
};



const setPropString = () => {
  let nicknamesArray = getNicknames().then((nicknames)=>{
    let results = new Array();
    nicknames.forEach(function (value) {
      results.push(value);
 }); 
    return results});
  return new PropsString(nicknamesArray, 'Others');
};


 return (
 <div>
        <LongMenu {...setPropString()} />
    </div>
    );
};

export default OthersPlans;