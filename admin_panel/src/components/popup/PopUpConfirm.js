import "./PopUp.css" ;
import { useEffect } from "react";

export default function PopUpConfirm(props) {

    return (props.trigger) ? (
        <div className="popup">
            <div className="pop-inner">
                <div
                onClick = {()=>{ props.setTrigger(false)}}
                >

                    X
                </div>
                <div className="confirmpopup">
                    <h3>{props.phrase_conf} </h3> 
                    <button className="confirmbtn"
                    onClick ={()=>{
                       props.setTrigger(false) ; 
                    }}
                    >Confirm</button>
                    <button className="confirmbtn"onClick = {()=>{ props.setTrigger(false)}}>Decline</button>

                </div>
                
            </div>

        </div>
    ) :"" ; 
}