
import { CategoryType } from './types';

export const APP_NAME = "مركز تحميل الصور";

// Added missing CURRENCY constant
export const CURRENCY = "د.م.";

// Added missing CATEGORY_LABELS constant mapping
export const CATEGORY_LABELS: Record<CategoryType, string> = {
  [CategoryType.ELECTRONICS]: "إلكترونيات",
  [CategoryType.FASHION]: "أزياء",
  [CategoryType.HOME]: "منزل ومطبخ",
  [CategoryType.BEAUTY]: "جمال وعناية"
};
