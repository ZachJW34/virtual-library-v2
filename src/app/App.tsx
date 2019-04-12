import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styles from './App.module.css';
import NavbarComponent from './components/navbar/Navbar';
import RoutesComponent from './components/routes/Routes';
import { configureStore } from './store/configure-store';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CssBaseline />
        <NavbarComponent />
        <div className={styles.container} >
          <RoutesComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
