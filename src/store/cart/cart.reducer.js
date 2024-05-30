// import { CART_ACTION_TYPES } from './cart.types';
import { createSlice } from '@reduxjs/toolkit';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subtractCartItem = (cartItems, cartItemToDecrement) => {
  if (cartItemToDecrement.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToDecrement.id,
    );
  }
  return cartItems.map((cartItem) =>
    // eslint-disable-next-line no-nested-ternary
    cartItem.id === cartItemToDecrement.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const removeItemFromCart = (cartItems, cartItemToDelete) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    decrementItemInCart(state, action) {
      state.cartItems = subtractCartItem(state.cartItems, action.payload);
    },
    deleteCartItem(state, action) {
      state.cartItems = removeItemFromCart(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  decrementItemInCart,
  deleteCartItem,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
