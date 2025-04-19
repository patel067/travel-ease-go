
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapView } from "@/components/map/MapView";
import { MainLayout } from "@/components/layout/MainLayout";
import { FullPageLoader } from "@/components/ui/loading-spinner";

const RidePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);
  
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userType = localStorage.getItem("userType") || "rider";
  const userName = localStorage.getItem("userName") || "Guest User";
  
  if (isLoading) {
    return <FullPageLoader />;
  }
  
  return (
    <MainLayout 
      isAuthenticated={isAuthenticated}
      userType={userType as 'rider' | 'driver' | 'admin'}
      userName={userName}
    >
      <MapView />
    </MainLayout>
  );
};

export default RidePage;
