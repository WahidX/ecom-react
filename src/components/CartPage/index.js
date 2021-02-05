import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';

import './cart.css';
import CartCard from './CartCard';

function CartPage(props) {
  let products = [];
  let cartItems = props.cart.items;
  let total = props.cart.total;

  /*
    Structure of items in store
    items = {
      '1231231ID':{
        index: 2
        price: 1000,
        qty: 3,
      }
    }
  */

  if (products) {
    Object.values(cartItems).map((item) => {
      let tmp = props.products.productList[item.index];
      tmp.qty = item.qty;
      tmp.index = item.index;
      if (item.qty) products.push(tmp);
    });
  }

  if (products.length === 0) {
    return (
      <center>
        <Typography variant="h2" style={{ height: '500px', marginTop: '50px' }}>
          Nothing in here
        </Typography>
      </center>
    );
  }

  return (
    <div id="cart-page-container">
      <div id="cart-card-container">
        {products.map((product) => (
          <CartCard product={product} />
        ))}
      </div>

      <Paper id="cart-summary-container">Total Amount: ₹{total}</Paper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(CartPage);
