import React from 'react';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, MessageCircle, Calendar } from 'lucide-react';

const Community: React.FC = () => {
  const communities = [
    { name: 'Riverside District', members: 45, status: 'Active', tanks: 8 },
    { name: 'Downtown Complex', members: 32, status: 'Active', tanks: 6 },
    { name: 'Garden Valley', members: 28, status: 'Maintenance', tanks: 4 },
    { name: 'Hillside Homes', members: 67, status: 'Active', tanks: 12 }
  ];

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold aqua-gradient bg-clip-text text-transparent">
              Community Management
            </h1>
            <p className="text-muted-foreground">
              Manage water communities and collaborative usage
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Join Community</span>
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Communities</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Active communities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">172</div>
              <p className="text-xs text-muted-foreground">
                Across all communities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shared Tanks</CardTitle>
              <MapPin className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
              <p className="text-xs text-muted-foreground">
                Community managed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
              <MessageCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Community updates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Communities List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Communities</CardTitle>
            <CardDescription>
              Communities you're part of or manage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communities.map((community, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{community.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {community.members} members • {community.tanks} tanks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={community.status === 'Active' ? 'default' : 'secondary'}
                    >
                      {community.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Community Activity</CardTitle>
            <CardDescription>
              Latest updates from your communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { community: 'Riverside District', action: 'Tank maintenance scheduled', time: '2 hours ago' },
                { community: 'Downtown Complex', action: 'New member joined', time: '4 hours ago' },
                { community: 'Garden Valley', action: 'Weekly report generated', time: '1 day ago' },
                { community: 'Hillside Homes', action: 'Alert: Low water level in Tank 3', time: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.community}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default Community;