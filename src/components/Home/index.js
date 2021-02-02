import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../../actions/products';

function Home(props) {
  useEffect(() => {
    // Fetching Products
    props.dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h1>Products List</h1>
      <h1>Products List</h1>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(Home);
