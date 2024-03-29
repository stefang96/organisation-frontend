import paymentsConstants from "../../constants/paymentsConstants";

/**
 * Login and registration reducer redux
 */

const initialState = {
  paymentList: null,
  payment: {},
  paymentMeta: null,
  successAction: false,
  errorAction: false,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case paymentsConstants.GET_PAYMENT:
      return {
        ...state,
        payment: action.data,
      };
    case paymentsConstants.GET_PAYMENTS:
      return {
        ...state,
        paymentList: action.data.result,
        paymentMeta: action.data.meta,
      };

    default:
      return state;
  }
};
