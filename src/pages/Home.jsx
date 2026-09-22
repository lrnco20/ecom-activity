import { useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "../components/ProductCard";

function Home({ products, addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleProducts, setVisibleProducts] = useState(6);

  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const changeSearch = (event) => {
    setSearch(event.target.value);
    setVisibleProducts(6);
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
    setVisibleProducts(6);
  };

  return (
    <div className="container">
      <section className="hero">
        <p className="eyebrow">E-COMMERCE ACTIVITY</p>
        <h1>Simple products. Simple shopping.</h1>
        <p>Browse our collection and add your favorite products to your cart.</p>
      </section>

      <section className="shop-header">
        <div>
          <h2>Our Products</h2>
          <p>{filteredProducts.length} product(s) found</p>
        </div>
        <div className="filters">
          <input type="search" placeholder="Search products..." value={search} onChange={changeSearch} />
          <select value={category} onChange={changeCategory}>
            {categories.map((item) => <option key={item} value={item}>{item === "All" ? "All Categories" : item}</option>)}
          </select>
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <div className="empty-card"><h2>No products found.</h2><p>Try another search or category.</p></div>
      ) : (
        <>
          <div className="product-grid">
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
          {visibleProducts < filteredProducts.length && (
            <div className="view-more-container">
              <button className="main-button" onClick={() => setVisibleProducts((value) => value + 3)}>View More</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

Home.propTypes = { products: PropTypes.array.isRequired, addToCart: PropTypes.func.isRequired };
export default Home;