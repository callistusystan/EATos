import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import reducers from './reducers';
import { Provider } from 'react-redux';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Root extends Component {
    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );
    }
}

export default Root;