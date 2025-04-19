
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DriverDashboard } from "@/components/driver/DriverDashboard";
import { MainLayout } from "@/components/layout/MainLayout";
import { FullPageLoader } from "@/components/ui/loading-spinner";

const DriverDashboardPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated and is a driver
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userType = localStorage.getItem("userType");
    
    if (!isAuthenticated || userType !== "driver") {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);
  
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userType = localStorage.getItem("userType") || "driver";
  const userName = localStorage.getItem("userName") || "Driver User";
  
  if (isLoading) {
    return <FullPageLoader />;
  }
  
  return (
    <MainLayout 
      isAuthenticated={isAuthenticated}
      userType={userType as 'rider' | 'driver' | 'admin'}
      userName={userName}
    >
      <DriverDashboard />
    </MainLayout>
  );
};

export default DriverDashboardPage;
