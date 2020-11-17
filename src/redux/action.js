import * as types from "./types";

export const toggleCart = (payload) => {
  return {
    type: types.TOGGLE_CART,
    payload,
  };
};

export const setProducts = (payload) => {
  return {
    type: types.SET_PRODUCTS,
    payload,
  };
};

export const updateCart = (payload) => {
  return {
    type: types.UPDATE_CART,
    payload,
  };
};

export const addToCart = (payload) => {
  return {
    type: types.ADD_TO_CART,
    payload,
  };
};

export const setCurrency = (payload) => {
  return {
    type: types.SET_CURRENCY,
    payload,
  };
};
