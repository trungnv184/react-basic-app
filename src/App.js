import React, { Component, Suspense } from "react";
import AppStyles from "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import Spinner from "./components/UI/Spinner/Spinner";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
class App extends Component {
  render() {
    return (
      <div className={AppStyles.App}>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route
              path="/orders/"
              render={() => (
                <Suspense fallback={<Spinner />}>
                  <Orders />
                </Suspense>
              )}
            ></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
