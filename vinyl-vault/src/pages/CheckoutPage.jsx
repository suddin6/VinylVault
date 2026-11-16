import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shippingAddress: "",
    zipCode: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const taxes = subtotal * 0.6;
  const total = subtotal + taxes;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onClearCart();
  };

  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2>Order Placed Successfully</h2>
        <p>
          Thank you, {formData.fullName}, for your order! A confirmation email
          has been sent to {formData.email} and your package will be sent to{" "}
          {formData.shippingAddress} in 3-7 business days. Make sure to check
          your inbox and spam folders for a summary of the order. Feel free to
          contact us for any questions, comments, or concerns. Thank you again
          for shopping with us and we hope to see you again soon!
        </p>
        <Link className="btn btn-primary" to="/">
          Return to Home Page
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2>Your cart is empty.</h2>
        <Link className="btn btn-secondary" to="/">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout and Order Confirmation</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>

          <div className="form-group">
            <label htmlFor="fullName">
              Full Name<span className="required">*</span>:
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email<span className="required">*</span>:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="shippingAddress">
              Shipping Address<span className="required">*</span>:
            </label>
            <input
              type="text"
              name="shippingAddress"
              id="shippingAddress"
              required
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">
              Zip Code<span className="required">*</span>:
            </label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Complete Order $({total.toFixed(2)})
          </button>
        </form>

        <aside className="order-summary-card">
          <h3>Order Summary</h3>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-row">
                <span>
                  {item.name} &times; {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="divider" />
          <div className="summary-row">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (6%):</span> <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
