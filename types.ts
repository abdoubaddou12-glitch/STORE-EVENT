
export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  createdAt: string;
}

// Added missing CategoryType enum
export enum CategoryType {
  ELECTRONICS = 'electronics',
  FASHION = 'fashion',
  HOME = 'home',
  BEAUTY = 'beauty'
}

// Added missing Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryType;
  description: string;
  image: string;
}

// Added missing Order interface
export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    priceAtPurchase: number;
  }[];
  total: number;
  status: 'pending' | 'completed';
  createdAt: string;
}

// Added missing TrackingSettings interface
export interface TrackingSettings {
  facebookPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
  googleSheetsWebhook: string;
}

// Added missing DomainSettings interface
export interface DomainSettings {
  domain: string;
  nameServer1: string;
  nameServer2: string;
}
