import React, {useState, useEffect} from "react";
import { Weekdays } from "../configs/Weekdays";
import { monthDates } from "../configs/MonthDays";
import PropsButtonEvent from "./props/PropsButtonEvent";
import { getComment, getEvent } from "../api/Events";
import EventInf from "./props/EventInf";
import PropsNewEvent from "./props/PropsNewEvent";

class Comment{
    comment:string;
    nickname:string;
    user_id:number;

    constructor(comment:string, nickname:string, user_id:number){
        this.comment = comment;
        this.nickname = nickname;
        this.user_id = user_id;
    }
}

type ChildComponentProps = {
    handleEventChoice: (event:PropsNewEvent) => void;
    event: EventInf;
    watchedUser:number;
    logedUser:number;
  };

export const ButtonEvent: React.FC<ChildComponentProps> = (prop) => {
    const buttonStyle = {
        color: prop.event.colour,
    };

    const [text, setText] = useState('');
    const [comment, setComment] = useState('comments');
    const [commentsFromQuery, setCommentsQuery] = useState<string[]>([]);
    const [commentShow, setCommentShow] = useState(false);
    const [commentOfLoged, setCommentOfLoged] = useState('');


    useEffect(() => {
        let date_from:Date = new Date(prop.event.from_time);
        let date_to:Date = new Date(prop.event.to_time);

        let string = '\n FROM: ' + (date_from.getDate()) + '.' + date_from.getMonth() + '. at ' + date_from.getHours() + ':' + date_from.getMinutes() + 
        '           TO: ' + (date_from.getDate()) + '.' + date_from.getMonth() + '. at ' + date_to.getHours() + ':' + date_to.getMinutes();

        setText(string);
        if(prop.event.event_id < 0) setComment('');

      }, []);



    const handleClick = () =>{
        if (prop.event.event_id < 0) return;
        let comment:string = 'lalalal';
        getComment(prop.event.event_id).then((com)=>{
            if (com.length === 0) {
                return;
            }
            com.forEach(function (value:Comment) {
                if (value.user_id == prop.logedUser) {
                    comment = value.comment;
                    console.log(comment);
                    prop.handleEventChoice(new PropsNewEvent(prop.event.event_id, prop.event.name, prop.event.from_time, prop.event.to_time, 
                        comment, prop.event.colour, prop.watchedUser, prop.event.type_id, false));
                    return;
                }
        });
        }).catch((err) => {
        console.log(err);
    })

    prop.handleEventChoice(new PropsNewEvent(prop.event.event_id, prop.event.name, prop.event.from_time, prop.event.to_time, 
            '', prop.event.colour, prop.watchedUser, prop.event.type_id, false)); 
    
    }
      

    const findComments = () => {
        if (prop.event.event_id < 0) return;
  
        if (commentShow){
            setCommentShow(false);
            setComment('comments');

        }
        else{
            var string = '';
            getComment(prop.event.event_id).then((com)=>{
                if (com.length === 0) {
                    return;
                }
                com.forEach(function (value:Comment) {
                string = string + value.nickname + ': ' + value.comment + ' \n';
                console.log(string);
                setCommentShow(true);
                setComment(string);
             });
             
            });
            


            }
        //zobrat podla id eventu vsetky komentare a zohnat k nim nicknames

             
        /*
        getNicknames().then((nicknames)=>{
          nicknames.forEach(function (value:any) {
            if (value.user_id !== loginUser) 
                 nicknamesArray.push(value.nickname);
       });});
        return new PropsString(nicknamesArray, 'Others');
      */
      };
      


    return(
        <div>
        <label style={{
      color: prop.event.colour,
      fontWeight: 'bold',
      border: 'none',
    }}>{prop.event.name}</label>
        <button style={buttonStyle} onClick={handleClick} disabled={prop.watchedUser !== prop.logedUser}> 
            {text} 
        </button>
        <button onClick={findComments}>{comment}</button>

    </div>
    )

}

export default ButtonEvent;