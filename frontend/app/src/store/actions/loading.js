// Yuji Alves - Redux Action of loadings information (to show spinner).

import * as actionTypes from "./actionTypes";

export const setLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING,
    loading,
  };
};

export const setNextPage = (nextPage) => {
  return {
    type: actionTypes.SET_NEXT_PAGE,
    nextPage,
  };
};
