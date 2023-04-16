import React, { useState, useRef, useEffect, useImperativeHandle, MutableRefObject } from "react";
import { getEventByDate } from "../api/Events";

export class ChildComponentPropsButtonDate {
  date: number;
  date_str: string;
  urSend: (ref: MutableRefObject<ButtonDateRef | null>, datep:number) => void;
  idOfLoggedUser: number;

    public constructor (date:number, date_str:string, urSend: (ref: MutableRefObject<ButtonDateRef | null>, datep:number) => void, idOfLoggedUser:number){
        this.date = date;
        this.date_str = date_str;
        this.urSend = urSend;
        this.idOfLoggedUser = idOfLoggedUser;


    }
}

export interface ButtonDateRef {
  changeFont: (color: string) => void;
  changeBack: (color: string) => void;

}

export const ButtonDate: React.FC<ChildComponentPropsButtonDate> = (prop) => {
    const [color, setColor] = useState("#3f5c06ff");
    const [size, setSize] = useState(300);
    const [back, setBack] = useState('white');

    const useREfB = useRef<ButtonDateRef>(null);


  const buttonStyle = {
    color: color,
    fontWeight: size,
    backgroundColor: back

  };

  const changeFont = (state:string): void => {
    if (state === 'clicked'){
        setColor('#11995eff');
        setSize(800);
    }

    else {
        setColor('#3f5c06ff');
        setSize(300);
    }
  };

  const changeBack= (color:string): void => {
    setBack(color);
  };


  useImperativeHandle(useREfB, () => ({
    changeFont, changeBack
  }));

 

  return (
    <button
      className="date"
      style={buttonStyle}
      value={prop.date}
      onClick={(e) => prop.urSend(useREfB, prop.date)}
      id={prop.date_str}
    >
      <p>{prop.date_str}</p>
    </button>
  );
};

