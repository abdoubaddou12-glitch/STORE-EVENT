
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, CategoryType } from '../types';
import { CURRENCY, CATEGORY_LABELS } from '../constants';

const HomePage: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">تسوق بذكاء، عش براحة</h1>
          <p className="text-xl mb-8 max-w-2xl">اكتشف أحدث الإلكترونيات، مستلزمات المنزل، وأفضل عروض السيارات في مكان واحد.</p>
          <div className="flex gap-4">
            <Link to="/category/electronics" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">تسوق الآن</Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500 transform skew-x-12 translate-x-1/2 opacity-50"></div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">تصفح حسب الفئة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(CategoryType).map(cat => (
              <Link 
                key={cat} 
                to={`/category/${cat}`}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg"
              >
                <img src={`https://picsum.photos/seed/${cat}/800/600`} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{CATEGORY_LABELS[cat]}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">أحدث المنتجات</h2>
            <Link to="/category/electronics" className="text-blue-600 flex items-center gap-1">عرض الكل</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">{CATEGORY_LABELS[product.category]}</span>
                  <h3 className="font-bold text-lg mt-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">{product.price.toLocaleString()} {CURRENCY}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
