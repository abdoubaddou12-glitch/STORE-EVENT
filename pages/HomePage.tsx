
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Shield, Zap, Share2, Loader2, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from '../types';

interface HomePageProps {
  onUpload: (images: UploadedImage[]) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const processFiles = (files: FileList) => {
    setIsUploading(true);
    const newImages: UploadedImage[] = [];
    let processedCount = 0;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        processedCount++;
        if (processedCount === files.length) finalize();
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img: UploadedImage = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: reader.result as string,
          size: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type,
          createdAt: new Date().toISOString()
        };
        newImages.push(img);
        processedCount++;
        if (processedCount === files.length) {
            if (newImages.length > 0) {
              onUpload(newImages);
              setTimeout(() => {
                setIsUploading(false);
                navigate('/gallery');
              }, 800);
            } else {
              setIsUploading(false);
              alert('يرجى اختيار ملفات صور صالحة');
            }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const finalize = () => {};

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="pb-12">
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            ارفع صورك <span className="text-blue-600">بسهولة</span> وشاركها في ثوانٍ
          </h1>
          
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative bg-white border-4 border-dashed rounded-3xl p-12 md:p-20 
              transition-all duration-300 cursor-pointer group shadow-2xl shadow-blue-100/50
              ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-200 hover:border-blue-400'}
            `}
          >
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={(e) => e.target.files && processFiles(e.target.files)} 
              className="hidden" 
            />

            <div className="flex flex-col items-center">
              {isUploading ? (
                <div className="flex flex-col items-center animate-pulse">
                  <Loader2 size={64} className="text-blue-600 animate-spin mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800">جاري الرفع...</h3>
                </div>
              ) : (
                <>
                  <div className="bg-blue-100 p-6 rounded-full text-blue-600 mb-6 group-hover:scale-110 transition duration-500">
                    <Upload size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">اسحب الصور هنا أو اضغط للاختيار</h3>
                  <p className="text-slate-400">يدعم JPG, PNG, WEBP حتى 10 ميجابايت</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <Zap size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">سرعة فائقة</h4>
            <p className="text-slate-500">نستخدم أحدث التقنيات لضمان رفع وعرض الصور بأقصى سرعة ممكنة.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">أمان تام</h4>
            <p className="text-slate-500">صورك محفوظة بشكل خاص ولا يتم مشاركتها إلا من خلال الرابط.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
              <Share2 size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">سهولة المشاركة</h4>
            <p className="text-slate-500">احصل على روابط مباشرة لصورك لسهولة دمجها في المواقع والمنتديات.</p>
          </div>
        </div>
      </section>

      {/* Adsterra Bottom Banner Area */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="ad-container shadow-sm">
           {/* ضع كود Adsterra Banner 728x90 هنا */}
           <p className="text-slate-400 text-xs">إعلان Adsterra (Bottom Banner)</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
