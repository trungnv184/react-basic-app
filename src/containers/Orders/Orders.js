import React, { Component } from "react";
import classes from "./Orders.module.css";
import axios from "../../hoc/axios-order";
import Order from "../../components/Order/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((reponsed) => {
        if (!reponsed) {
          return;
        }

        let orders = [];
        for (let key in reponsed.data) {
          orders.push({
            ...reponsed.data[key],
            id: key,
          });
        }
        this.setState({
          loading: false,
          orders: orders,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => {
        return (
          <Order
            key={order.id}
            price={order.price}
            ingredients={order.ingredients}
          />
        );
      });
    }
    return <div className={classes.Orders}>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
