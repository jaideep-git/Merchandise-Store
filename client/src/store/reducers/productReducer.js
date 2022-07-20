import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/productConstants';


export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        fetching: true,
        products: []
      }
    case ALL_PRODUCT_SUCCESS:
      return {
        fetching: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductCount: action.payload.filteredProductCount
      }
    case ALL_PRODUCT_FAIL:
      return {
        fetching: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error:null
      }
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

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
