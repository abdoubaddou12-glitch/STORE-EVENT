
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Upload, Image as ImageIcon, Trash2, Copy, Check, Home, Layout, Info, Github } from 'lucide-react';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import { UploadedImage } from './types';

const App: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Load images from local storage
  useEffect(() => {
    const saved = localStorage.getItem('hosted_images');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse images", e);
      }
    }
  }, []);

  // Save images to local storage
  useEffect(() => {
    localStorage.setItem('hosted_images', JSON.stringify(images));
  }, [images]);

  const handleAddImages = (newImages: UploadedImage[]) => {
    setImages(prev => [...newImages, ...prev]);
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      setImages(prev => prev.filter(img => img.id !== id));
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] font-cairo text-slate-800">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                  <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                    <ImageIcon size={24} />
                  </div>
                  <span>مركز الصور</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition flex items-center gap-1.5">
                    <Home size={18} /> الرئيسية
                  </Link>
                  <Link to="/gallery" className="text-slate-600 hover:text-blue-600 font-medium transition flex items-center gap-1.5">
                    <Layout size={18} /> معرضي ({images.length})
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link 
                  to="/" 
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200"
                >
                  <Upload size={18} /> ارفع الآن
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onUpload={handleAddImages} />} />
            <Route path="/gallery" element={<GalleryPage images={images} onDelete={handleDeleteImage} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-10 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 mb-6">
              <Link to="/" className="text-slate-400 hover:text-blue-600 transition">الرئيسية</Link>
              <Link to="/gallery" className="text-slate-400 hover:text-blue-600 transition">المعرض</Link>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition">سياسة الخصوصية</a>
            </div>
            <p className="text-slate-400 text-sm">© 2024 مركز تحميل الصور. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
