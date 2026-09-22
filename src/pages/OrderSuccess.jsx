import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="container success-card">
      <div className="success-icon">✓</div>
      <h1>Order Placed Successfully!</h1>
      {order ? (
        <>
          <p>Thank you, <strong>{order.customer.fullName}</strong>. Your order has been received.</p>
          <h2>Total: ₱{order.total.toLocaleString()}</h2>
          <p>Payment Method: {order.customer.paymentMethod}</p>
        </>
      ) : <p>Your checkout has been completed.</p>}
      <Link to="/" className="main-button">Continue Shopping</Link>
    </div>
  );
}
export default OrderSuccess;