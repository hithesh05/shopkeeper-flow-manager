
import React, { useState, useEffect } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';
import { Product, SaleItem } from '@/types';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const Sales = () => {
  const { products, sales, processSale } = useInventory();
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('Walk-in Customer');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaleComplete, setIsSaleComplete] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<any>(null);
  
  // Reset the cart when the dialog is closed
  useEffect(() => {
    if (!isDialogOpen) {
      setCartItems([]);
      setSelectedProductId('');
      setQuantity(1);
      setCustomerName('Walk-in Customer');
      setIsSaleComplete(false);
      setCurrentInvoice(null);
    }
  }, [isDialogOpen]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };
  
  const handleAddToCart = () => {
    if (!selectedProductId) {
      toast.error("Please select a product");
      return;
    }
    
    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    
    const product = products.find(p => p.id === selectedProductId);
    
    if (!product) {
      toast.error("Product not found");
      return;
    }
    
    // Check if there's enough in stock
    if (product.stockQuantity < quantity) {
      toast.error(`Not enough stock. Only ${product.stockQuantity} available.`);
      return;
    }
    
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      const newCartItems = [...cartItems];
      const newQuantity = newCartItems[existingItemIndex].quantity + quantity;
      
      // Check if combined quantity exceeds stock
      if (newQuantity > product.stockQuantity) {
        toast.error(`Cannot add ${quantity} more. Only ${product.stockQuantity - cartItems[existingItemIndex].quantity} more available.`);
        return;
      }
      
      newCartItems[existingItemIndex].quantity = newQuantity;
      setCartItems(newCartItems);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { product, quantity }]);
    }
    
    setSelectedProductId('');
    setQuantity(1);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };
  
  const handleRemoveFromCart = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  const handleCompleteSale = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    
    // Process the sale
    const saleItems = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    
    const customerInfo = { name: customerName };
    const invoice = processSale(saleItems, customerInfo);
    
    // Show completion state
    setIsSaleComplete(true);
    setCurrentInvoice(invoice);
  };
  
  const handlePrintInvoice = () => {
    // In a real application, this would generate a PDF
    // For now, we'll just show a success message
    toast.success("Invoice printed successfully");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" />
              New Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[750px] max-h-[90vh]">
            {!isSaleComplete ? (
              <>
                <DialogHeader>
                  <DialogTitle>Process New Sale</DialogTitle>
                  <DialogDescription>
                    Add products to the cart and complete the sale.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Product Selection */}
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="customer">Customer Name</Label>
                      <Input
                        id="customer"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="product">Product</Label>
                      <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.filter(p => p.stockQuantity > 0).map(product => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} - {formatCurrency(product.price)} ({product.stockQuantity} in stock)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <div className="flex gap-2">
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <Button onClick={handleAddToCart}>
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cart */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Cart</h3>
                    <ScrollArea className="h-[300px] border rounded-md">
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          No items in cart
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Qty</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {cartItems.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{formatCurrency(item.product.price)}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{formatCurrency(item.product.price * item.quantity)}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveFromCart(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </ScrollArea>
                    
                    <div className="flex justify-between items-center font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCompleteSale} disabled={cartItems.length === 0}>
                    Complete Sale
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Sale Complete</DialogTitle>
                  <DialogDescription>
                    Sale has been processed successfully.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Invoice #:</span>
                      <span className="font-medium">{currentInvoice?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{formatDate(currentInvoice?.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span>{currentInvoice?.customerName}</span>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentInvoice?.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>{formatCurrency(currentInvoice?.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (10%):</span>
                      <span>{formatCurrency(currentInvoice?.tax)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total:</span>
                      <span>{formatCurrency(currentInvoice?.total)}</span>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                  <Button onClick={handlePrintInvoice}>
                    Print Invoice
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sale ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No sales yet. Create your first sale to get started.
                  </TableCell>
                </TableRow>
              ) : (
                [...sales]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 10)
                  .map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.id}</TableCell>
                      <TableCell>{formatDate(sale.date)}</TableCell>
                      <TableCell>{sale.customerName}</TableCell>
                      <TableCell>
                        <Badge>{sale.items.length}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(sale.total)}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
