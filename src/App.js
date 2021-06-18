import React, { Component } from 'react';
import App from 'base-shell/lib';
import MUIConfig from 'material-ui-shell/lib';
import merge from 'base-shell/lib/utils/config';
import _config from './config';
import { Provider } from 'react-redux';
// meme principe que firebase , mais pour consommer le store
import store from 'redux/store';

const config = merge(MUIConfig, _config)

export default class Demo extends Component {
  render() {
    return (
      <Provider store={store}>
        <App config={config} />
        </Provider>  
    )
  }
}
