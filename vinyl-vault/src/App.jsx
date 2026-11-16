import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ALBUMS } from "./data/albums";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (album, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === album.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...album, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (albumId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === albumId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const handleRemoveFromCart = (albumId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== albumId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app-container">
      <NavBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      ></NavBar>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage albums={ALBUMS} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/album/:albumId"
            element={
              <AlbumDetailPage albums={ALBUMS} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} onClearCart={handleClearCart} />}
          />
        </Routes>
      </main>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;
