import React from "react";
import Props from "./Props";

class PropsString implements Props{
    propWhichIsArray: string[];
    name:string;

    constructor(names: string[], string:string) {
        this.propWhichIsArray = names;
        this.name = string;
    }
    
}

export default PropsString;
