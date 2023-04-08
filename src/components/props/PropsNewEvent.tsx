import React from "react";

class PropsNewEvent{
    name: string;
    time_from: string;
    time_to: string;
    comment: string;
    colour:string;

    constructor(name: string, time_from: string,time_to: string,
        comment: string, colour:string) {
        this.name = name;
        this.time_from = time_from;
        this.time_to = time_to;
        this.comment = comment;
        this.colour = colour;
    }
    
}

export default PropsNewEvent;