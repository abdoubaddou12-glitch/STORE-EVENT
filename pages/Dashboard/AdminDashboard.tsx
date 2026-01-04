
import React, { useState, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, Radio, Globe, BarChart3, Plus, Trash2, CheckCircle, Clock, Upload, Image as ImageIcon, Copy, Check } from 'lucide-react';
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
    { name: 'مركز رفع الصور', path: '/dashboard/uploader', icon: Upload },
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
      <main className="flex-grow p-4 md:p-8">
        <Routes>
          <Route path="/" element={<ProductsManager {...props} />} />
          <Route path="/orders" element={<OrdersManager {...props} />} />
          <Route path="/uploader" element={<ImageUploaderCenter />} />
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
    description: '',
    image: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.image) {
      alert('يرجى ملء جميع الحقول واختيار صورة للمنتج');
      return;
    }
    const p: Product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts(prev => [p, ...prev]);
    setNewProduct({ name: '', price: 0, category: CategoryType.ELECTRONICS, description: '', image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const deleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-6 text-lg">إضافة منتج جديد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input 
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="اسم المنتج"
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="number"
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="السعر (د.م.)"
                value={newProduct.price || ''}
                onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
              />
              <select 
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value as CategoryType})}
              >
                {Object.values(CategoryType).map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
              </select>
            </div>
            <textarea 
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="وصف المنتج"
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="block text-sm font-bold text-gray-700">صورة المنتج</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 h-full flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition min-h-[200px]"
            >
              {newProduct.image ? (
                <img src={newProduct.image} className="max-h-48 rounded-lg shadow-sm" alt="Preview" />
              ) : (
                <>
                  <ImageIcon size={48} className="text-gray-400 mb-2" />
                  <span className="text-gray-500">اضغط لرفع صورة المنتج</span>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          </div>

          <button 
            onClick={addProduct}
            className="md:col-span-2 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            <Plus size={20} /> إضافة المنتج للمتجر
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-right">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700">المنتج</th>
              <th className="px-6 py-4 font-bold text-gray-700">الفئة</th>
              <th className="px-6 py-4 font-bold text-gray-700">السعر</th>
              <th className="px-6 py-4 font-bold text-gray-700">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={product.image} className="w-12 h-12 rounded-lg object-cover shadow-sm border" />
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{CATEGORY_LABELS[product.category]}</span>
                </td>
                <td className="px-6 py-4 font-bold text-blue-600">{product.price.toLocaleString()} {CURRENCY}</td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
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

const ImageUploaderCenter: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<{id: string, url: string, name: string}[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Fix: Cast Array.from(files) to File[] to resolve 'unknown' type errors for 'file.name' and 'readAsDataURL(file)'
      (Array.from(files) as File[]).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages(prev => [
            { id: Math.random().toString(36).substr(2, 9), url: reader.result as string, name: file.name },
            ...prev
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">مركز رفع الصور</h2>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="bg-white border-2 border-dashed border-blue-200 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group"
      >
        <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:scale-110 transition">
          <Upload size={32} className="text-blue-600" />
        </div>
        <h3 className="text-lg font-bold">اختر الصور لرفعها</h3>
        <p className="text-gray-500 mt-2">يمكنك رفع عدة صور في آن واحد</p>
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept="image/*" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {uploadedImages.map(img => (
          <div key={img.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="aspect-square relative overflow-hidden">
              <img src={img.url} className="w-full h-full object-cover group-hover:scale-105 transition" alt={img.name} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button 
                  onClick={() => copyToClipboard(img.url, img.id)}
                  className="bg-white p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center gap-1 text-sm font-bold"
                >
                  {copiedId === img.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  نسخ الرابط
                </button>
                <button 
                  onClick={() => removeImage(img.id)}
                  className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 truncate">{img.name}</p>
            </div>
          </div>
        ))}
      </div>

      {uploadedImages.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          لم يتم رفع أي صور بعد.
        </div>
      )}
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
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <h4 className="font-bold mb-2">معلومات العميل</h4>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-gray-600">{order.city}</p>
                  <p className="text-gray-600">{order.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2 text-sm">
                  <h4 className="font-bold mb-2">المنتجات</h4>
                  <ul className="space-y-1">
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
