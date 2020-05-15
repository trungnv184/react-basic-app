import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
const Checkout = (props) => {
  const match = useRouteMatch();

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <React.Fragment>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        ></CheckoutSummary>
        <Route
          path={match.path + "/contact-data"}
          component={ContactData}
        ></Route>
      </React.Fragment>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};
export default connect(mapStateToProps)(Checkout);
