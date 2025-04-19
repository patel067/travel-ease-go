
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Search, Car, Bike } from 'lucide-react';

// This is just a placeholder - in a real app, you'd store this in an environment variable
// and access it securely. For demo purposes, we use a temporary token. Users will need to
// replace this with their actual Mapbox token.
const MAPBOX_TOKEN = 'pk.placeholder-token-replace-with-yours';

interface Location {
  lng: number;
  lat: number;
  address?: string;
}

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [rideType, setRideType] = useState<'car' | 'bike'>('car');
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [fare, setFare] = useState<number | null>(null);
  const [eta, setEta] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], // Center of India
      zoom: 4
    });
    
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add user location control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Simulate finding a route and calculating fare when both locations are set
  useEffect(() => {
    if (pickup && dropoff) {
      // In a real app, you'd call a routing API to get the actual route
      const distance = calculateDistance(pickup, dropoff);
      
      // Simulate different rates for car vs bike
      const ratePerKm = rideType === 'car' ? 12 : 7;
      const baseFare = rideType === 'car' ? 50 : 30;
      const calculatedFare = Math.round(baseFare + (distance * ratePerKm));
      
      // Simulate ETA calculation (in minutes)
      const speed = rideType === 'car' ? 30 : 20; // km/h
      const timeInHours = distance / speed;
      const timeInMinutes = Math.round(timeInHours * 60);
      
      setFare(calculatedFare);
      setEta(timeInMinutes);
    }
  }, [pickup, dropoff, rideType]);
  
  // Helper function to calculate distance between two points (simple approximation)
  const calculateDistance = (point1: Location, point2: Location) => {
    // In a real app, you'd use a proper routing service
    // This is a crude approximation using the Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
    const dLon = (point2.lng - point1.lng) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * (Math.PI / 180)) * Math.cos(point2.lat * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  };
  
  // Simulates setting location in a real app
  const setLocation = (type: 'pickup' | 'dropoff') => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate a random point near Delhi for demo
      const baseLat = 28.7041;
      const baseLng = 77.1025;
      const randomOffset = () => (Math.random() - 0.5) * 0.1;
      
      const location = {
        lat: baseLat + randomOffset(),
        lng: baseLng + randomOffset(),
        address: type === 'pickup' 
          ? '123 Delhi Street, New Delhi' 
          : '456 Mumbai Road, New Delhi'
      };
      
      if (type === 'pickup') {
        setPickup(location);
      } else {
        setDropoff(location);
      }
      
      // In a real application, you would add markers to the map
      if (map.current) {
        // Add marker logic would go here
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const bookRide = () => {
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      alert(`Your ${rideType} has been booked! A driver will arrive in approximately ${eta} minutes.`);
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <div className="relative h-[calc(100vh-6rem)]">
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Control panel */}
      <div className="absolute top-4 left-4 w-full max-w-md">
        <Card className="shadow-xl glass-card">
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold mb-4 gradient-heading">Book a Ride</h2>
            
            <Tabs value={rideType} onValueChange={(v) => setRideType(v as 'car' | 'bike')} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="car" className="flex items-center gap-2">
                  <Car size={16} />
                  <span>Car</span>
                </TabsTrigger>
                <TabsTrigger value="bike" className="flex items-center gap-2">
                  <Bike size={16} />
                  <span>Bike</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="car">
                <p className="text-sm text-muted-foreground mb-4">Comfortable rides with extra space</p>
              </TabsContent>
              
              <TabsContent value="bike">
                <p className="text-sm text-muted-foreground mb-4">Fast and affordable for short trips</p>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-brand-500" />
                <Input 
                  placeholder="Pickup location"
                  value={pickup?.address || ''}
                  className="pl-10"
                  readOnly
                  onClick={() => setLocation('pickup')}
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input 
                  placeholder="Dropoff location"
                  value={dropoff?.address || ''}
                  className="pl-10"
                  readOnly
                  onClick={() => setLocation('dropoff')}
                />
              </div>
              
              {pickup && dropoff && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Estimated fare:</span>
                    <span className="font-bold">₹{fare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ETA:</span>
                    <span className="font-bold">{eta} mins</span>
                  </div>
                </div>
              )}
              
              <Button 
                className={`w-full ${rideType === 'car' ? 'btn-primary' : 'btn-secondary'}`}
                disabled={!pickup || !dropoff || isLoading}
                onClick={bookRide}
              >
                {isLoading ? "Finding drivers..." : "Book Now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
