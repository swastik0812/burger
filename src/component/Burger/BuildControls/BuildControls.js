import React from 'react';
import Classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls=[
    {lable: 'Salad' ,type: 'salad'},
    {lable: 'Bacon' ,type: 'bacon'},
    {lable: 'Cheese',type: 'cheese'},
    {lable: 'Meat'  ,type: 'meat'}



]

const buildControls = (props)=>{
    return(
        <div className={Classes.BuildControls}>
            <p>CurrentPrice : <strong>{props.price.toFixed(2)}</strong> $</p>
        {controls.map((ctrl)=>{
            return<BuildControl
            key={ctrl.lable}
            lable={ctrl.lable}
            added={()=>props.ingredientAdded(ctrl.type)}
            deduct={()=>props.ingredientDeduct(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        })}
        <button className={Classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
};

export default buildControls;