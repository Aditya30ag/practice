"use client";
import { useState,useEffect } from "react";
import {X} from 'lucide-react';
export default function OrderDialog ({ isOpen, onClose, onSave, orderToEdit }){
    const [formData, setFormData] = useState({
      id: '',
      customer_name: '',
      customer_email: '',
      product: '',
      quantity: 1,
      order_value: 0
    });
    useEffect(() => {
      if (orderToEdit) {
        setFormData(orderToEdit);
      } else {
        setFormData({
          id: `ORD-${Date.now()}`,
          customer_name: '',
          customer_email: '',
          product: '',
          quantity: 1,
          order_value: 0
        });
      }
    }, [orderToEdit]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'quantity' ? parseInt(value) || 0 : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {orderToEdit ? 'Edit Order' : 'Create New Order'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Order ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={orderToEdit}
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Customer Name</label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Customer Email</label>
              <input
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700">Product</label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700">Order Value ($)</label>
                <input
                  type="number"
                  name="order_value"
                  value={formData.order_value}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
            >
              {orderToEdit ? 'Save Changes' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  };