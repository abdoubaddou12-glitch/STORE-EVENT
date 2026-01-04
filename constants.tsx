
import { CategoryType, Product } from './types';

export const CURRENCY = 'د.م.';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'هاتف ذكي ألترا',
    description: 'أحدث التقنيات مع كاميرا بدقة 200 ميجابكسل وشاشة أموليد.',
    price: 8500,
    category: CategoryType.ELECTRONICS,
    image: 'https://picsum.photos/seed/phone/400/400'
  },
  {
    id: '2',
    name: 'خلاط منزلي بقوة 1000 واط',
    description: 'خلاط عالي الأداء لجميع أنواع الفواكه والخضروات.',
    price: 450,
    category: CategoryType.HOME,
    image: 'https://picsum.photos/seed/blender/400/400'
  },
  {
    id: '3',
    name: 'سيارة دفع رباعي عائلية',
    description: 'سيارة واسعة ومريحة لجميع أفراد الأسرة مع استهلاك اقتصادي للوقود.',
    price: 280000,
    category: CategoryType.CARS,
    image: 'https://picsum.photos/seed/car/400/400'
  },
  {
    id: '4',
    name: 'سماعات لاسلكية برو',
    description: 'عزل ضوضاء فائق وصوت نقي بجودة عالية.',
    price: 1200,
    category: CategoryType.ELECTRONICS,
    image: 'https://picsum.photos/seed/audio/400/400'
  }
];

export const CATEGORY_LABELS = {
  [CategoryType.ELECTRONICS]: 'إلكترونيات',
  [CategoryType.HOME]: 'منزل',
  [CategoryType.CARS]: 'سيارات'
};
