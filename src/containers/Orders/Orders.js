import React, { useEffect } from "react";
import classes from "./Orders.module.css";
import axios from "../../hoc/axios-order";
import Order from "../../components/Order/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const Orders = (props) => {
  const { onFetchOrders, loading, orders } = props;
  useEffect(() => {
    onFetchOrders();
  }, [onFetchOrders]);

  let ordersData = <Spinner />;
  if (!loading) {
    ordersData = orders.map((order) => {
      return (
        <Order
          key={order.id}
          price={order.price}
          ingredients={order.ingredients}
        />
      );
    });
  }

  return <div className={classes.Orders}>{ordersData}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
