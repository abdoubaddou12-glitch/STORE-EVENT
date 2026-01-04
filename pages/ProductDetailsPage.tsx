
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { CURRENCY, CATEGORY_LABELS } from '../constants';

const ProductDetailsPage: React.FC<{ products: Product[]; onAddToCart: (id: string) => void }> = ({ products, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  
  const product = products.find(p => p.id === id);

  if (!product) return <div className="p-12 text-center">المنتج غير موجود</div>;

  const handleAddToCart = () => {
    onAddToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8">
        <ArrowRight size={20} className="rotate-180" />
        <span>العودة</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="rounded-xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
        </div>

        <div className="flex flex-col">
          <span className="text-blue-600 font-bold uppercase text-sm">{CATEGORY_LABELS[product.category]}</span>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          <div className="mt-4 text-2xl font-bold text-blue-600">
            {product.price.toLocaleString()} {CURRENCY}
          </div>
          
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-2">الوصف:</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-auto pt-8 flex gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                added ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {added ? (
                <><Check size={20} /> تم الإضافة</>
              ) : (
                <><ShoppingCart size={20} /> إضافة إلى السلة</>
              )}
            </button>
            <button 
              onClick={() => {
                onAddToCart(product.id);
                navigate('/checkout');
              }}
              className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition"
            >
              شراء الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
