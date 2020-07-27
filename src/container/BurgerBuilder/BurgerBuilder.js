import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import MOdal from "../../component/Ui/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../component/Ui/spinner/spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingridients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    console.log("component did mount");
    axios
      .get("https://react-my-burger-97109.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingridients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingridients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingridients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  updatePurchaseState(ingridients) {
    const sum = Object.keys(ingridients)
      .map((igKey) => {
        return ingridients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    console.log("sum=>" + sum);
    if (sum > 0) {
      this.setState({ purchasable: true });
    } else {
      this.setState({ purchasable: false });
    }
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updateCount = oldCount + 1;
    const updateIngridients = {
      ...this.state.ingridients,
    };
    updateIngridients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingridients: updateIngridients });
    this.updatePurchaseState(updateIngridients);
  };

  removeIngridentHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngridients = {
      ...this.state.ingridients,
    };
    updateIngridients[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingridients: updateIngridients });
    this.updatePurchaseState(updateIngridients);
  };

  render() {
    const disabledInfo = { ...this.state.ingridients };
    for (let key in disabledInfo) {
      if (disabledInfo[key] <= 0) {
        disabledInfo[key] = true;
      } else {
        disabledInfo[key] = false;
      }
    }

    let orderSummary = null;

    if (this.state.ingridients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingridients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingridients are not Loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingridients) {
      burger = (
        <Aux>
          <Burger ingridients={this.state.ingridients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientDeduct={this.removeIngridentHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            purchasable={this.state.purchasable}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <MOdal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </MOdal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
