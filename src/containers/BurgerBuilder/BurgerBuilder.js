import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../hoc/axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentWillMount() {
    console.log("[BurgerBuilder]", "componentWillMount");
  }

  componentWillUpdate(nextProp, nextState) {
    console.log("[BurgerBuilder]", "componentWillUpdate");
  }

  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchaseState(ingredients) {
    console.log(ingredients, "AFTER_UPDATED");
    console.log(this.state.ingredients, "CALLED_DIRECT");

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, curr) => sum + curr, 0);

    return sum > 0;
  }

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
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ings}
        totalPrice={this.props.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      ></OrderSummary>
    );
    if (this.props.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Modal show={this.state.purchasing}>{orderSummary}</Modal>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
          />
        </Aux>
      );
    }

    if (this.props.error) {
      burger = null;
    }

    return (
      <Aux>{this.props.error ? <p>Load Ingredients Error</p> : burger}</Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    loading: state.burgerBuilder.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredients(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredients(ingName)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
