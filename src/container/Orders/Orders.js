import React, { Component } from "react";
import Order from "../../component/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res.data);
        const fetchData = [];
        for (let key in res.data) {
          fetchData.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchData });
      })
      .catch((error) => {
        this.setState({ loading: true });
      });
  }

  componentDidUpdate() {
    console.log(this.state.orders);
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingridients}
              price={+order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
