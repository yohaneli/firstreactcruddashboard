import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import Firebase,{FirebaseContext} from './components/Firebase'
import store from './redux/store';
import {Provider} from 'react-redux';


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
            <App />
        </Provider>
    </FirebaseContext.Provider>, document.getElementById('root')
);
