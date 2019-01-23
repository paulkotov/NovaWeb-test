import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import rootSaga from './redux/sagas';
import App from  './containers/App';
import { sagaMiddleware, createDefaultStore } from './redux/store';
import { fetchData, setToState } from './redux/actions';

import './index.scss';

let store = createDefaultStore();
sagaMiddleware.run(rootSaga);

const projects = localStorage.getItem('projects');
if (!projects) {
  store.dispatch(fetchData());
  setInterval( () => store.dispatch(fetchData()), 20000);
} else {
  store.dispatch(setToState(JSON.parse(projects)));
}

render(
  <Provider store={store}>
    <div className="app">
      <h1 className="app_header">Projects dashboard</h1>
      <hr/>
      <App/>
    </div>
  </Provider>, 
document.getElementById('root'));