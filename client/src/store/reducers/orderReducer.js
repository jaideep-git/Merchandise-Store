import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_NEW_ORDER,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const newOrderReducer = (state = { fetching:true }, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        fetching: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
      return {
        fetching: false,
        error: action.payload,
      };
    case CLEAR_NEW_ORDER:
      return {
        order: null,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        fetching: true,
        ...state,
      };

    case MY_ORDERS_SUCCESS:
      return {
        fetching: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { order: {}, fetching: true },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        fetching: true,
        ...state,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        fetching: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
