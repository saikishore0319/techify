import { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = import.meta.env.VITE_BACKEND_URL + "/api/product";

  // Fetch inventory
  useEffect(() => {
    axios
      .get(url + "/inventory", { headers: { token } })
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching inventory:", err);
        setLoading(false);
      });
  }, []);

  // Update stock +1 / -1
  const updateStock = (id, newStock) => {
    axios
      .post(
        url + "/inventory/update",
        { productId: id, stock: newStock },
        { headers: { token } }
      )
      .then(() => {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, stock: newStock } : p
          )
        );
      })
      .catch((err) => console.error("Error updating stock:", err));
  };

  if (loading) return <p className="p-6">Loading inventory...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📦 Inventory Management</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{p.name}</td>
              <td className="border border-gray-300 p-2">{p.category}</td>
              <td className="border border-gray-300 p-2">₹{p.price}</td>
              <td className="border border-gray-300 p-2">{p.stock}</td>
              <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => updateStock(p._id, p.stock + 1)}
                >
                  +1
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() =>
                    updateStock(p._id, Math.max(p.stock - 1, 0))
                  }
                >
                  –1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
