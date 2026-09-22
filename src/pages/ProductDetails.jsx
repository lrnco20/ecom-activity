import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <div className="container empty-card"><h1>Product not found</h1><Link className="main-button" to="/">Return Home</Link></div>;
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← Back to products</Link>
      <section className="product-details">
        <img src={product.image} alt={product.name} />
        <div className="details-content">
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="details-description">{product.description}</p>
          <h2>₱{product.price.toLocaleString()}</h2>
          <p><strong>Stock availability:</strong> {product.stock} item(s)</p>
          <button className="main-button" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </section>
    </div>
  );
}

ProductDetails.propTypes = { products: PropTypes.array.isRequired, addToCart: PropTypes.func.isRequired };
export default ProductDetails;