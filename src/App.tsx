import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectComponent from './components/ProjectComponent/ProjectComponent';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import rootReducers from './reducers/rootReducers';
import { Provider } from 'react-redux';
const store = createStore(rootReducers, applyMiddleware(thunk));
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProjectComponent />
      </div>
    </Provider>
  );
}

export default App;
