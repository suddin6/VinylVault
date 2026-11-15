import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ cartCount, onOpenCart }) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          🎵 Vinyl Vault
        </Link>
        <nav className="nav-actions">
          <Link to="/" className="nav-link">
            Catalog
          </Link>

          <button
            type="button"
            className="btn-cart-badge"
            onClick={onOpenCart}
            aria-label={`Shipping Cart has ${cartCount} items`}
          >
            🛒Cart
            {cartCount > 0 && <span className="badge-pill">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
