
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  imageUrl?: string;
};

export type SaleItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type Sale = {
  id: string;
  date: string;
  items: SaleItem[];
  total: number;
  customerId: string | null;
  customerName: string;
};

export type Invoice = {
  id: string;
  saleId: string;
  date: string;
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue";
};

export type Category = string;

export type StockChange = {
  id: string;
  productId: string;
  productName: string;
  previousQuantity: number;
  newQuantity: number;
  changeAmount: number;
  changeType: "sale" | "restock" | "adjustment";
  date: string;
};

export type TimeRange = "today" | "week" | "month" | "year";

export type ChartData = {
  name: string;
  value: number;
};

export type SalesSummary = {
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  topSellingProducts: {name: string, quantity: number}[];
};
