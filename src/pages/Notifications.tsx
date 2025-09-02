import React from 'react';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Settings, Mail, MessageCircle, AlertTriangle } from 'lucide-react';

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'Alert',
      title: 'Low Water Level',
      message: 'Tank A-1 is running low on water (15% remaining)',
      time: '2 minutes ago',
      read: false,
      priority: 'High'
    },
    {
      id: 2,
      type: 'Maintenance',
      title: 'Scheduled Maintenance',
      message: 'Filter replacement for Tank B-2 is due tomorrow',
      time: '1 hour ago',
      read: false,
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'System',
      title: 'System Update',
      message: 'AquaMind system has been updated to version 1.2.3',
      time: '3 hours ago',
      read: true,
      priority: 'Low'
    },
    {
      id: 4,
      type: 'Community',
      title: 'Community Message',
      message: 'New message from Riverside District community',
      time: '5 hours ago',
      read: true,
      priority: 'Low'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Alert': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'Maintenance': return <Settings className="h-4 w-4 text-orange-600" />;
      case 'System': return <Bell className="h-4 w-4 text-blue-600" />;
      case 'Community': return <MessageCircle className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold aqua-gradient bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with system alerts and messages
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
            <Button variant="outline">
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Mail className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Notifications received
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">1</div>
              <p className="text-xs text-muted-foreground">
                Critical alerts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <MessageCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Total notifications
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Your latest system notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 border rounded-lg transition-colors hover:bg-accent/50 ${
                    !notification.read ? 'bg-accent/20 border-primary/20' : ''
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {notification.type}
                    </Badge>
                    {!notification.read && (
                      <Button variant="outline" size="sm">
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Customize how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Critical Alerts</p>
                  <p className="text-xs text-muted-foreground">Immediate notifications</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Daily summaries</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Community Updates</p>
                  <p className="text-xs text-muted-foreground">Weekly digest</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default Notifications;