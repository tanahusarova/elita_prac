import React, { useRef, useState } from 'react';
import Time from '../configs/Time';

class Event {
    id:number; 
    id_of_type:number; 
    name:string;
    from:Time;
    to:Time;
    colour:number;


     constructor(id:number, id_of_type:number, name:string, 
                from:Time, to:Time,  colour:number) {

        this.id = id;
        this.id_of_type = id_of_type;
        this.name = name;
        this.from = from;
        this.to = to;
        this.colour = colour;
    }
}

export default Event;  