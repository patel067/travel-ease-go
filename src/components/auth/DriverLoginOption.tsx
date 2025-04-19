
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Car } from "lucide-react";

export function DriverLoginOption() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDriverLogin = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", "driver");
      localStorage.setItem("userName", "Driver Demo");
      
      toast({
        title: "Driver account accessed",
        description: "You're now logged in as a driver.",
      });
      
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="mt-6 border-t-4 border-t-orange-500 shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Car className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-center gradient-heading-orange">
          Driver Demo
        </CardTitle>
        <CardDescription className="text-center">
          Want to see the driver experience?
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center text-sm text-gray-500">
        Click below to access a demo driver account and see the driver dashboard.
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleDriverLogin} 
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {isLoading ? "Loading..." : "Access Driver Dashboard"}
        </Button>
      </CardFooter>
    </Card>
  );
}
