import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/CheckOut/Checkout";
import orders from "./container/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" component={orders} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
