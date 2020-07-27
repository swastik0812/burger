import React from 'react';
import Burger from "../../Burger/Burger"
import Button from '../../Ui/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary =(props)=>{
        return(
            <div className={classes.CheckoutSummary}>
                <h1>we hope it taste well!</h1>
                <div style={{width:'100%' ,margin:'auto'}}>
                <Burger ingridients={props.ingridients}/>
                </div>
                <Button 
                buttonType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button 
                buttonType="Success"
                clicked={props.checkoutCountinued}>CONTINUE</Button>

            </div>
        )

}

export default checkoutSummary;