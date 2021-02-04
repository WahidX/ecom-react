import React from 'react';
import { connect } from 'react-redux';

import { Pagination } from '@material-ui/lab';

import { changePage } from '../../actions/products';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Configs from '../../utils/configs';
import './home.css';

function Home(props) {
  let page = props.products.page;
  const itemCount = Configs.CARD_ITEMS_COUNT();
  const totalPages = props.products.productList.length / itemCount - 1;

  // Gathering proucts for the page
  let products = props.products.productList.slice(
    (page - 1) * itemCount,
    (page - 1) * itemCount + itemCount
  );

  let index = (page - 1) * itemCount;

  let handlePaging = (e, page) => {
    props.dispatch(changePage(page));
  };

  // console.log('main:::', index);

  return (
    <div id="home-container">
      <Filters />

      <div className="home-card-container">
        {products.map((product) => (
          <ProductCard product={product} page={'home'} index={index++} />
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
