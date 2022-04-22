import React from "react";

import { Container, Typography, Button, Grid, Stack } from "@mui/material";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  //   const isEmpty = (cart.line_items.length = !cart.line_items.length);

  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart,
        <Link to="/" className={classes.link}>
          start adding some
        </Link>
        !
      </Typography>
    );
  };

  if (!cart.line_items) return "Loading";

  const FilledCart = () => {
    return (
      <>
        {cart.line_items && (
          <>
            <Grid container spacing={5} sx={{ mt: 4 }}>
              {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                  <CartItem
                    item={item}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                  />
                </Grid>
              ))}
            </Grid>
            <div className={classes.cardDetails}>
              <Typography variant="h4">
                Subtotal: {cart.subtotal.formatted_with_symbol}
              </Typography>
              <div>
                <Stack direction="row" spacing={4}>
                  <Button
                    className={classes.emptyButton}
                    size="large"
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleEmptyCart}
                    marginRight={2}
                  >
                    Empty Cart
                  </Button>
                  <Button
                    className={classes.checkoutButton}
                    size="large"
                    type="button"
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/checkout"
                  >
                    Checkout
                  </Button>
                </Stack>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography
        className={classes.title}
        gutterBottom
        variant="h3"
        sx={{ mt: 10 }}
      >
        Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
