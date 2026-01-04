
export enum CategoryType {
  ELECTRONICS = 'electronics',
  HOME = 'home',
  CARS = 'cars'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  name: string;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface TrackingSettings {
  facebookPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
  googleSheetsWebhook: string;
}

export interface DomainSettings {
  domain: string;
  nameServer1: string;
  nameServer2: string;
}
