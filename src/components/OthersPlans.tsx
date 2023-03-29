import React, { useRef, useState } from 'react';
import LongMenu from './LongMenu';
import Props from './Props';
import PropsString from './PropsString';

const OthersPlans = () => {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = () => {
};

const propString = new PropsString(['skuska', 'hahaha'], "Others");

 return (
 <div>
        <LongMenu {...propString} />
    </div>
    );
};

export default OthersPlans;