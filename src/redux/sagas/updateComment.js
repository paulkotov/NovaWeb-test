import { takeEvery, call, put } from 'redux-saga/effects';

import api from '../../api';
import { clearStore, fetchData, fetchDataFail } from '../actions';

function* updateComment(){
  yield takeEvery('UPDATE_COMMENT', updateCommentAsync);
}

function* updateCommentAsync(action) {
  let { id, comment } = action.payload;
  try {
    yield call( () => api.updateComment(id, comment));
    yield put(clearStore());
    yield put(fetchData());

  } catch (error) {
    yield put(fetchDataFail());
  }
}

export default updateComment;