import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import RoutesComponent from './components/routes/Routes';
import { configureStore } from './store/configure-store';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CssBaseline />
        <RoutesComponent />
      </Provider>
    );
  }
}

export default App;
