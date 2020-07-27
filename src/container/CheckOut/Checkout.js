import React, { Component } from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary'
import { Route} from "react-router-dom";
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
    state={
        ingridients:null,
        totalPrice :0,
    }
    shouldComponentUpdate(){
        
        console.log("should component update")

        console.log(this.state.ingridients)
        return true
    }
    componentWillMount(){
        console.log('component willMount')
        console.log(this.props)
        const query = new URLSearchParams(this.props.location.search);
        const ingridient = {};
        let price = 0;
        for (let param of query.entries()){
            if(param[0] === 'price'){
                console.log('priceeeeee')
                price = +param[1]
            }else{
                ingridient[param[0]]= +param[1];

            }
        }
        this.setState({ingridients:ingridient , totalPrice:price});
    }

    checkoutCancelledHandler=()=>{
        console.log('goback')
        this.props.history.goBack();
    }
    checkoutCountinuedHandler= ()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        console.log('render')
        console.log(this.state.totalPrice)
        console.log(this.state.ingridients)


        console.log(this.state.ingridients)
        return(
            <div>
                <CheckoutSummary  
                ingridients={this.state.ingridients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutCountinued={this.checkoutCountinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                render={()=>(<ContactData ingridients={this.state.ingridients} price={this.state.totalPrice} {...this.props}/>)} />
            </div>
        )
    }
}

export default Checkout;