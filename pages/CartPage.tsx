
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { CURRENCY } from '../constants';

interface CartPageProps {
  cart: { productId: string; quantity: number }[];
  products: Product[];
  onRemove: (id: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, products, onRemove }) => {
  const cartItems = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...p, quantity: item.quantity };
  }).filter(item => item.id);

  const total = cartItems.reduce((acc, curr) => acc + (curr.price! * curr.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">سلة المشتريات فارغة</h2>
        <Link to="/" className="text-blue-600 hover:underline">ابدأ التسوق الآن</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">سلة المشتريات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border border-gray-100">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-grow">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-blue-600 font-bold mt-1">{item.price?.toLocaleString()} {CURRENCY}</p>
                <p className="text-gray-500 text-sm">الكمية: {item.quantity}</p>
              </div>
              <button 
                onClick={() => onRemove(item.id!)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>
          <div className="space-y-4 border-b pb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">المجموع الفرعي</span>
              <span>{total.toLocaleString()} {CURRENCY}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>التوصيل</span>
              <span>مجاني</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl py-6">
            <span>الإجمالي</span>
            <span>{total.toLocaleString()} {CURRENCY}</span>
          </div>
          <Link to="/checkout" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
            إتمام الطلب <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
