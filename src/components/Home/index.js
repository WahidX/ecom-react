import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Pagination } from '@material-ui/lab';

import { changePage, fetchProducts } from '../../actions/products';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Configs from '../../utils/configs';
import './home.css';

function Home(props) {
  useEffect(() => {
    props.dispatch(fetchProducts());
  }, []);

  // Gathering proucts of the page
  let page = props.products.page;
  const itemCount = Configs.CARD_ITEMS_COUNT();
  const totalPages = props.products.productList.length / itemCount - 1;

  let products = props.products.productList.slice(
    page * itemCount,
    page * itemCount + itemCount
  );

  let handlePaging = (e, page) => {
    props.dispatch(changePage(page));
  };

  return (
    <div id="home-container">
      <Filters />

      <div className="home-card-container">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>

      <Pagination
        className="pagination"
        count={totalPages}
        color="primary"
        onChange={handlePaging}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(Home);
