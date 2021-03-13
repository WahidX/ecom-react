import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  TextField,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
  TextareaAutosize,
  Typography,
  StepContent,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { wishListToggle, editItem, deleteItem } from '../../actions/products';
import { addToCart, rmFromCart } from '../../actions/cart';
import { setSnackBar } from '../../actions/snackbar';
import DialogBox from '../shared/DialogBox';

function ProductCard(props) {
  let product = props.product;
  let index = props.index;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [brand, setBrand] = useState(product.brand);
  const [price, setPrice] = useState(product.price);
  const [hardwareplatform, setHardwareplatform] = useState(
    product.hardwareplatform
  );

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
      ? props.dispatch(wishListToggle('rm', props.product))
      : props.dispatch(wishListToggle('add', props.product));
  };

  // for Cart
  let items = props.cart.items;
  let qty = 0;
  if (items[product.id]) {
    qty = items[product.id].qty;
  }

  let handleCartToggle = (type, alert) => {
    if (type === 'add') {
      qty++;
      props.dispatch(addToCart(alert, product.id, product.price, index));
    } else if (qty) {
      qty--;
      props.dispatch(rmFromCart(alert, product.id, product.price, index));
    }
  };

  // Editing
  let cancelEdit = (e) => {
    setEditable(false);
    setTitle(product.title);
    setBrand(product.brand);
    setPrice(product.price);
    setHardwareplatform(product.hardwareplatform);
    setDialogOpen(false);
  };

  let handleSave = () => {
    if (
      title &&
      brand &&
      price &&
      hardwareplatform !== 0 &&
      typeof (price - 0) === 'number'
    ) {
      setDialogContent('Are you sure want to save changes?');
      setDialogOpen(true);
      // need to send whole product obj with changes
    } else {
      props.dispatch(
        setSnackBar('error', "Can't save with INVALID field(s)!", 2000)
      );
      console.log('invalid data');
    }
  };

  let saveConfirm = () => {
    let changedProduct = {
      ...product,
      title,
      brand,
      price,
      hardwareplatform,
    };
    props.dispatch(editItem(changedProduct));
    setEditable(false);
    props.dispatch(setSnackBar('success', 'Changes saved', 2000));
    console.log('saved');
    setDialogOpen(false);
  };

  let handleDeleteItem = () => {
    setDialogContent('Are you sure want to delete?');
    setDialogOpen(true);
  };

  let deleteConfirm = () => {
    console.log('have to delete', index);
    props.dispatch(deleteItem(product, index));
    setDialogOpen(false);
  };

  return (
    <Card className="home-card" key={'prod-' + product.id}>
      <DialogBox
        open={dialogOpen}
        content={dialogContent}
        onConfirm={editable ? saveConfirm : deleteConfirm}
        onCancel={editable ? cancelEdit : () => setDialogOpen(false)}
      />

      <div className="card-action-container">
        {!editable && (
          <IconButton onClick={() => setEditable(true)}>
            <EditIcon />
          </IconButton>
        )}

        {editable && (
          <IconButton onClick={handleSave}>
            <DoneIcon />
          </IconButton>
        )}

        <IconButton
          onClick={() => {
            editable ? cancelEdit() : handleDeleteItem();
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <img src={product.imgUrl} alt={title} className="home card-img" />

      {editable ? (
        <React.Fragment>
          <TextField
            multiline
            rowsMax={3}
            maxLength="40"
            defaultValue={title}
            variant="outlined"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <InputBase value={brand} onChange={(e) => setBrand(e.target.value)} />

          <CardContent>
            <InputBase
              placeholder="Platform"
              value={hardwareplatform}
              onChange={(e) => setHardwareplatform(e.target.value)}
            />
            (₹)
            <InputBase
              type="number"
              required={true}
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </CardContent>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link to="/product">
            <CardHeader
              className="home-card-header"
              title={title}
              subheader={brand}
            />
          </Link>

          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {hardwareplatform}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              ₹{price}
            </Typography>
          </CardContent>
        </React.Fragment>
      )}

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
              <IconButton
                onClick={() => {
                  qty === 1
                    ? handleCartToggle('rm', true)
                    : handleCartToggle('rm', false);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </React.Fragment>
          ) : (
            <IconButton onClick={() => handleCartToggle('add', true)}>
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
