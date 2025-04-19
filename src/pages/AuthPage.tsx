
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { DriverLoginOption } from "@/components/auth/DriverLoginOption";
import { MainLayout } from "@/components/layout/MainLayout";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = (data: {
    email: string;
    password: string;
    name?: string;
    isLogin: boolean;
  }) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (data.isLogin) {
        // Login logic - in a real app, this would verify credentials with a backend
        console.log("Logging in:", data.email);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", "rider");
        localStorage.setItem("userName", "John Doe");
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        navigate("/ride");
      } else {
        // Registration logic - in a real app, this would create a new user
        console.log("Registering:", data.email, data.name);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", "rider");
        localStorage.setItem("userName", data.name || "New User");
        
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
        });
        
        navigate("/ride");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <AuthForm onSubmit={handleAuthSubmit} />
            <DriverLoginOption />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
