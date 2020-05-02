import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { withRouter } from "react-router-dom";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  componentDidMount() {
    console.log(this.props);
    const params = new URLSearchParams(this.props.location.search);

    let ingredients = [];
    for (let param of params.entries()) {
      ingredients[param[0]] = +param[1];
    }

    this.setState({
      ingredients: ingredients,
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        ></CheckoutSummary>
      </div>
    );
  }
}

export default withRouter(Checkout);
