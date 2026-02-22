import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [vendorId, setVendorId] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedVendorId = localStorage.getItem('cartVendorId');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedVendorId) {
      setVendorId(savedVendorId);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    if (vendorId) {
      localStorage.setItem('cartVendorId', vendorId);
    } else {
      localStorage.removeItem('cartVendorId');
    }
  }, [cartItems, vendorId]);

  const addToCart = (menuItem, quantity = 1) => {
    // Check if adding from different vendor
    if (vendorId && vendorId !== menuItem.vendorId) {
      const confirmSwitch = window.confirm(
        'Your cart contains items from another restaurant. Would you like to clear it and start a new order?'
      );
      if (!confirmSwitch) {
        return false;
      }
      clearCart();
    }

    setVendorId(menuItem.vendorId);

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === menuItem.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { ...menuItem, quantity }];
    });

    return true;
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      if (newItems.length === 0) {
        setVendorId(null);
      }
      return newItems;
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setVendorId(null);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    vendorId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
