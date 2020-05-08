import * as actionTypes from "./actionTypes";
import axios from "../../hoc/axios-order";

export const addIngredients = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name,
  };
};

export const removeIngredients = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const showHideLoading = (loadingStatus) => {
  return {
    type: actionTypes.SHOW_HIDE_LOADING,
    loading: loadingStatus,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("ingredients.json")
      .then((ingredients) => {
        dispatch(setIngredients(ingredients.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientFailed());
      });
  };
};
