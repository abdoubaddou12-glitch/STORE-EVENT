
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Trash2, ExternalLink, Download, Search, Image as ImageIcon, Upload } from 'lucide-react';
import { UploadedImage } from '../types';

interface GalleryPageProps {
  images: UploadedImage[];
  onDelete: (id: string) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ images, onDelete }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">معرض الصور الخاص بي</h1>
          <p className="text-slate-500 mt-2">لديك {images.length} صورة مرفوعة حالياً</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="ابحث في صورك..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredImages.map(img => (
            <div key={img.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group flex flex-col h-full">
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                <img src={img.url} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={img.name} />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
                  <a 
                    href={img.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white p-2.5 rounded-full text-slate-700 hover:bg-blue-600 hover:text-white transition shadow-lg"
                    title="فتح في علامة تبويب جديدة"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <button 
                    onClick={() => copyToClipboard(img.url, img.id)}
                    className="bg-white p-2.5 rounded-full text-slate-700 hover:bg-blue-600 hover:text-white transition shadow-lg"
                    title="نسخ الرابط"
                  >
                    {copiedId === img.id ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                  </button>
                  <button 
                    onClick={() => onDelete(img.id)}
                    className="bg-white p-2.5 rounded-full text-red-500 hover:bg-red-600 hover:text-white transition shadow-lg"
                    title="حذف الصورة"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-800 truncate mb-1" title={img.name}>{img.name}</h3>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-slate-400 font-medium">{img.size}</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(img.createdAt).toLocaleDateString('ar-MA')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
            <ImageIcon size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">لا توجد صور لعرضها</h2>
          <p className="text-slate-400 mb-8 max-w-sm mx-auto">
            {searchTerm ? 'لم نجد أي صورة تطابق بحثك.' : 'ابدأ برفع أول صورة لك الآن وشاركها مع أصدقائك.'}
          </p>
          <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 inline-flex items-center gap-2">
            <Upload size={20} /> ارفع الآن
          </Link>
        </div>
      )}

      {/* Adsterra Bottom Banner Area */}
      <div className="mt-16">
        <div className="ad-container shadow-sm">
           {/* ضع كود Adsterra Native أو Banner هنا */}
           <p className="text-slate-400 text-xs">إعلان Adsterra (Bottom Area)</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
