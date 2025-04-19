
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Bike, 
  CheckCircle,
  Clock,
  MapPin,
  User,
  DollarSign,
  Shield,
  Star
} from "lucide-react";

export function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-brand-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-heading leading-tight">
                The Smarter Way <br />to Get Around
              </h1>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                Book rides instantly, track your driver in real-time, and enjoy a safe journey anywhere in the city.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/login">Book a Ride</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/driver-signup">Become a Driver</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md mx-auto">
                <Tabs defaultValue="car" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="car" className="flex items-center gap-2">
                      <Car size={16} />
                      <span>Car</span>
                    </TabsTrigger>
                    <TabsTrigger value="bike" className="flex items-center gap-2">
                      <Bike size={16} />
                      <span>Bike</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1595948213407-a97720dd07cf?q=80&w=1080&auto=format&fit=crop"
                      alt="City Map" 
                      className="rounded-lg h-64 w-full object-cover mb-4" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-2 text-brand-600 font-medium">
                          <Clock size={18} />
                          <span>Book your ride in seconds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                      <p className="text-2xl font-bold">₹49</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Arrives in</p>
                      <p className="text-2xl font-bold">3 min</p>
                    </div>
                  </div>
                </Tabs>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full z-0"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-100 dark:bg-brand-900/20 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Getting around the city has never been easier. Just a few simple steps and you're on your way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Set Your Location",
                description: "Choose your pickup and dropoff points on the map",
                color: "text-brand-500"
              },
              {
                icon: Car,
                title: "Match with Driver",
                description: "We'll connect you with the nearest available driver",
                color: "text-orange-500"
              },
              {
                icon: Star,
                title: "Enjoy The Ride",
                description: "Track your ride in real-time and rate your experience",
                color: "text-teal-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg card-hover">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                    <feature.icon className={feature.color} size={24} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose TravelEaseGo</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best experience for both riders and drivers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Quick & Reliable",
                description: "Get a ride in minutes, even at the busiest times"
              },
              {
                icon: DollarSign,
                title: "Competitive Pricing",
                description: "Know the fare upfront, with no hidden charges"
              },
              {
                icon: Shield,
                title: "Safety First",
                description: "Verified drivers and real-time ride tracking"
              },
              {
                icon: User,
                title: "Experienced Drivers",
                description: "Professional drivers who know the city well"
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center border-none shadow-md">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                    <benefit.icon className="text-brand-600 dark:text-brand-400" size={24} />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ride Options */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Ride</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Whether you need a car for comfort or a bike for quick trips, we've got you covered with our range of ride options.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                    <Car className="text-brand-600 dark:text-brand-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Car Rides</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Comfortable rides with spacious seating for up to 4 passengers. Perfect for longer trips or groups.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Bike className="text-orange-600 dark:text-orange-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Bike Rides</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Quick and affordable transportation for one passenger. Great for beating traffic and short distances.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="btn-primary">
                  <Link to="/ride">Book Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1080&auto=format&fit=crop"
                alt="Car and bike options" 
                className="rounded-xl shadow-xl w-full object-cover h-[400px]" 
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full -z-10"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-100 dark:bg-brand-900/20 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what customers have to say about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Daily Commuter",
                quote: "I use TravelEaseGo every day for my commute to work. The drivers are always punctual and professional. Highly recommended!",
                rating: 5
              },
              {
                name: "Raj Patel",
                role: "Business Traveler",
                quote: "The app is incredibly intuitive, and I never have to wait more than a few minutes for a ride. It's made traveling for work so much easier.",
                rating: 4
              },
              {
                name: "Anjali Verma",
                role: "Weekend Traveler",
                quote: "I love the bike option for quick trips around the city. It's affordable and gets me through traffic in no time. Great service overall!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="gradient-card overflow-hidden border-none shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-600 dark:bg-brand-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iLjIiPjxjaXJjbGUgY3g9IjcyMCIgY3k9IjM2MCIgcj0iMTAwIi8+PGNpcmNsZSBjeD0iNzIwIiBjeT0iMzYwIiByPSIyMDAiLz48Y2lyY2xlIGN4PSI3MjAiIGN5PSIzNjAiIHI9IjMwMCIvPjxjaXJjbGUgY3g9IjcyMCIgY3k9IjM2MCIgcj0iNDAwIi8+PGNpcmNsZSBjeD0iNzIwIiBjeT0iMzYwIiByPSI1MDAiLz48Y2lyY2xlIGN4PSI3MjAiIGN5PSIzNjAiIHI9IjYwMCIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Smoother Rides?</h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of satisfied users who rely on TravelEaseGo for their daily transportation needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-brand-600 hover:bg-gray-100">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
