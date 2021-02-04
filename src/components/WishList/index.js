import React from 'react';
import { connect } from 'react-redux';

import './wishlist.css';
import { Button, Typography } from '@material-ui/core';
import ProductCard from '../Home/ProductCard';
import { clearWishList } from '../../actions/products';

function WishList(props) {
  let wishList = props.products.wishList;

  let handleClearAll = () => {
    props.dispatch(clearWishList());
  };

  if (wishList.length === 0) {
    return (
      <center>
        <Typography variant="h2" style={{ height: '500px', marginTop: '50px' }}>
          Nothing in here
        </Typography>
      </center>
    );
  }

  return (
    <div id="wishlist-container">
      <Button variant="outlined" color="secondary" onClick={handleClearAll}>
        Clear ALL
      </Button>

      <div className="home-card-container">
        {wishList.map((product) => (
          <ProductCard product={product} page={'home'} />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(WishList);
