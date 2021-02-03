import React from 'react';
import { connect } from 'react-redux';

import ProductCard from '../Home/ProductCard';

function WishList(props) {
  let wishList = props.products.wishList;

  return (
    <div className="home-card-container">
      {wishList.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(WishList);
