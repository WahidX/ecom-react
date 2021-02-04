import React from 'react';
import { connect } from 'react-redux';
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

import { rmFromWishList, addToWishList } from '../../actions/products';
import { rmFromCart, addToCart } from '../../actions/cart';

function CartCard(props) {
  let product = props.product;

  // For WishList
  let wishList = props.products.wishList;
  let isInWishList = false;

  for (let i = 0; wishList && i < wishList.length; i++) {
    if (wishList[i]._id.$oid === product._id.$oid) {
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
  if (items[product._id.$oid]) {
    qty = items[product._id.$oid].qty;
  }

  let handleCartToggle = (type) => {
    if (type === 'add') {
      qty++;
      props.dispatch(addToCart(product._id.$oid, product.price, product.index));
    } else if (qty) {
      qty--;
      props.dispatch(
        rmFromCart(product._id.$oid, product.price, product.index)
      );
    }
  };

  return (
    <Card className="cart-card">
      <div className="cart-card-content">
        <img
          src={product.images.large.url}
          alt={product.label}
          className="home card-img"
        />

        <CardHeader
          className="home-card-header"
          title={product.title}
          subheader={product.brand}
        />

        <CardContent>
          {product.qty +
            'x' +
            product.price +
            '= ' +
            product.qty * product.price}
        </CardContent>
      </div>

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
    cart: state.cart,
    products: state.products,
  };
}

export default connect(mapStateToProps)(CartCard);
