import React, {useState, useEffect} from "react";
import Date from "../configs/Date";
import { Weekdays } from "../configs/Weekdays";
import { monthDates } from "../configs/MonthDays";
import PropsButtonEvent from "./props/PropsButtonEvent";
import { getComment, getEvent } from "../api/Events";
import EventInf from "./props/EventInf";

class Comment{
    comment:string;
    nickname:string;

    constructor(comment:string, nickname:string){
        this.comment = comment;
        this.nickname = nickname;
    }
}

export const ButtonEvent: React.FC<EventInf> = (event) => {
    const buttonStyle = {
        color: event.colour,
    };


    const [text, setText] = useState('');
    const [comment, setComment] = useState('comment');
    const [commentsFromQuery, setCommentsQuery] = useState<string[]>([]);
    const [commentShow, setCommentShow] = useState(false);

    useEffect(() => {
        let string = '\n FROM: ' + event.from_time + '   TO: ' + event.to_time;
        setText(string);
        if(event.event_id < 0) setComment('');

      }, []);

    const handleClick = () =>{
        if (event.event_id < 0) return;
    }
      

    const findComments = () => {
        if (event.event_id < 0) return;
  
        if (commentShow){
            setCommentShow(false);
            setComment('comments');

        }
        else{
            var string = '';
            getComment(event.event_id).then((com)=>{
                if (com.length == 0) {
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
      color: event.colour,
      fontWeight: 'bold',
      border: 'none',
    }}>{event.name}</label>
        <button style={buttonStyle} onClick={handleClick}> 
            {text} 
        </button>
        <button onClick={findComments}>{comment}</button>

    </div>
    )

}

export default ButtonEvent;