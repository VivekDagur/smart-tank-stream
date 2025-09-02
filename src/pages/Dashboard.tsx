import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Droplets, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Activity,
  Target
} from 'lucide-react';
import { WaterChart } from '@/components/WaterChart';
import { TankCard } from '@/components/TankCard';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { useAuth } from '@/hooks/useAuth';
import { 
  mockTanks, 
  calculateKPIs, 
  generateHistoricalData,
  type Tank 
} from '@/utils/mockData';
import { getSensorInstance, startSensorSimulation } from '@/utils/sensors';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tanks, setTanks] = useState<Tank[]>(mockTanks);
  const [selectedTank, setSelectedTank] = useState<Tank>(tanks[0]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  // Calculate KPIs based on current tank data
  const kpis = calculateKPIs(tanks);

  // Generate chart data for selected tank
  const chartData = generateHistoricalData(selectedTank, 24); // Last 24 hours

  // Initialize sensor simulation
  useEffect(() => {
    const sensorInstance = startSensorSimulation(tanks);
    setIsSimulationRunning(true);

    // Subscribe to tank updates
    const unsubscribeTanks = sensorInstance.onTankUpdate((updatedTanks) => {
      setTanks([...updatedTanks]);
      setLastUpdate(new Date());
      
      // Update selected tank if it matches
      const updatedSelected = updatedTanks.find(t => t.tank_id === selectedTank.tank_id);
      if (updatedSelected) {
        setSelectedTank(updatedSelected);
      }
    });

    // Subscribe to alerts
    const unsubscribeAlerts = sensorInstance.onAlert((alert) => {
      const severity = alert.severity === 'critical' ? 'destructive' : 
                     alert.severity === 'high' ? 'destructive' :
                     alert.severity === 'medium' ? 'default' : 'default';
      
      toast({
        variant: severity as 'destructive' | 'default',
        title: `${alert.type.toUpperCase()} Alert`,
        description: alert.message,
      });
    });

    return () => {
      unsubscribeTanks();
      unsubscribeAlerts();
      sensorInstance.stop();
      setIsSimulationRunning(false);
    };
  }, [selectedTank.tank_id, toast]);

  const handleRefillTank = (tankId: string) => {
    try {
      const sensorInstance = getSensorInstance();
      sensorInstance.refillTank(tankId);
      
      toast({
        title: 'Tank Refilled! 🚰',
        description: 'Tank has been successfully refilled to full capacity.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Refill Failed',
        description: 'Unable to refill tank. Please try again.',
      });
    }
  };

  const kpiCards = [
    {
      title: 'Total Water Stored',
      value: `${kpis.totalWaterStored.toLocaleString()} L`,
      subtitle: `${kpis.utilizationPercentage}% of capacity`,
      icon: Droplets,
      color: 'text-primary',
      trend: '+2.5% from yesterday'
    },
    {
      title: 'Community Tanks',
      value: kpis.communityTanks.toString(),
      subtitle: 'Active monitoring',
      icon: Users,
      color: 'text-success',
      trend: '4 healthy, 1 low'
    },
    {
      title: 'Daily Consumption',
      value: `${kpis.avgDailyConsumption.toLocaleString()} L`,
      subtitle: 'Average per day',
      icon: TrendingUp,
      color: 'text-primary',
      trend: '-5% vs last week'
    },
    {
      title: 'Next Refill ETA',
      value: kpis.nextRefillETA ? `${kpis.nextRefillETA}h` : 'N/A',
      subtitle: 'Most urgent tank',
      icon: Clock,
      color: kpis.nextRefillETA && kpis.nextRefillETA < 12 ? 'text-destructive' : 'text-warning',
      trend: 'Community Tank Beta'
    }
  ];

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold aqua-gradient bg-clip-text text-transparent animate-fade-in">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Monitor your water systems with real-time AI insights
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Activity className={`w-4 h-4 ${isSimulationRunning ? 'text-success animate-pulse' : 'text-muted-foreground'}`} />
              <span>Live monitoring</span>
            </div>
            
            <Badge variant="outline" className="text-xs">
              Last update: {lastUpdate.toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.title} className="hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${kpi.color}`}>
                      {kpi.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {kpi.subtitle}
                    </p>
                    {kpi.trend && (
                      <p className="text-xs text-muted-foreground">
                        {kpi.trend}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alerts Banner */}
        {(kpis.criticalTankCount > 0 || kpis.lowTankCount > 0) && (
          <Card className="border-l-4 border-l-destructive bg-destructive/5 animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">
                    Attention Required: {kpis.criticalTankCount + kpis.lowTankCount} tanks need refilling
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {kpis.criticalTankCount > 0 && `${kpis.criticalTankCount} critical`}
                    {kpis.criticalTankCount > 0 && kpis.lowTankCount > 0 && ', '}
                    {kpis.lowTankCount > 0 && `${kpis.lowTankCount} low`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WaterChart 
              data={chartData}
              title={`${selectedTank.name} - Water Level Trend`}
              height={400}
            />
          </div>
          
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Monitor Tank</Label>
                <select 
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={selectedTank.tank_id}
                  onChange={(e) => {
                    const tank = tanks.find(t => t.tank_id === e.target.value);
                    if (tank) setSelectedTank(tank);
                  }}
                >
                  {tanks.map(tank => (
                    <option key={tank.tank_id} value={tank.tank_id}>
                      {tank.name} ({Math.round((tank.current_liters / tank.capacity_liters) * 100)}%)
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4 space-y-3 border-t border-border">
                <h4 className="font-medium text-sm">System Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Tanks</span>
                    <span className="font-medium">{tanks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monitoring</span>
                    <Badge variant="outline" className="text-xs">
                      <Activity className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Insights</span>
                    <Badge className="text-xs bg-primary text-primary-foreground">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tank Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tank Overview</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setLastUpdate(new Date());
                toast({
                  title: 'Data Refreshed',
                  description: 'Tank information has been updated.',
                });
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tanks.map((tank, index) => (
              <TankCard 
                key={tank.tank_id} 
                tank={tank} 
                onRefill={handleRefillTank}
                className="animate-slide-up"
              />
            ))}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Dashboard;