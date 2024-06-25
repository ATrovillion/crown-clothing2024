import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
  SET_ISCARTOPEN = 'cart/SET_ISCARTOPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  SET_CART_COUNT = 'cart/SET_CART_COUNT',
  SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
};

export type CartItem = CategoryItem & {
  quantity: number;
}
