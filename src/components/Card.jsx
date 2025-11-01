// frontend/src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ✅ Backend Base URL
  const API_URL = "https://ecommarce-backend-mu.vercel.app/api/cart";

  // ========================
  // 1️⃣ FETCH CART ITEMS
  // ========================
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // 2️⃣ ADD ITEM TO CART
  // ========================
  const addToCart = async (product) => {
    try {
      await axios.post(
        `${API_URL}`,
        { productId: product._id, qty: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
    }
  };

  // ========================
  // 3️⃣ UPDATE ITEM QUANTITY
  // ========================
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return; // don’t allow 0 qty
    try {
      await axios.put(
        `${API_URL}/${productId}`,
        { productId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    }
  };

  // ========================
  // 4️⃣ REMOVE ITEM FROM CART
  // ========================
  const removeFromCart = async (productId) => {
    try {
      console.log("🗑️ Trying to remove product:", productId);
      await axios.delete(`https://ecommarce-backend-mu.vercel.app/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Product removed successfully!");
      fetchCart(); // refresh after delete
    } catch (err) {
      console.error("❌ Error removing item:", err);
    }
  };

  // ========================
  // 5️⃣ PLACE ORDER
  // ========================
  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "https://ecommarce-backend-mu.vercel.app/api/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Order placed successfully!");
      console.log("🧾 Order Details:", res.data);

      // Clear cart UI
      setCartItems([]);
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("❌ Failed to place order. Try again.");
    }
  };

  // ========================
  // 6️⃣ USE EFFECTS
  // ========================
  useEffect(() => {
    if (userId && token) fetchCart();
    else console.warn("⚠️ userId or token missing in localStorage!");
  }, [userId, token]);

  // ========================
  // 7️⃣ DEMO PRODUCTS
  // ========================
  useEffect(() => {
    setProducts([
      { _id: "1", name: "Headphones", price: 999, image: "https://placehold.co/80x80" },
      { _id: "2", name: "Smartwatch", price: 1499, image: "https://placehold.co/80x80" },
      { _id: "3", name: "Keyboard", price: 699, image: "https://placehold.co/80x80" },
    ]);
  }, []);

  // ========================
  // 8️⃣ RENDER UI
  // ========================
  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">🛒 Shopping Cart</h1>

      {/* PRODUCTS SECTION */}
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-3">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 flex items-center justify-between shadow-md bg-white"
            >
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-md" />
                <div>
                  <h3 className="font-medium text-gray-800">{p.name}</h3>
                  <p className="text-gray-500">₹{p.price}</p>
                </div>
              </div>
              <button
                onClick={() => addToCart(p)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CART SECTION */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-3">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white p-4 mb-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId?.image || "https://placehold.co/60x60"}
                    alt={item.productId?.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.productId?.name}</h3>
                    <p className="text-gray-500 text-sm">₹{item.productId?.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.qty - 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.qty + 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ Place Order Button */}
            <div className="text-center mt-6">
              <button
                onClick={placeOrder}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
