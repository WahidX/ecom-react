import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Home from './components/Home';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import WishList from './components/WishList';
import Page404 from './components/Page404';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import CustomizedSnackbar from './components/shared/SnackBar';
import { fetchProducts } from './actions/products';

// Custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#202020',
    },
  },
});

function App(props) {
  useEffect(() => {
    props.dispatch(fetchProducts());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Header />
        <CustomizedSnackbar />

        <Switch>
          <Route exact path="/" component={Home}></Route>

          <Route exact path="/cart" component={CartPage}></Route>
          <Route exact path="/payment" component={PaymentPage}></Route>
          <Route exact path="/wishlist" component={WishList}></Route>

          <Route component={Page404} />
        </Switch>

        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
