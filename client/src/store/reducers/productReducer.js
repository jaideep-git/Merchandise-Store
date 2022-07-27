import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        fetching: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        fetching: false,
        productCount: action.payload.productCount,
        paginatedProductCount: action.payload.paginatedProductCount,
        paginatedProducts: action.payload.paginatedProducts,
      };
    case ALL_PRODUCT_FAIL:
      return {
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        fetching: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        fetching: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case NEW_REVIEW_SUCCESS:
    case DELETE_REVIEW_SUCCESS:
      return {
        fetching: false,
        success: action.payload,
        isDeleted: action.payload,
      };
    case NEW_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        success: false,
        isDeleted: false,
      };
    default:
      return state;
  }
};
