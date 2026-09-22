import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-card-content">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="price-row">
          <strong>₱{product.price.toLocaleString()}</strong>
          <span>{product.stock} in stock</span>
        </div>
        <div className="product-buttons">
          <Link to={`/product/${product.id}`} className="secondary-button">View Details</Link>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};
export default ProductCard;