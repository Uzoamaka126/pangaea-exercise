import * as types from "../types";

const initialState = {
  cart: [],
  cartIsOpened: false,
  products: [],
  currency: "USD",
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_CART:
      return { ...state, cartIsOpened: action.payload };

    case types.SET_PRODUCTS:
      const cartArray = [...state.cart];
      const products = [...action.payload];

      const newCartArray = [];
      //get cart items and update their price anytime it changes in the products list
      products.forEach((product) => {
        const cartItem = cartArray.find(
          (cartItem) => cartItem.id === product.id
        );
        // update the price
        if (cartItem) {
          newCartArray.push({ ...cartItem, price: product.price });
        }
      });
      // set new cart array
      return { ...state, products: action.payload, cart: newCartArray };
    case types.ADD_TO_CART:
      const product = action.payload;
      const carts = [...state.cart];
      const cart = carts.find((cartItem) => cartItem.id === product.id);
      if (cart) {
        cart.quantity++;
      } else {
        carts.push({ ...product, quantity: 1 });
      }
      return { ...state, cart: carts };

    case types.UPDATE_CART:
      const { operation, cartItem } = action.payload;
      // cart
      const allCartItems = [...state.cart];
      allCartItems.map((cart, index) => {
        if (cart.id === cartItem.id) {
          switch (operation) {
            case "minus":
              if (cart.quantity === 1) allCartItems.splice(index, 1);
              else cart.quantity--;
              break;
            case "add":
              cart.quantity++;
              break;
            case "remove":
              allCartItems.splice(index, 1);
              break;
            default:
              break;
          }
        }
        return cart;
      });
      return { ...state, cart: allCartItems };
    case types.SET_CURRENCY:
      return { ...state, currency: action.payload };
    default:
      return state;
  }
};
