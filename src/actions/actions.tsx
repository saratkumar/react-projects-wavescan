import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
  } from "./actionTypes";
  
  export function fetchDataRequest() {
    return {
      type: FETCH_DATA_REQUEST
    };
  }
  
  export function fetchDataSuccess(item: any) {
    return {
      type: FETCH_DATA_SUCCESS,
      item
    };
  }
  
  export function fetchDataError(error: any) {
    return {
      type: FETCH_DATA_ERROR,
      payload: { error }
    };
  }
  

  