import React, { useRef, useState } from 'react';
import MyPlans from './MyPlans';
import OthersPlans from './OthersPlans';

const Plans = () => {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = () => {
};

 return (
 <div className='plans-container'>
    <label>PLANS</label>
    <MyPlans />
    <OthersPlans />
    </div>
    );
};

export default Plans;