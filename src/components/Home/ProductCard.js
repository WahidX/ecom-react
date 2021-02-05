import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { addToWishList, rmFromWishList } from '../../actions/products';
import { addToCart, rmFromCart } from '../../actions/cart';

function ProductCard(props) {
  let product = props.product;
  let index = props.index;

  // For WishList
  let wishList = props.products.wishList;
  let isInWishList = false;

  for (let i = 0; wishList && i < wishList.length; i++) {
    if (wishList[i].id === product.id) {
      isInWishList = true;
      break;
    }
  }

  let handleWishListToggle = () => {
    isInWishList
      ? props.dispatch(rmFromWishList(props.product))
      : props.dispatch(addToWishList(props.product));
  };

  // for Cart
  let items = props.cart.items;
  let qty = 0;
  if (items[product.id]) {
    qty = items[product.id].qty;
  }

  let handleCartToggle = (type) => {
    if (type === 'add') {
      qty++;
      props.dispatch(addToCart(product.id, product.price, index));
    } else if (qty) {
      qty--;
      props.dispatch(rmFromCart(product.id, product.price, index));
    }
  };

  return (
    <Card className="home-card" key={'prod-' + product.id}>
      <img src={product.imgUrl} alt={product.title} className="home card-img" />

      <Link to="/product">
        <CardHeader
          className="home-card-header"
          title={product.title}
          subheader={product.brand}
        />
      </Link>

      <CardContent>
        <Typography variant="body2" color="textPrimary">
          ₹{product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.hardwareplatform}
        </Typography>
      </CardContent>
      <CardActions className="card-action-container">
        <IconButton onClick={handleWishListToggle}>
          {isInWishList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <div className="right-actions">
          {qty ? (
            <React.Fragment>
              <IconButton onClick={() => handleCartToggle('add')}>
                <AddIcon />
              </IconButton>
              <Typography color="secondary" display="inline">
                {qty}
              </Typography>
              <IconButton onClick={() => handleCartToggle('rm')}>
                <RemoveIcon />
              </IconButton>
            </React.Fragment>
          ) : (
            <IconButton onClick={() => handleCartToggle('add')}>
              <Button variant="outlined" color="secondary">
                Add to Cart
              </Button>
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(ProductCard);
