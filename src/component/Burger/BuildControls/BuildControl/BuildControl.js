import React from 'react';
import Classes from './BuildControl.css';

const buildControl = (props)=>{
    return(
        <div className={Classes.BuildControl}>
        <div className={Classes.Label}>{props.lable}</div>
        <button className={Classes.Less} onClick={props.deduct} disabled={props.disabled}>
            Less
            </button>
        <button className={Classes.More} onClick={props.added} >
            More
            </button>
        </div>
        
    );
};

export default buildControl;