
## CartUseReducer w/ clearCartHandler function

**CartUseReducer.js**

```js
import cartContext from "./cart-context2";
import { useContext, useEffect, useReducer } from "react";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount = updatedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR_CART") {
    return initialState;
  }

  return initialState;
};

export function CartUseReducer({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));

    if (storedCart) {
      dispatchCartAction({ type: "SET_CART", items: storedCart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.items));
  }, [cartState.items]);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <cartContext.Provider value={cartContextValue}>
      {children}
    </cartContext.Provider>
  );
}

export function useCartCrud() {
  return useContext(cartContext);
}
```

**cartContext2.js**

```js
import { createContext } from "react";

const cartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item, quantity) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default cartContext;
```

**CartItem.js**

```js
import React, { Fragment, useContext } from "react";
import { useCartCrud } from "../store/CartProvider";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import cartContext from "../store/cart-context2";

export default function CartItem({ cartItem }) {
  const { name, quantity, price, description, imageUrl } = cartItem;
  // const { addItem, removeItem, updateCart } = useCartCrud();
  const cartCtx = useContext(cartContext);

  const handleAddItem = () => {
    cartCtx.addItem({ ...cartItem, quantity: 1 });
  };

  const handleRemoveItem = () => {
    cartCtx.removeItem(cartItem.id);
  };

 const handleClearAll = () => {
  cartCtx.clearCart();
};

  // const handleAddItem = () => {
  //   addItem(cartItem);
  // };

  // const handleRemoveItem = () => {
  //   removeItem(cartItem);
  // };

  // const handleClearAll = () => {
  //   updateCart(cartItem, -1 * quantity);
  // };

  return (
    <Grid item xs={12} sm={12} md={2}>
      <List
        sx={{
          width: "100%",
          maxWidth: "auto",
          bgcolor: "background.transparent",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={description} src={imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  RM{price}
                </Typography>
                {/* {" — "}
                {description} */}
                {" — "} ×{quantity}
              </Fragment>
            }
          />

          <Grid item xs={6} sm={12} md={2}>
            <Tooltip title="add 1">
              <IconButton
                onClick={handleAddItem}
                sx={{
                  color: "green",
                  border: "1px solid",
                  m: 1,
                }}
                size="small"
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="remove 1">
              <IconButton
                onClick={handleRemoveItem}
                sx={{ color: "black", border: "1px solid", m: 1 }}
                size="small"
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="clear all">
              <IconButton
                onClick={handleClearAll}
                sx={{ color: "red", border: "1px solid", m: 1 }}
                size="small"
              >
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Grid>
  );
}
```

## CartProvider.js

to make the cart on the app bar not lose the number of items ordered when refreshing the page is by using `localStorage`.

In your cartReducer function, you are already setting the updated cart items in the `localStorage` when adding or removing an item. Now, you can retrieve the cart items from `localStorage` when initializing the cartState. Here's how you can modify your CartProvider component to achieve this:

```js
const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialState,
    () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { items: cartItems, totalAmount: totalAmount };
    }
  );
```

## appbar not use any react hooks but in second code of appbar it uses both

how when add to cart, and refresh the cartLength of that showing how many numbers of items added in Appbar not showing the number?

> Based on the provided code, it seems like the cart length is being calculated correctly and passed to the Badge component as the badgeContent prop. However, it's possible that the items property of cartCtx is not being updated properly when a new item is added to the cart. One way to fix this issue is to use the useEffect hook to update the cart length whenever the items property changes:

why does it work? whats difference between first codes and second codes? why in first code the appbar not use any react hooks but in second code of appbar it uses both?

**ANSWER:**
The first code represents a custom hook and a context provider, whereas the second code represents a reducer function to manage the state of the shopping cart.

In the first code, the context provider uses the useState hook to manage the state of the shopping cart, while the custom hook uses the useContext hook to access the state and actions provided by the context provider. In the second code, the reducer function is used to manage the state of the shopping cart by handling different actions that can be dispatched to it.

