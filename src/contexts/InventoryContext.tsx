
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";
import { Product, Sale, Invoice } from "@/types";

type InventoryContextType = {
  products: Product[];
  sales: Sale[];
  invoices: Invoice[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  processSale: (items: {productId: string, quantity: number}[], customerInfo: any) => Invoice;
  restockProduct: (id: string, quantity: number) => void;
  getLowStockProducts: () => Product[];
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Sample data
const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    cost: 750,
    stockQuantity: 15,
    lowStockThreshold: 5,
    sku: "LAP-001"
  },
  {
    id: "p2", 
    name: "Desk Chair",
    category: "Furniture",
    price: 149.99,
    cost: 80,
    stockQuantity: 8,
    lowStockThreshold: 3,
    sku: "DCH-002"
  },
  {
    id: "p3",
    name: "Coffee Maker",
    category: "Appliances",
    price: 79.99,
    cost: 40,
    stockQuantity: 4,
    lowStockThreshold: 5,
    sku: "COF-003"
  },
  {
    id: "p4",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    cost: 30,
    stockQuantity: 20,
    lowStockThreshold: 5,
    sku: "SPK-004"
  },
  {
    id: "p5",
    name: "Office Desk",
    category: "Furniture",
    price: 299.99,
    cost: 180,
    stockQuantity: 6,
    lowStockThreshold: 2,
    sku: "DSK-005"
  }
];

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  
  const [sales, setSales] = useState<Sale[]>(() => {
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : [];
  });
  
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const savedInvoices = localStorage.getItem('invoices');
    return savedInvoices ? JSON.parse(savedInvoices) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [products, sales, invoices]);

  // Check for low stock notifications on initial load
  useEffect(() => {
    const lowStockItems = getLowStockProducts();
    if (lowStockItems.length > 0) {
      toast(`${lowStockItems.length} items are low in stock!`, {
        description: "Check inventory for details",
      });
    }
  }, []);

  const addProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: `p${Date.now()}`,
    };
    setProducts([...products, newProduct]);
    toast.success("Product added successfully");
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === id ? { ...updatedProduct, id } : product
    ));
    toast.success("Product updated successfully");
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const processSale = (items: {productId: string, quantity: number}[], customerInfo: any) => {
    // Create sale record
    const saleItems = items.map(item => {
      const product = products.find(p => p.id === item.productId)!;
      return {
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        total: product.price * item.quantity
      };
    });

    const saleTotal = saleItems.reduce((sum, item) => sum + item.total, 0);
    
    const sale: Sale = {
      id: `s${Date.now()}`,
      date: new Date().toISOString(),
      items: saleItems,
      total: saleTotal,
      customerId: customerInfo.id || null,
      customerName: customerInfo.name || "Walk-in Customer"
    };

    // Update inventory
    const updatedProducts = products.map(product => {
      const soldItem = items.find(item => item.productId === product.id);
      if (soldItem) {
        const newQuantity = product.stockQuantity - soldItem.quantity;
        
        // Check if stock goes below threshold after sale
        if (newQuantity <= product.lowStockThreshold && product.stockQuantity > product.lowStockThreshold) {
          toast(`Low stock alert: ${product.name}`, {
            description: `Only ${newQuantity} units remaining`,
          });
        }
        
        return {
          ...product,
          stockQuantity: newQuantity
        };
      }
      return product;
    });

    // Generate invoice
    const invoice: Invoice = {
      id: `inv${Date.now()}`,
      saleId: sale.id,
      date: sale.date,
      customerName: sale.customerName,
      items: sale.items,
      subtotal: saleTotal,
      tax: saleTotal * 0.1, // 10% tax
      total: saleTotal * 1.1,
      status: "paid",
    };

    setSales([...sales, sale]);
    setInvoices([...invoices, invoice]);
    setProducts(updatedProducts);
    
    toast.success("Sale processed successfully");
    return invoice;
  };

  const restockProduct = (id: string, quantity: number) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, stockQuantity: product.stockQuantity + quantity } 
        : product
    ));
    toast.success(`${quantity} units added to stock`);
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.stockQuantity <= product.lowStockThreshold);
  };

  return (
    <InventoryContext.Provider value={{
      products,
      sales,
      invoices,
      addProduct,
      updateProduct,
      deleteProduct,
      processSale,
      restockProduct,
      getLowStockProducts
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
