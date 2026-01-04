
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageCheck, Loader2 } from 'lucide-react';
import { Product, Order, TrackingSettings } from '../types';
import { CURRENCY } from '../constants';

interface CheckoutPageProps {
  cart: { productId: string; quantity: number }[];
  products: Product[];
  onOrderComplete: (order: Order) => void;
  tracking: TrackingSettings;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, products, onOrderComplete, tracking }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    city: '',
    phone: ''
  });

  const cartItems = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...p, quantity: item.quantity };
  }).filter(item => item.id);

  const total = cartItems.reduce((acc, curr) => acc + (curr.price! * curr.quantity), 0);

  // Inject tracking pixels (simulated via console or script injection)
  useEffect(() => {
    if (tracking.facebookPixelId) {
      console.log(`Facebook Pixel: Initiated Checkout - ID: ${tracking.facebookPixelId}`);
    }
  }, [tracking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.city || !form.phone) return alert('يرجى ملء جميع الحقول');

    setLoading(true);

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: form.name,
      city: form.city,
      phone: form.phone,
      items: cartItems.map(item => ({
        productId: item.id!,
        name: item.name!,
        quantity: item.quantity,
        priceAtPurchase: item.price!
      })),
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Simulate sending to Google Sheets via Webhook
    if (tracking.googleSheetsWebhook) {
      try {
        await fetch(tracking.googleSheetsWebhook, {
          method: 'POST',
          body: JSON.stringify(newOrder),
          mode: 'no-cors'
        });
      } catch (err) {
        console.error('Webhook error:', err);
      }
    }

    // Delay for dramatic effect
    setTimeout(() => {
      onOrderComplete(newOrder);
      setLoading(false);
      alert('تم استلام طلبكم بنجاح! سنتصل بكم قريباً لتأكيد الطلب.');
      navigate('/');
    }, 1500);
  };

  if (cart.length === 0) return <div className="p-12 text-center">السلة فارغة</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">إتمام الطلب</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">معلومات الشحن</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="أدخل اسمك الكامل"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="أدخل مدينتك"
                value={form.city}
                onChange={e => setForm({...form, city: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              <input 
                type="tel" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="مثال: 06XXXXXXXX"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-8 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <PackageCheck size={24} />}
              تأكيد الطلب
            </button>
          </form>
        </div>

        <div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-300">
            <h2 className="text-xl font-bold mb-6">ملخص السلة</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                  <span className="font-bold">{(item.price! * item.quantity).toLocaleString()} {CURRENCY}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6 flex justify-between text-2xl font-bold text-blue-600">
              <span>الإجمالي</span>
              <span>{total.toLocaleString()} {CURRENCY}</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">الدفع عند الاستلام متاح في جميع المدن المغربية.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
