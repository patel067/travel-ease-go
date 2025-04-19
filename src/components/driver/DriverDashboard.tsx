
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader, Car, MapPin, Clock, User, DollarSign, Star, Info, CheckCircle, XCircle } from 'lucide-react';

interface RideRequest {
  id: string;
  rider: {
    name: string;
    rating: number;
    image?: string;
  };
  pickup: string;
  dropoff: string;
  distance: string;
  fare: number;
  eta: number;
}

interface OngoingRide {
  id: string;
  rider: {
    name: string;
    rating: number;
    image?: string;
  };
  pickup: string;
  dropoff: string;
  distance: string;
  fare: number;
  status: 'enroute' | 'arrived' | 'in_progress';
  startTime?: Date;
}

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState<OngoingRide | null>(null);
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [completedRides, setCompletedRides] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate fetching driver data
  useEffect(() => {
    if (isOnline && !currentRide && rideRequests.length === 0) {
      // Simulate incoming ride request after going online
      const timeout = setTimeout(() => {
        setRideRequests([
          {
            id: 'ride-' + Math.random().toString(36).substr(2, 9),
            rider: {
              name: 'Rahul Sharma',
              rating: 4.8,
              image: '/placeholder.svg'
            },
            pickup: 'Connaught Place, New Delhi',
            dropoff: 'Saket, New Delhi',
            distance: '8.2 km',
            fare: 210,
            eta: 5
          }
        ]);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [isOnline, currentRide, rideRequests]);
  
  const handleGoOnline = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsOnline(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleGoOffline = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsOnline(false);
      setIsLoading(false);
    }, 1500);
  };
  
  const acceptRide = (rideId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const acceptedRide = rideRequests.find(req => req.id === rideId);
      if (acceptedRide) {
        setCurrentRide({
          ...acceptedRide,
          status: 'enroute'
        });
        setRideRequests([]);
      }
      setIsLoading(false);
    }, 2000);
  };
  
  const rejectRide = (rideId: string) => {
    setRideRequests(rideRequests.filter(req => req.id !== rideId));
  };
  
  const updateRideStatus = (status: OngoingRide['status']) => {
    if (!currentRide) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentRide({
        ...currentRide,
        status,
        startTime: status === 'in_progress' ? new Date() : currentRide.startTime
      });
      setIsLoading(false);
    }, 1500);
  };
  
  const completeRide = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentRide) {
        setTodayEarnings(prev => prev + currentRide.fare);
        setCompletedRides(prev => prev + 1);
      }
      setCurrentRide(null);
      setIsLoading(false);
    }, 2000);
  };
  
  const renderRideStatusControls = () => {
    if (!currentRide) return null;
    
    switch (currentRide.status) {
      case 'enroute':
        return (
          <Button onClick={() => updateRideStatus('arrived')} className="w-full bg-brand-600 hover:bg-brand-700">
            I've Arrived at Pickup
          </Button>
        );
      case 'arrived':
        return (
          <Button onClick={() => updateRideStatus('in_progress')} className="w-full bg-brand-600 hover:bg-brand-700">
            Start Ride
          </Button>
        );
      case 'in_progress':
        return (
          <Button onClick={completeRide} className="w-full bg-orange-500 hover:bg-orange-600">
            Complete Ride
          </Button>
        );
      default:
        return null;
    }
  };
  
  const renderRideStatusBadge = () => {
    if (!currentRide) return null;
    
    switch (currentRide.status) {
      case 'enroute':
        return <Badge className="bg-orange-500">En Route to Pickup</Badge>;
      case 'arrived':
        return <Badge className="bg-brand-500">At Pickup Location</Badge>;
      case 'in_progress':
        return <Badge className="bg-teal-500">Ride in Progress</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Driver Status Section */}
        <Card className="w-full md:w-1/3 shadow-md">
          <CardHeader>
            <CardTitle>Driver Status</CardTitle>
            <CardDescription>Toggle your availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="driver-status">You are currently</Label>
                <span className={`font-medium ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <Switch
                id="driver-status"
                checked={isOnline}
                disabled={isLoading || !!currentRide}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleGoOnline();
                  } else {
                    handleGoOffline();
                  }
                }}
              />
            </div>
            
            {isLoading && (
              <div className="flex justify-center mt-4">
                <Loader className="animate-spin" />
              </div>
            )}
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <DollarSign className="mx-auto mb-2 text-orange-500" />
                  <p className="text-sm text-muted-foreground">Today's Earnings</p>
                  <p className="text-2xl font-bold">₹{todayEarnings}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <Car className="mx-auto mb-2 text-brand-500" />
                  <p className="text-sm text-muted-foreground">Rides Completed</p>
                  <p className="text-2xl font-bold">{completedRides}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        {/* Ride Requests Section */}
        <Card className="w-full md:w-2/3 shadow-md">
          <CardHeader>
            <CardTitle>Active Rides</CardTitle>
            <CardDescription>
              {isOnline 
                ? currentRide 
                  ? "You're currently on a ride" 
                  : rideRequests.length > 0 
                    ? "New ride request(s)" 
                    : "Waiting for ride requests..." 
                : "Go online to receive ride requests"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {!isOnline && (
              <div className="text-center py-8">
                <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">You're offline</h3>
                <p className="text-muted-foreground mb-6">Go online to start receiving ride requests</p>
                <Button onClick={handleGoOnline} disabled={isLoading} className="bg-brand-600 hover:bg-brand-700">
                  {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Go Online
                </Button>
              </div>
            )}
            
            {isOnline && !currentRide && rideRequests.length === 0 && (
              <div className="text-center py-8">
                <Loader className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-spin" />
                <h3 className="text-lg font-medium mb-2">Waiting for ride requests</h3>
                <p className="text-muted-foreground">Stay online to receive incoming ride requests</p>
              </div>
            )}
            
            {/* Incoming Ride Requests */}
            {isOnline && !currentRide && rideRequests.map((request) => (
              <div key={request.id} className="animate-in bg-white dark:bg-gray-800 border rounded-lg p-4 mb-4 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{request.rider.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>{request.rider.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{request.fare}</p>
                    <p className="text-sm text-muted-foreground">{request.distance}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-brand-500" />
                    <div>
                      <p className="text-sm font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground">{request.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">Dropoff</p>
                      <p className="text-sm text-muted-foreground">{request.dropoff}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{request.eta} min to pickup</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => rejectRide(request.id)}
                      className="border-gray-300"
                    >
                      Decline
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => acceptRide(request.id)}
                      className="bg-brand-600 hover:bg-brand-700"
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Current Ride */}
            {currentRide && (
              <div className="animate-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Current Ride</h3>
                  {renderRideStatusBadge()}
                </div>
                
                <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 mb-4 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{currentRide.rider.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          <span>{currentRide.rider.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{currentRide.fare}</p>
                      <p className="text-sm text-muted-foreground">{currentRide.distance}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-brand-500" />
                      <div>
                        <p className="text-sm font-medium">Pickup</p>
                        <p className="text-sm text-muted-foreground">{currentRide.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Dropoff</p>
                        <p className="text-sm text-muted-foreground">{currentRide.dropoff}</p>
                      </div>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center my-4">
                      <Loader className="animate-spin" />
                    </div>
                  ) : (
                    renderRideStatusControls()
                  )}
                  
                  <div className="flex items-center justify-center mt-4">
                    <Button variant="outline" size="sm" className="text-sm">
                      <Info className="h-4 w-4 mr-2" />
                      Contact Rider
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
