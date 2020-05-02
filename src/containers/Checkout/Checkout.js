import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { withRouter, Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
    price: 0,
  };

  componentDidMount() {
    console.log(this.props);
    const params = new URLSearchParams(this.props.location.search);

    let ingredients = [];
    let price = 0;
    for (let [key, value] of params.entries()) {
      if (key === "price") {
        price = value;
      } else {
        ingredients[key] = +value;
      }
    }

    this.setState({
      ingredients: ingredients,
      price: price,
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
      <React.Fragment>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...this.props}
            />
          )}
        ></Route>
      </React.Fragment>
    );
  }
}

export default withRouter(Checkout);
