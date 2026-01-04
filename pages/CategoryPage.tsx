
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, CategoryType } from '../types';
import { CURRENCY, CATEGORY_LABELS } from '../constants';

const CategoryPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const categoryProducts = products.filter(p => p.category === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">{CATEGORY_LABELS[id as CategoryType] || 'المنتجات'}</h1>
        <p className="text-gray-500 mt-2">استعرض أفضل العروض المتاحة في هذه الفئة.</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-bold">{product.price.toLocaleString()} {CURRENCY}</span>
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">عرض التفاصيل</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500">لا توجد منتجات حالياً في هذه الفئة.</p>
          <Link to="/" className="text-blue-600 mt-4 block">العودة للرئيسية</Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
