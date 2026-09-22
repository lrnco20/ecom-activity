import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Cart({ cart, updateQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container empty-card">
        <h1>Your Cart</h1><p>Your shopping cart is empty.</p>
        <Link to="/" className="main-button">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>₱{item.price.toLocaleString()} each</p>
              <p>Subtotal: <strong>₱{(item.price * item.quantity).toLocaleString()}</strong></p>
            </div>
            <div className="quantity">
              <button aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
          </article>
        ))}
      </div>
      <aside className="cart-summary">
        <p>Order Total</p><h2>₱{total.toLocaleString()}</h2>
        <Link to="/checkout" className="main-button">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}

Cart.propTypes = { cart: PropTypes.array.isRequired, updateQuantity: PropTypes.func.isRequired, removeFromCart: PropTypes.func.isRequired };
export default Cart;