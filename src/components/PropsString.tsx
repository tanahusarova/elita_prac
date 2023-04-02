import React from "react";
import Props from "./Props";

class PropsString implements Props{
    propWhichIsArray: Array<string>;
    name:string;

    constructor(names: Array<string>, string:string) {
        this.propWhichIsArray = names;
        this.name = string;
    }
    
}

export default PropsString;
