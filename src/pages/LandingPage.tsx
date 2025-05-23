
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { ChevronRight, CheckCircle, Users, BarChart, Package, Star, Database } from 'lucide-react';

const LandingPage = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Retail Solutions Inc.",
      content: "InventBill transformed how we manage our inventory. The automated tracking and reporting features have saved us countless hours each month.",
      role: "Operations Manager"
    },
    {
      name: "Michael Chen",
      company: "Global Distributors Ltd.",
      content: "As a wholesale business, we needed a robust system that could handle our complex inventory needs. InventBill exceeded our expectations.",
      role: "Supply Chain Director"
    },
    {
      name: "Laura Martinez",
      company: "Boutique Creations",
      content: "The billing integration is seamless. We're processing invoices faster than ever and our customers appreciate the professional presentation.",
      role: "Owner"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              InventBill
            </div>
            <div className="hidden md:flex space-x-8 text-gray-600">
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#benefits" className="hover:text-primary transition-colors">Benefits</a>
              <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            </div>
            <div className="space-x-3">
              <Link to="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button>
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-blue-700/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="bg-primary/10 text-primary py-1 px-3 rounded-full text-sm font-medium inline-block mb-4">
                  Simplify Your Business
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Smart Inventory <span className="text-primary">& Billing</span> Management
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg">
                  InventBill helps businesses optimize inventory control, streamline sales processing, 
                  and generate professional invoices—all in one elegant platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="gap-2">
                    Get Started Free <ChevronRight size={16} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Live Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="text-primary font-bold">500+</span> businesses trust InventBill
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full filter blur-xl"></div>
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1000&auto=format&fit=crop"
                  alt="Inventory Dashboard Preview" 
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="bg-white p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Inventory Analytics</h3>
                      <p className="text-sm text-gray-500">Real-time stock tracking</p>
                    </div>
                    <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      +24% growth
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium">Premium Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">All the tools you need to manage your business</h2>
            <p className="text-gray-600">
              InventBill combines powerful features with an intuitive interface, helping you stay organized and efficient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Package size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Inventory Management</h3>
              <p className="text-gray-600 mb-4">
                Track stock levels, set low stock alerts, and manage your product catalog with detailed categorization.
              </p>
              <ul className="space-y-2">
                {["Automated stock tracking", "Category management", "Low stock alerts"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Streamlined Sales Processing</h3>
              <p className="text-gray-600 mb-4">
                Process sales quickly, manage customer data, and generate professional invoices instantly.
              </p>
              <ul className="space-y-2">
                {["Customer management", "Quick checkout", "Payment tracking"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Insightful Analytics & Reports</h3>
              <p className="text-gray-600 mb-4">
                Get valuable insights into your business with customizable reports and visual analytics.
              </p>
              <ul className="space-y-2">
                {["Sales trends", "Inventory valuation", "Profit analysis"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Transforming Your Business Operations</h2>
            <p className="text-gray-600">
              Our platform is designed to help businesses of all sizes streamline operations and increase profitability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-gray-600">
                  Automate repetitive tasks like stock counting, invoice generation, and report preparation to focus on growing your business.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reduce Costs</h3>
                <p className="text-gray-600">
                  Avoid overstocking and stockouts while optimizing your inventory investment with smart inventory management.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Increase Accuracy</h3>
                <p className="text-gray-600">
                  Eliminate human error in tracking inventory, processing sales, and generating financial reports.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Improve Customer Service</h3>
                <p className="text-gray-600">
                  Access customer history instantly, process orders quickly, and provide accurate product availability information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium">Client Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Trusted by Businesses Worldwide</h2>
            <p className="text-gray-600">
              See what our customers have to say about their experience using InventBill.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
                        <div className="flex mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 flex-grow">"{testimonial.content}"</p>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious className="static translate-y-0 rounded-full" />
                <CarouselNext className="static translate-y-0 rounded-full" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your business operations?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Start your free trial today and discover how InventBill can transform your inventory and billing management.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">InventBill</div>
              <p className="mb-4">Complete inventory and billing management solution for modern businesses.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} InventBill. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
