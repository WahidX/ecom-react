import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../../actions/products';
import ProductCard from './ProductCard';
import Filters from './Filters';

import './home.css';

function Home(props) {
  useEffect(() => {
    // Fetching Products
    props.dispatch(fetchProducts());
  }, []);

  let page = props.products.page;
  let products = props.products.productList.slice(
    (page - 1) * 5,
    (page - 1) * 5 + 5
  );

  console.log('to be shown', products);

  return (
    <div>
      <Filters />

      <div className="home-card-container">
        {products.map((product) => (
          <ProductCard product={product} />
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

export default connect(mapStateToProps)(Home);
