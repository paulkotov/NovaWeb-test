import { createAction } from 'redux-actions';

// fetch actions
export const fetchData = createAction('FETCH_DATA');
export const fetching = createAction('FETCHING');
export const fetchDataSuccess = createAction('FETCH_DATA_SUCCESS', data => data);
export const fetchDataFail = createAction('FETCH_DATA_FAIL');

// store actions
export const updateStore = createAction('UPDATE_STORE', data => data);
export const clearStore = createAction('CLEAR_STORE');

// comment actions
export const updateComment = createAction('UPDATE_COMMENT', data => data);

// global state
export const setToState = createAction('SET_TO_STATE', data => data);
export const getState = createAction('GET_STATE');

// thunk - here for example
// export function updateComment(id, comment ) {
//   return function(dispatch){
//     dispatch(fetching());
//     api.updateComment(id, comment);
//     dispatch();
//   };
// }