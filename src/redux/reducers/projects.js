import { handleActions } from 'redux-actions';

export const defaultState = {
  projects: [],
  loading: false,
  error: false,
};

const projects = handleActions({
  GET_STATE: (state) => ([
    ...state.projects
  ]),
  SET_TO_STATE: (state, data) => ({
    ...state,
    projects: data.payload
  }),
  FETCH_DATA_SUCCESS: (state, data) => ({
    ...state, 
    loading: false,
    projects: data.payload
  }),
  FETCH_DATA_FAIL: state => ({
    ...state,
    error: true,
    loading: false,
  }),
  FETCHING: state => ({
    ...state,
    loading: true
  })
}, defaultState);

export default projects;
