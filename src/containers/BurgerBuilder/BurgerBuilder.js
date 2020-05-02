import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../hoc/axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    hasError: false,
  };

  async componentDidMount() {
    console.log(this.props);
    try {
      axios
        .get("ingredients.json")
        .then((responsedIngredients) => {
          this.setState({
            ingredients: responsedIngredients.data,
          });
        })
        .catch(() => {
          this.setState({
            hasError: true,
          });
        });
    } catch (e) {
      this.setState({
        hasError: true,
      });
    }
  }

  componentWillMount() {
    console.log("[BurgerBuilder]", "componentWillMount");
  }

  componentWillUpdate(nextProp, nextState) {
    console.log("[BurgerBuilder]", "componentWillUpdate");
  }

  updatePurchaseState(ingredients) {
    console.log(ingredients, "AFTER_UPDATED");
    console.log(this.state.ingredients, "CALLED_DIRECT");

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, curr) => sum + curr, 0);

    this.setState({
      purchasable: sum > 0,
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });

    console.log(this.state.ingredients, "ON_PUSH");

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = async () => {
    let queryParams = [];
    for (let igKey in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(igKey) +
          "=" +
          encodeURIComponent(this.state.ingredients[igKey])
      );
    }

    queryParams.push("price=" + this.state.totalPrice.toFixed(2));

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      ></OrderSummary>
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Modal show={this.state.purchasing}>{orderSummary}</Modal>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
    }

    if (this.state.hasError) {
      burger = null;
    }

    return (
      <Aux>{this.state.hasError ? <p>Load Ingredients Error</p> : burger}</Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
