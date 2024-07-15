import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { createAction, withMatcher, Action, ActionWithPayload } from '../../utils/reducer/reducer.utils';

// cart data manipulations logic
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const subtractCartItem = (cartItems: CartItem[], cartItemToDecrement: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToDecrement.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToDecrement.id);
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToDecrement.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
};

const removeItemFromCart = (cartItems: CartItem[], cartItemToDelete: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_ISCARTOPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_ISCARTOPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems)
};

export const decrementItemInCart = (cartItems: CartItem[], cartItemToDecrement: CartItem) => {
  const newCartItems = subtractCartItem(cartItems, cartItemToDecrement);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToDelete: CartItem) => {
  const newCartItems = removeItemFromCart(cartItems, cartItemToDelete);
  return setCartItems(newCartItems);
};

