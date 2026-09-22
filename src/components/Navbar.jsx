import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">VSNRY</NavLink>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart <span className="cart-badge">{cartCount}</span></NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </div>
    </nav>
  );
}

Navbar.propTypes = { cartCount: PropTypes.number.isRequired };
export default Navbar;