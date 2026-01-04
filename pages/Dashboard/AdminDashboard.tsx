
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, Radio, Globe, BarChart3, Plus, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Product, Order, TrackingSettings, DomainSettings, CategoryType } from '../../types';
import { CURRENCY, CATEGORY_LABELS } from '../../constants';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  tracking: TrackingSettings;
  setTracking: React.Dispatch<React.SetStateAction<TrackingSettings>>;
  domain: DomainSettings;
  setDomain: React.Dispatch<React.SetStateAction<DomainSettings>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const location = useLocation();

  const sidebarLinks = [
    { name: 'المنتجات', path: '/dashboard', icon: Package },
    { name: 'الطلبات', path: '/dashboard/orders', icon: ShoppingBag },
    { name: 'أكواد التتبع', path: '/dashboard/tracking', icon: Radio },
    { name: 'الإعدادات والدومين', path: '/dashboard/settings', icon: Globe },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Dashboard Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="text-blue-600" />
            لوحة الإدارة
          </h2>
        </div>
        <nav className="mt-4">
          {sidebarLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-6 py-4 border-r-4 transition ${
                location.pathname === link.path 
                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-grow p-8">
        <Routes>
          <Route path="/" element={<ProductsManager {...props} />} />
          <Route path="/orders" element={<OrdersManager {...props} />} />
          <Route path="/tracking" element={<TrackingManager {...props} />} />
          <Route path="/settings" element={<SettingsManager {...props} />} />
        </Routes>
      </main>
    </div>
  );
};

const ProductsManager: React.FC<AdminDashboardProps> = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: CategoryType.ELECTRONICS,
    description: ''
  });

  const addProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) return;
    const p: Product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9),
      image: `https://picsum.photos/seed/${newProduct.name}/400/400`
    };
    setProducts(prev => [p, ...prev]);
    setNewProduct({ name: '', price: 0, category: CategoryType.ELECTRONICS, description: '' });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4">إضافة منتج جديد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="اسم المنتج"
            value={newProduct.name}
            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
          />
          <input 
            type="number"
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="السعر (د.م.)"
            value={newProduct.price || ''}
            onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
          />
          <select 
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={newProduct.category}
            onChange={e => setNewProduct({...newProduct, category: e.target.value as CategoryType})}
          >
            {Object.values(CategoryType).map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>
          <textarea 
            className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            placeholder="وصف المنتج"
            value={newProduct.description}
            onChange={e => setNewProduct({...newProduct, description: e.target.value})}
          />
          <button 
            onClick={addProduct}
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={20} /> إضافة للمتجر
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-bold">المنتج</th>
              <th className="px-6 py-4 font-bold">الفئة</th>
              <th className="px-6 py-4 font-bold">السعر</th>
              <th className="px-6 py-4 font-bold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={product.image} className="w-10 h-10 rounded object-cover" />
                  <span>{product.name}</span>
                </td>
                <td className="px-6 py-4">{CATEGORY_LABELS[product.category]}</td>
                <td className="px-6 py-4">{product.price.toLocaleString()} {CURRENCY}</td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrdersManager: React.FC<AdminDashboardProps> = ({ orders, setOrders }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-xl shadow-sm border border-gray-100">
          لا يوجد أي طلبات حالياً.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">طلب #{order.id}</h3>
                  <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString('ar-MA')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${
                    order.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {order.status === 'pending' ? <Clock size={14} /> : <CheckCircle size={14} />}
                    {order.status === 'pending' ? 'قيد المراجعة' : 'مكتمل'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-bold mb-2">معلومات العميل</h4>
                  <p className="text-sm font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.city}</p>
                  <p className="text-sm text-gray-600">{order.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="text-sm font-bold mb-2">المنتجات</h4>
                  <ul className="text-sm space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="font-bold">{item.priceAtPurchase.toLocaleString()} {CURRENCY}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold text-blue-600">
                    <span>الإجمالي</span>
                    <span>{order.total.toLocaleString()} {CURRENCY}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TrackingManager: React.FC<AdminDashboardProps> = ({ tracking, setTracking }) => {
  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-2xl font-bold">إدارة أكواد التتبع (Pixels)</h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Facebook Pixel ID</label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={tracking.facebookPixelId}
            onChange={e => setTracking({...tracking, facebookPixelId: e.target.value})}
            placeholder="مثال: 123456789012345"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Google Analytics (Measurement ID)</label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={tracking.googleAnalyticsId}
            onChange={e => setTracking({...tracking, googleAnalyticsId: e.target.value})}
            placeholder="مثال: G-XXXXXXXXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">TikTok Pixel ID</label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={tracking.tiktokPixelId}
            onChange={e => setTracking({...tracking, tiktokPixelId: e.target.value})}
            placeholder="مثال: C6A1XXXXXXXX"
          />
        </div>
        <div className="pt-4 border-t">
          <label className="block text-sm font-bold mb-2">Google Sheets Webhook (URL)</label>
          <p className="text-xs text-gray-500 mb-2">اربط طلباتك بـ Google Sheets عبر تطبيقات مثل Zapier أو Make.</p>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={tracking.googleSheetsWebhook}
            onChange={e => setTracking({...tracking, googleSheetsWebhook: e.target.value})}
            placeholder="https://hooks.zapier.com/..."
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

const SettingsManager: React.FC<AdminDashboardProps> = ({ domain, setDomain }) => {
  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-2xl font-bold">إعدادات الدومين و Name Server</h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">اسم النطاق (Domain Name)</label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={domain.domain}
            onChange={e => setDomain({...domain, domain: e.target.value})}
            placeholder="example.com"
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Name Server 1</label>
            <input 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              value={domain.nameServer1}
              onChange={e => setDomain({...domain, nameServer1: e.target.value})}
              placeholder="ns1.example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Name Server 2</label>
            <input 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              value={domain.nameServer2}
              onChange={e => setDomain({...domain, nameServer2: e.target.value})}
              placeholder="ns2.example.com"
            />
          </div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
          ملاحظة: تأكد من تحديث إعدادات DNS لدى مزود النطاق الخاص بك لتوجيه الموقع بشكل صحيح.
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