The difference between the two implementations is that the second code uses a more standardized approach to manage the state of the application using a reducer function, which is a feature provided by the React library. The first code provides a more flexible approach by allowing developers to use hooks and context API to create their custom state management solutions.

Regarding the AppBar component, both implementations use the useContext hook to access the state and actions provided by the shopping cart context provider. The difference is that the first implementation uses the useState hook to manage the state of the shopping cart, while the second implementation uses a reducer function to manage the state. As a result, the implementation of the updateCart and calculateCartTotal functions in the first code is different from the implementation of the ADD_ITEM and REMOVE_ITEM actions in the reducer function of the second code.

```
1. first code - original code

import cartContext from "./cart-context";
import { useContext, useEffect, useState } from "react";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateCartTotal = (array, prop) => {
    return array.reduce(
      (item, current) => item + current[prop] * current.quantity,
      0
    );
  };

  const updateCart = (item, quantity) => {
    // console.log("updateCart", item, quantity);

    const product = items.find((i) => i.id === item.id);
    if (product) {
      const newCart = [];
      for (let i of items) {
        if (i.id === item.id) {
          i.quantity += Number(quantity);
          if (i.quantity === 0) {
            continue;
          }
        }
        newCart.push(i);
      }
      setItems(newCart);
      setTotalAmount(calculateCartTotal(newCart, "price"));
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const updatedItem = { ...item, quantity: 1 };
      setItems([...items, updatedItem]);
      setTotalAmount(calculateCartTotal([...items, updatedItem], "price"));
      localStorage.setItem("cart", JSON.stringify([...items, updatedItem]));
    }
  };

  const addItem = (item) => {
    updateCart(item, 1);
  };

  const removeItem = (item) => {
    updateCart(item, -1);
  };

  // get data from localStorage ✔️
  useEffect(() => {
    const myCart = localStorage.getItem("cart");

    // getData();

    if (!myCart) {
      localStorage.setItem("cart", []);
    } else {
      if (myCart !== "") {
        setItems(JSON.parse(myCart));
        setTotalAmount(calculateCartTotal(JSON.parse(myCart), "price"));
      }
    }
  }, []);

  const value = {
    items,
    totalAmount,
    addItem,
    removeItem,
    updateCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export function useCartCrud() {
  return useContext(cartContext);
}



1. first code

import React from "react";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { useCartCrud } from "../store/CartProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Appbar({ showModalHandler }) {
  const { items } = useCartCrud();
  const cartLength = items ? items.length : 0;

  return (
    <AppBar sx={{ bgcolor: "transparent" }} elevation={0}>
      <Toolbar
        position="static"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          className="button-74"
          onClick={showModalHandler}
          sx={{
            color: "#ff9900",
            backgroundColor: "#fff",
            gap: 2,
            borderRadius: 10,
            border: "1px solid",
          }}
          aria-label="cart"
        >
          <Badge badgeContent={cartLength} color="warning">
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="body1">My Cart</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;



2. second code:

import cartContext from "./cart-context";
import { useEffect, useReducer } from "react";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount = updatedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    localStorage.setItem("cart", JSON.stringify(updatedItems));

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR_CART") {
    localStorage.setItem("cart", JSON.stringify([]));
    return initialState;
  }

  return initialState;
};

export function CartProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <cartContext.Provider value={cartContextValue}>
      {children}
    </cartContext.Provider>
  );
}


2. second code

import React, { useContext, useEffect, useState } from "react";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import cartContext from "../store/cart-context";

function Appbar({ showModalHandler }) {
  const cartCtx = useContext(cartContext);
  const { items } = cartCtx;

  const [cartLength, setCartLength] = useState(items ? items.length : 0);

  useEffect(() => {
    setCartLength(items.length);
  }, [items]);

  return (
    <AppBar sx={{ bgcolor: "transparent" }} elevation={0}>
      <Toolbar
        position="static"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          className="button-74"
          onClick={showModalHandler}
          sx={{
            color: "#ff9900",
            backgroundColor: "#fff",
            gap: 2,
            borderRadius: 10,
            border: "1px solid",
          }}
          aria-label="cart"
        >
          <Badge badgeContent={cartLength} color="warning">
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="body1">{cartLength} My Cart</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
```

