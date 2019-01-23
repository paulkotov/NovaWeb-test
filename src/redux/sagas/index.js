import { all, call } from 'redux-saga/effects';

import fetchProjects from './fetchData';
import updateComment from './updateComment';

export default function* rootSaga(){
  yield all([
    call(fetchProjects),
    call(updateComment)
  ]);
}