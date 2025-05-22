
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  BarChart4, 
  Settings, 
  Menu, 
  X, 
  BellDot,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useInventory } from '@/contexts/InventoryContext';
import { useAuth } from '@/contexts/AuthContext';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { getLowStockProducts } = useInventory();
  const { user, logout } = useAuth();
  
  const lowStockItems = getLowStockProducts();
  const hasNotifications = lowStockItems.length > 0;

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Sales', href: '/sales', icon: ShoppingCart },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart4 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">InventBill</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "sidebar-item",
                location.pathname === item.href && "active"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Nav */}
        <div className="relative z-10 flex items-center justify-between h-16 bg-white shadow-sm px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Moved the user controls to the right side */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative"
              >
                {hasNotifications && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
                <BellDot className="h-5 w-5" />
              </Button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border">
                  <div className="p-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    {hasNotifications ? (
                      <div className="mt-2 space-y-3">
                        {lowStockItems.map((item) => (
                          <div key={item.id} className="p-3 bg-red-50 rounded-md">
                            <p className="text-sm font-medium text-red-800">
                              Low Stock: {item.name}
                            </p>
                            <p className="text-xs text-red-700">
                              Only {item.stockQuantity} units remaining (threshold: {item.lowStockThreshold})
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user?.username || 'Admin User'}</span>
              <Button onClick={logout} variant="ghost" size="icon" title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

