
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Home, ShoppingBag, Package, Settings, Phone, MapPin, User, ChevronLeft } from 'lucide-react';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import { Product, Order, TrackingSettings, DomainSettings } from './types';
import { INITIAL_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [tracking, setTracking] = useState<TrackingSettings>({
    facebookPixelId: '',
    googleAnalyticsId: '',
    tiktokPixelId: '',
    googleSheetsWebhook: ''
  });
  const [domain, setDomain] = useState<DomainSettings>({
    domain: '',
    nameServer1: '',
    nameServer2: ''
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('store_products');
    const savedOrders = localStorage.getItem('store_orders');
    const savedTracking = localStorage.getItem('store_tracking');
    const savedDomain = localStorage.getItem('store_domain');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else setProducts(INITIAL_PRODUCTS);

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedTracking) setTracking(JSON.parse(savedTracking));
    if (savedDomain) setDomain(JSON.parse(savedDomain));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('store_products', JSON.stringify(products));
    localStorage.setItem('store_orders', JSON.stringify(orders));
    localStorage.setItem('store_tracking', JSON.stringify(tracking));
    localStorage.setItem('store_domain', JSON.stringify(domain));
  }, [products, orders, tracking, domain]);

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-cairo">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-reverse space-x-8">
                <Link to="/" className="text-2xl font-bold text-blue-600">متجري</Link>
                <div className="hidden md:flex space-x-reverse space-x-4">
                  <Link to="/" className="text-gray-700 hover:text-blue-600">الرئيسية</Link>
                  <Link to="/category/electronics" className="text-gray-700 hover:text-blue-600">إلكترونيات</Link>
                  <Link to="/category/home" className="text-gray-700 hover:text-blue-600">المنزل</Link>
                  <Link to="/category/cars" className="text-gray-700 hover:text-blue-600">السيارات</Link>
                </div>
              </div>
              <div className="flex items-center space-x-reverse space-x-4">
                <Link to="/dashboard" className="p-2 text-gray-500 hover:text-blue-600" title="لوحة التحكم">
                  <LayoutDashboard size={24} />
                </Link>
                <Link to="/cart" className="relative p-2 text-gray-500 hover:text-blue-600">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:id" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailsPage products={products} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} products={products} onRemove={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} products={products} onOrderComplete={(order) => {
              setOrders(prev => [order, ...prev]);
              clearCart();
            }} tracking={tracking} />} />
            <Route path="/dashboard/*" element={
              <AdminDashboard 
                products={products} 
                setProducts={setProducts} 
                orders={orders} 
                setOrders={setOrders}
                tracking={tracking}
                setTracking={setTracking}
                domain={domain}
                setDomain={setDomain}
              />
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">متجري</h3>
              <p className="text-gray-400">وجهتكم الأولى للتسوق الإلكتروني في المغرب. جودة عالية وأسعار منافسة.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/category/electronics">إلكترونيات</Link></li>
                <li><Link to="/category/home">مستلزمات المنزل</Link></li>
                <li><Link to="/category/cars">السيارات</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2"><Phone size={18} /> +212 5XX-XXXXXX</p>
                <p className="flex items-center gap-2"><MapPin size={18} /> الدار البيضاء، المغرب</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2024 متجري. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
