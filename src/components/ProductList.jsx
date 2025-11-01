import React, { useEffect, useState } from "react";
import API from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", { productId, qty: 1 });
      alert("✅ Added to cart");
    } catch {
      alert("❌ Please login first");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            src={p.image}
            alt={p.name}
            className="h-40 w-full object-cover rounded-lg mb-3"
          />
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-gray-700 mb-2">₹{p.price}</p>
          <button
            onClick={() => addToCart(p._id)}
            className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
