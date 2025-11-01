import React, { useEffect, useState } from "react";
import API from "../api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // 👈 must be saved during login

    if (!userId) {
      console.error("User ID not found in localStorage");
      setLoading(false);
      return;
    }

    API.get(`/orders/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2">
              Receipt: {order.receiptId}
            </h4>
            <p className="text-gray-600 mb-2">
              Total: ₹{order.total}
            </p>

            <ul className="text-gray-700 mb-2">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.qty} = ₹{item.subtotal}
                </li>
              ))}
            </ul>

            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
