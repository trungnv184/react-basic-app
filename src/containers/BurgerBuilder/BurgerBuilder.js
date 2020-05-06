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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    hasError: false,
  };

  async componentDidMount() {
    console.log(this.props);
    // try {
    //   axios
    //     .get("ingredients.json")
    //     .then((responsedIngredients) => {
    //       this.setState({
    //         ingredients: responsedIngredients.data,
    //       });
    //     })
    //     .catch(() => {
    //       this.setState({
    //         hasError: true,
    //       });
    //     });
    // } catch (e) {
    //   this.setState({
    //     hasError: true,
    //   });
    // }
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
    // let queryParams = [];
    // for (let igKey in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(igKey) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[igKey])
    //   );
    // }

    // queryParams.push("price=" + this.state.totalPrice.toFixed(2));

    // const queryString = queryParams.join("&");

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
    if (this.state.loading) {
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

    if (this.state.hasError) {
      burger = null;
    }

    return (
      <Aux>{this.state.hasError ? <p>Load Ingredients Error</p> : burger}</Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
