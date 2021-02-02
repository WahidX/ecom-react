import React from 'react';
import {
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

function ProductCard(props) {
  let product = props.product;

  return (
    <Card className="home-card" id={'prod-' + product._id.$oid}>
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
        <Typography variant="body2" color="textPrimary">
          ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.operatingsystem}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <AddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
