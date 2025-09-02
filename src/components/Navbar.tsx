import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Droplets, 
  Home, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  LogOut,
  Menu,
  User,
  MoreHorizontal,
  Activity,
  TrendingUp,
  Gauge,
  Users,
  FileText,
  Bell,
  Wrench
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onSidebarToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
    { to: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    ...(user?.role === 'admin' ? [{ to: '/admin', icon: Settings, label: 'Admin' }] : [])
  ];

  const additionalMenuItems = [
    { to: '/usage', icon: Activity, label: 'Usage Analytics' },
    { to: '/metrics', icon: Gauge, label: 'Performance Metrics' },
    { to: '/trends', icon: TrendingUp, label: 'Usage Trends' },
    { to: '/community', icon: Users, label: 'Community' },
    { to: '/maintenance', icon: Wrench, label: 'Maintenance' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { to: '/documentation', icon: FileText, label: 'Documentation' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile sidebar toggle */}
        {onSidebarToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={onSidebarToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Three-dot menu for additional navigation */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-3"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {additionalMenuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <DropdownMenuItem
                  key={item.to}
                  className={cn(
                    "cursor-pointer",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => navigate(item.to)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-3 mr-8">
          <div className="relative">
            <Droplets className="h-8 w-8 text-primary animate-wave" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-glow rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold aqua-gradient bg-clip-text text-transparent">
              AquaMind
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">
              Smart Water Management
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.label === 'Alerts' && (
                  <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                    3
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center space-x-4">
          {/* User info */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-lg">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};