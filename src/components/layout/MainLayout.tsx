
import { ReactNode, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  User, 
  History, 
  LogOut, 
  Menu, 
  X, 
  MapPin, 
  Car, 
  ShieldCheck, 
  Settings,
  LogIn
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  userType?: 'rider' | 'driver' | 'admin';
  userName?: string;
}

export function MainLayout({ 
  children, 
  isAuthenticated = false, 
  userType = 'rider',
  userName = 'Guest User'
}: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const NavLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
    const isActive = location.pathname === href;
    return (
      <Link
        to={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
          ${isActive 
            ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-400' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };
  
  const getNavItems = () => {
    const items = [
      { href: "/", icon: Home, label: "Home" },
    ];
    
    if (isAuthenticated) {
      if (userType === 'rider') {
        items.push(
          { href: "/ride", icon: Car, label: "Book Ride" },
          { href: "/history", icon: History, label: "Ride History" },
          { href: "/profile", icon: User, label: "Profile" }
        );
      } else if (userType === 'driver') {
        items.push(
          { href: "/dashboard", icon: Car, label: "Dashboard" },
          { href: "/rides", icon: History, label: "My Rides" },
          { href: "/profile", icon: User, label: "Profile" }
        );
      } else if (userType === 'admin') {
        items.push(
          { href: "/dashboard", icon: ShieldCheck, label: "Dashboard" },
          { href: "/users", icon: User, label: "Users" },
          { href: "/settings", icon: Settings, label: "Settings" }
        );
      }
    } else {
      items.push(
        { href: "/login", icon: LogIn, label: "Login" }
      );
    }
    
    return items;
  };
  
  const handleLogout = () => {
    // In a real app, implement logout logic here
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-full bg-brand-600 p-1 flex items-center justify-center">
                <Car size={22} className="text-white" />
              </div>
              <span className="font-bold text-xl">TravelEaseGo</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {getNavItems().map((item) => (
                <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
              ))}
            </nav>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-gray-200">
                      <AvatarImage src="/placeholder.svg" alt={userName} />
                      <AvatarFallback className="bg-brand-100 text-brand-700">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="rounded-full bg-brand-600 p-1 flex items-center justify-center">
                    <Car size={22} className="text-white" />
                  </div>
                  <span className="font-bold text-xl">TravelEaseGo</span>
                </div>
                
                <Separator className="mb-4" />
                
                <nav className="flex flex-col gap-2">
                  {getNavItems().map((item) => (
                    <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
                  ))}
                  
                  {isAuthenticated && (
                    <>
                      <Separator className="my-4" />
                      <Button 
                        variant="ghost" 
                        onClick={handleLogout}
                        className="flex items-center justify-start gap-3 text-red-500 px-3"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full bg-brand-600 p-1 flex items-center justify-center">
                  <Car size={18} className="text-white" />
                </div>
                <span className="font-bold text-lg">TravelEaseGo</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bringing you the safest and most convenient rides in town.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-500 hover:text-brand-600 dark:text-gray-400">Home</Link></li>
                <li><Link to="/about" className="text-gray-500 hover:text-brand-600 dark:text-gray-400">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-500 hover:text-brand-600 dark:text-gray-400">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-500 hover:text-brand-600 dark:text-gray-400">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-gray-500 hover:text-brand-600 dark:text-gray-400">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-500 hover:text-brand-600 dark:text-gray-400">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TravelEaseGo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
