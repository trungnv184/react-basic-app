import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../hoc/axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
class ContactData extends Component {
  state = {
    customer: {
      name: "",
      phone: "",
      address: {
        street: "",
        streetNumber: "",
        city: "",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: {
        ...this.props.ings,
      },
      price: this.props.price,
      customer: {
        name: "Alex",
        phone: "0906925896",
        address: {
          street: "Tan Thanh",
          streetNumber: "10",
          city: "HCM",
        },
      },
    };

    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
    console.log(this.props);
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Add Name"></input>
        <input type="text" name="phone" placeholder="Add Phone"></input>
        <input type="text" name="street" placeholder="Add Street"></input>
        <input
          type="text"
          name="streetNumber"
          placeholder="Add Street Number"
        ></input>
        <input type="text" name="city" placeholder="Add City"></input>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h1>Enter Ordered Customer</h1>
        {form}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ings,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
