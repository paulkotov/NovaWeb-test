import { takeEvery, call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import api from '../../api';

function* fetchProjects() {
  yield takeEvery('FETCH_DATA', fetchProjectsAsync);
}
  
function* fetchProjectsAsync() {
  try {
    yield put(actions.fetching());
    const data = yield call(() => {
      return api.getProjects();
    });
    yield put(actions.fetchDataSuccess(data));
  } catch (error) {
    yield put(actions.fetchDataFail());
    console.log(error);
  }
}

export default fetchProjects;