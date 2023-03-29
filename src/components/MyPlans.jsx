import React, { useRef, useState } from 'react';
import LongMenu from './LongMenu';
import PropsString from './PropsString';

const MyPlans = () => {
  const [date, setDate] = useState('');

const propString = new PropsString(['vlastne', 'spolocne'], "Mine");

 return (
    <div>
        <LongMenu {...propString} />
    </div>
    );
};

export default MyPlans;