import React from "react"

export const BoardPosition = (props) => {

    let backImg = props.isMushroom ? 'm' : props.isMario ? 'rio' : '';
    return (<React.Fragment>
        <span className={backImg + " span-boxing"} id={props.id} onClick={()=>props.onAddMushroom(props.id)}></span>
    </React.Fragment>);
    // {props.isMario?'M':''}{props.isMushroom?'C':''}
}
