import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit, FaTrashAlt, FaBell } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/inventory');
    const fetchedProducts = response.data;
    setProducts(fetchedProducts);

    const lowInventoryProducts = fetchedProducts.filter(p => p.quantity < p.minQuantity);
    
    if (lowInventoryProducts.length > 0) {
      setShowAlert(true);
      setAlertMessage(`Warning: Low inventory! The following products have less quantity: ${lowInventoryProducts.map(p => p.name).join(', ')}`);

      const audio = new Audio('/tap-notification.mp3'); 
      audio.play().catch(error => console.error('Error playing sound:', error));
    } else {
      setShowAlert(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async () => {
    await axios.put(`http://localhost:8080/api/inventory/update/${editingProduct.id}`, editingProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/inventory/delete/${id}`);
    fetchProducts();
  };

  return (
    <div className="products-page">
      <div className="crud-container">
        <h2>Products Management</h2>

        {showAlert && (
          <div className="alert">
              <div class="alert alert-danger" role="alert">
                <FaBell /> {alertMessage}
                <button onClick={() => setShowAlert(false)} className='close-button'><AiOutlineClose style={{fontSize: 30}}/>
                </button>
              </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Available Quantity</th>
              <th>Minimum Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.quantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.minQuantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, minQuantity: e.target.value })}
                    />
                  ) : (
                    product.minQuantity
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="action-buttons">
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <button onClick={handleSaveProduct} className='save-button'>Save</button>
                      <button onClick={() => setEditingProduct(null)} className='delete-button'>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditProduct(product)} className="edit-button">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
                        <FaTrashAlt /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
