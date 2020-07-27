import React from 'react';
import classes from './Burger.css'
import BurgerIngrident from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{
    let transformedIngredients =Object.keys(props.ingridients).map( igKey =>{
        return[...Array(props.ingridients[igKey])].map((_,i)=>{
            return <BurgerIngrident key={igKey+i} type={igKey} />;
        })
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);
    console.log(transformedIngredients);
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>please start adding ingredients!</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngrident type={"bread-top"}></BurgerIngrident>
            {transformedIngredients}
            <BurgerIngrident type={"bread-bottom"}></BurgerIngrident>
        </div>
    );
}


export default burger;