### still not understand the logic or reasons behind it?

The two code examples represent different approaches to managing the state of a shopping cart in a React application.

In the first code example, the shopping cart state is managed using the useState hook to manage a list of items and the total amount. The CartProvider component provides the items and totalAmount state and a set of functions to update the state such as addItem and removeItem. The useCartCrud function exports the cartContext which can be consumed by other components to access the state of the shopping cart.

In the second code example, the shopping cart state is managed using the useReducer hook to handle state changes based on dispatched actions. The cartReducer function defines the logic for handling different types of actions such as ADD_ITEM, REMOVE_ITEM, and CLEAR_CART. The CartProvider component initializes the state using the initialState object and provides a dispatch function to update the state based on dispatched actions. This component also provides the items and totalAmount state and exports the cartContext to be consumed by other components to access the state of the shopping cart.

The AppBar component in both code examples uses the useCartCrud hook to consume the cartContext and display the number of items in the cart using a badge component from the Material UI library.

Both approaches are valid ways to manage state in a React application and the choice between them often depends on the complexity of the state and the requirements of the application. useReducer can be useful for more complex state logic, where useState may become unwieldy, but requires more setup than useState.

### why `useeffect`? what it useeffect means there in appbar

`useEffect` is a built-in hook in React that allows you to perform side effects in functional components. Side effects can include fetching data from an API, manipulating the DOM, or subscribing to events.

In the context of an `AppBar` in a React application, useEffect can be used to modify the appearance or behavior of the `AppBar` based on changes in the application state. For example, if you want to change the color of the `AppBar` based on the theme selected by the user, you could use useEffect to update the styling of the `AppBar` when the theme changes.

Here's an example of how you might use `useEffect` to update the color of an `AppBar` based on the user's selected theme:

```js
import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { useTheme } from '@material-ui/core/styles';

function MyAppBar() {
  const [color, setColor] = useState('primary');
  const theme = useTheme();

  useEffect(() => {
    setColor(theme.palette.type === 'dark' ? 'secondary' : 'primary');
  }, [theme.palette.type]);

  return (
    <AppBar color={color}>
      {/* content goes here */}
    </AppBar>
  );
}
```

In this example, we're using `useState` to store the color of the `AppBar` and `useTheme` to access the current theme of the application. We're using `useEffect` to update the color of the AppBar whenever the theme changes. The second argument of `useEffect` is an array of dependencies that tells React when to run the effect. In this case, we only want the effect to run when the `theme.palette.type` changes.

# make the cart on the app bar not lose the number of items ordered when refreshing the page is by using localStorage !!! important !!!

Using localStorage helps to persist data even after a page refresh. In the code you provided, the useReducer hook is used to manage the state of the shopping cart. The initialState object contains two properties, items and totalAmount, that represent the cart items and their total price, respectively.

The third argument passed to useReducer is a function that initializes the state. In this case, it checks if there are any cart items stored in localStorage using the getItem method. If there are items, they are parsed from the string representation using JSON.parse and used to set the items property of the state. The totalAmount is calculated by reducing the items array, multiplying each item's price and quantity properties, and summing up the results.

Using localStorage in this way ensures that the state is always initialized with the latest data, even if the user refreshes the page or closes and reopens the browser. Therefore, the number of items in the cart will be retained even after refreshing the page.

```javascript
export function CartProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialState,
    () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { items: cartItems, totalAmount: totalAmount };
    }
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <cartContext.Provider value={cartContextValue}>
      {children}
    </cartContext.Provider>
  );
}
```

## third argument passed to the useReducer hook is the `init` function

The third argument passed to the useReducer hook is the init function, which is an optional initializer function.

This function is used to compute the initial state of the reducer. When the component mounts, init is called once, and its return value is used as the initial state.

In the provided code, the init function is used to retrieve the cart items from the localStorage and compute the total amount of the items. This way, when the component mounts, it initializes the cart state using the saved cart items from the localStorage, ensuring that the cart retains its items even when the page is refreshed.