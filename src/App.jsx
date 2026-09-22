import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import productsData from "./data/products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";

function App() {
  const [products] = useState(productsData);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find((item) => item.id === product.id);
      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item
        );
      }
      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart((previousCart) => previousCart.filter((item) => item.id !== productId));
      return;
    }
    setCart((previousCart) =>
      previousCart.map((item) => item.id === productId ? { ...item, quantity: Math.min(newQuantity, item.stock) } : item)
    );
  };

  const removeFromCart = (productId) => setCart((previousCart) => previousCart.filter((item) => item.id !== productId));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar cartCount={cartCount} />
        <main>
          <Routes>
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;