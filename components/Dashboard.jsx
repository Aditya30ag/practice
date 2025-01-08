"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Plus, Search, ChevronDown, ChevronUp, DollarSign, Package, Users, TrendingUp } from 'lucide-react';
import Navbar from './Navbar';
import OrderDialog from './OrderDialog';

// Dialog component for adding/editing orders
// const OrderDialog = ({ isOpen, onClose, onSave, orderToEdit }) => {
//   const [formData, setFormData] = useState({
//     id: '',
//     customer_name: '',
//     customer_email: '',
//     product: '',
//     quantity: 1,
//     order_value: 0
//   });

//   useEffect(() => {
//     if (orderToEdit) {
//       setFormData(orderToEdit);
//     } else {
//       setFormData({
//         id: `ORD-${Date.now()}`,
//         customer_name: '',
//         customer_email: '',
//         product: '',
//         quantity: 1,
//         order_value: 0
//       });
//     }
//   }, [orderToEdit]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'quantity' ? parseInt(value) || 0 : value
//     }));
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl transform transition-all">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {orderToEdit ? 'Edit Order' : 'Create New Order'}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <X size={24} />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-6">
//             <div>
//               <label className="text-sm font-semibold text-gray-700">Order ID</label>
//               <input
//                 type="text"
//                 name="id"
//                 value={formData.id}
//                 onChange={handleChange}
//                 className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                 disabled={orderToEdit}
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="text-sm font-semibold text-gray-700">Customer Name</label>
//               <input
//                 type="text"
//                 name="customer_name"
//                 value={formData.customer_name}
//                 onChange={handleChange}
//                 className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="text-sm font-semibold text-gray-700">Customer Email</label>
//               <input
//                 type="email"
//                 name="customer_email"
//                 value={formData.customer_email}
//                 onChange={handleChange}
//                 className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="text-sm font-semibold text-gray-700">Product</label>
//               <input
//                 type="text"
//                 name="product"
//                 value={formData.product}
//                 onChange={handleChange}
//                 className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-semibold text-gray-700">Quantity</label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   min="1"
//                   className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="text-sm font-semibold text-gray-700">Order Value ($)</label>
//                 <input
//                   type="number"
//                   name="order_value"
//                   value={formData.order_value}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.01"
//                   className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-4 mt-8">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
//             >
//               {orderToEdit ? 'Save Changes' : 'Create Order'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp size={16} />
            {trend}
          </p>
        )}
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon size={24} className="text-blue-600" />
      </div>
    </div>
  </div>
);
export default function Dashboard({ user }) {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allOrders, setAllOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const ordersPerPage = 50;
  const publicPath = process.env.NEXT_PUBLIC_PUBLIC_PATH || '';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${publicPath}/data/data.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setAllOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setAllOrders([]);
      }
    };

    fetchOrders();
  }, [publicPath]);

  const handleOrderClick = (order) => {
    setOrderToEdit(order);
    setIsDialogOpen(true);
  };

  const handleSaveOrder = (orderData) => {
    if (orderToEdit) {
      // Update existing order
      setAllOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderData.id ? orderData : order
        )
      );
    } else {
      // Add new order
      setAllOrders(prevOrders => [...prevOrders, orderData]);
    }
    setOrderToEdit(null);
  };

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    return allOrders
      .filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  }, [allOrders, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleSort = (field) => {
    const fieldMapping = {
      'orderid': 'id',
      'customername': 'customer_name',
      'customeremail': 'customer_email',
      'product': 'product',
      'quantity': 'quantity',
      'ordervalue': 'order_value'
    };

    const mappedField = fieldMapping[field.toLowerCase()] || field;
    
    if (mappedField === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(mappedField);
      setSortDirection('asc');
    }
  };
  const stats = useMemo(() => {
    const totalValue = allOrders.reduce((sum, order) => sum + order.order_value, 0);
    const totalOrders = allOrders.length;
    const uniqueCustomers = new Set(allOrders.map(order => order.customer_email)).size;
    const avgOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;

    return {
      totalValue: totalValue.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }),
      totalOrders,
      uniqueCustomers,
      avgOrderValue: avgOrderValue.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    };
  }, [allOrders]);
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar user={user}/>

    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Order Value" 
            value={stats.totalValue}
            icon={DollarSign}
          />
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders}
            icon={Package}
          />
          <StatCard 
            title="Unique Customers" 
            value={stats.uniqueCustomers}
            icon={Users}
          />
          <StatCard 
            title="Average Order Value" 
            value={stats.avgOrderValue}
            icon={TrendingUp}
          />
        </div>
      <div className="flex justify-between items-center mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
        
        <button 
          onClick={() => {
            setOrderToEdit(null);
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          New Order
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {['Order ID', 'Customer Name', 'Customer Email', 'Product', 'Quantity', 'Order Value'].map((header, index) => {
                const field = header.toLowerCase().replace(' ', '');
                return (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center gap-2">
                      {header}
                      {sortField === field && (
                        <span className="text-blue-600">
                          {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr 
                key={order.id} 
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                onClick={() => handleOrderClick(order)}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.customer_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.customer_email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">${order.order_value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {((currentPage - 1) * ordersPerPage) + 1} to {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <OrderDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setOrderToEdit(null);
        }}
        onSave={handleSaveOrder}
        orderToEdit={orderToEdit}
      />
    </div>
  </div>
  );
}