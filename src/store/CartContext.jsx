import { createContext, useReducer, useEffect } from "react";
import { Products } from "../products";

export const CartContext = createContext({
  items: [],
  addToCart: () => {},
  updateItemQuantity: () => {},
});

const getInitialCart = () => {
  const storedCart = localStorage.getItem("cartItems");

  if (!storedCart) {
    return { items: [] };
  }
  try {
    return { items: JSON.parse(storedCart) };
  } catch (error) {
    console.error("Failed to parse cartItems:", error);
    return { items: [] };
  }
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) =>
        cartItem.id === action.payload &&
        cartItem.color === action.color,
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.quantity,
      };
    } else {
      const product = Products.find((product) => product.id === action.payload);

      if (!product) {
        console.error("Product not found:", action.payload);
        return state;
      }

      updatedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: action.color,
        quantity: action.quantity,
      });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];

    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId,
    );

    if (updatedItemIndex === -1) {
      return state;
    }

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "DELETE_ITEM") {
    const updatedItems = state.items.filter(
      (item) => item.id !== action.payload,
    );

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
};

export const CartProvider = ({ children }) => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCart,
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(shoppingCartState.items));
  }, [shoppingCartState.items]);

  const handleAddItemToCart = (id, quantity = 1, color) => {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
      quantity,
      color,
    });
  };

  const handleUpdateCartItemQuantity = (productId, amount) => {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  };

  const handleDeleteItem = (id) => {
    shoppingCartDispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };

  const handleClearCart = () => {
    shoppingCartDispatch({
      type: "CLEAR_CART",
    });
  };

  const ctxValue = {
    items: shoppingCartState.items,
    addToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    deleteItem: handleDeleteItem,
    clearCart: handleClearCart,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
