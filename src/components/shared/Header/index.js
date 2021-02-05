import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Badge, Toolbar, Typography, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import './header.css';

const useStyles = makeStyles((theme) => ({
  '*': {
    textDecoration: 'none',
    color: 'white',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  let cartItemsCount = props.cart.count;

  return (
    <div className={classes.root} id="appbar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">React Shop</Link>{' '}
          </Typography>

          <Link to="/wishlist">
            <Button color="inherit">Wish List</Button>
          </Link>

          <Link to="/cart">
            <IconButton>
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(ButtonAppBar);
