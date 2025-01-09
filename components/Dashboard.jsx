"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Plus, Search, ChevronDown, ChevronUp, DollarSign, Package, Users, TrendingUp, Loader2 } from 'lucide-react';
import Navbar from './Navbar';
import OrderDialog from './OrderDialog';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-sm text-emerald-600 flex items-center gap-1 mt-2">
            <TrendingUp size={16} className="animate-pulse" />
            {trend}
          </p>
        )}
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl">
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
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 50;
  const publicPath = process.env.NEXT_PUBLIC_PUBLIC_PATH || '';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${publicPath}/data/data.json`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setAllOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setAllOrders([]);
      } finally {
        setIsLoading(false);
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
      setAllOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderData.id ? orderData : order
        )
      );
    } else {
      setAllOrders(prevOrders => [...prevOrders, orderData]);
    }
    setOrderToEdit(null);
  };

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
        return sortDirection === 'asc' 
          ? (typeof aValue === 'number' ? aValue - bValue : aValue.localeCompare(bValue))
          : (typeof bValue === 'number' ? bValue - aValue : bValue.localeCompare(aValue));
      });
  }, [allOrders, searchTerm, sortField, sortDirection]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Order Value" 
            value={stats.totalValue}
            icon={DollarSign}
            trend="+12.5% from last month"
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50 backdrop-blur-sm"
            />
          </div>
          
          <button 
            onClick={() => {
              setOrderToEdit(null);
              setIsDialogOpen(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            New Order
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
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
                    className="hover:bg-blue-50/50 cursor-pointer transition-all duration-200"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.customer_email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      ${order.order_value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * ordersPerPage) + 1} to {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              Next
            </button>
          </div>
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
  );
}