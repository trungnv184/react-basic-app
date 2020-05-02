import React, { Component } from "react";
import AppStyles from "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className={AppStyles.App}>
        <Layout>
          {/* <BurgerBuilder /> */}
          <Switch>
            <Route path="/" exact component={BurgerBuilder}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route from="/page" render={() => <h1>Page Not Found</h1>}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
