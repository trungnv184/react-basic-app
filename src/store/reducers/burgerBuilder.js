import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utilities/updateObject";

const initialState = {
  ingredients: null,
  loading: false,
  error: false,
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  });
};

const removeIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  });
};

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: action.ingredients,
    error: false,
    loading: false,
    totalPrice: 4,
  };
};

const fetchIngredientsFailed = (state, action) => {
  return {
    ...state,
    error: true,
    loading: false,
  };
};

const fetchShowHideLoading = (state, action) => {
  return {
    ...state,
    loading: action.loading,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);

    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);

    case actionTypes.SET_INGREDENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    case actionTypes.SHOW_HIDE_LOADING:
      return fetchShowHideLoading(state, action);

    default:
      return state;
  }
};

export default reducer;
