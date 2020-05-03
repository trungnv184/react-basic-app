import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../hoc/axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
        ...this.props.ingredients,
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
        <Input inputType="input" name="name" placeholder="Your Name" />
        <Input inputType="input" name="email" placeholder="Your Email" />
        <Input inputType="input" name="street" placeholder="Street" />
        <Input inputType="input" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h1>Enter Ordered Customer</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
