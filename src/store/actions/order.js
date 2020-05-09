import * as actionTypes from "./actionTypes";
import axios from "../../hoc/axios-order";
import { fetchIngredientFailed } from "./burgerBuilder";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    loading: true,
  };
};

export const purchaseBurger = (order) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", order)
      .then((responseData) => {
        if (!responseData) {
          return;
        }

        const id = responseData.data.name;
        dispatch(purchaseBurgerSuccess(id, order));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
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

        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((error) => dispatch(fetchIngredientFailed(error)));
  };
};
