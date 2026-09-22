import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "", paymentMethod: "Cash on Delivery" });
  const [errors, setErrors] = useState({});
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (form.fullName.trim().length < 3) newErrors.fullName = "Please enter your complete name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address.";
    if (!/^09\d{9}$/.test(form.phone)) newErrors.phone = "Enter an 11-digit Philippine mobile number starting with 09.";
    if (form.address.trim().length < 10) newErrors.address = "Please enter your complete delivery address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm() || cart.length === 0) return;
    const order = { customer: form, items: cart, total };
    clearCart();
    navigate("/order-success", { state: { order } });
  };

  if (cart.length === 0) {
    return <div className="container empty-card"><h1>Checkout</h1><p>Your cart is empty. Add a product before checking out.</p><Link to="/" className="main-button">Shop Now</Link></div>;
  }

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Delivery Information</h2>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required minLength="3" placeholder="Enter your full name" />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="name@example.com" />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required maxLength="11" pattern="09[0-9]{9}" placeholder="09XXXXXXXXX" />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label htmlFor="address">Delivery Address</label>
          <textarea id="address" name="address" value={form.address} onChange={handleChange} required minLength="10" placeholder="Enter your complete delivery address" />
          {errors.address && <p className="error">{errors.address}</p>}

          <label htmlFor="paymentMethod">Payment Method</label>
          <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            <option>Cash on Delivery</option>
          </select>

          <button type="submit" className="main-button full-width">Place Order</button>
        </form>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <span>₱{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row total-row"><strong>Total</strong><strong>₱{total.toLocaleString()}</strong></div>
          <p className="small-note">Payment: Cash on Delivery</p>
        </aside>
      </div>
    </div>
  );
}

Checkout.propTypes = { cart: PropTypes.array.isRequired, clearCart: PropTypes.func.isRequired };
export default Checkout;