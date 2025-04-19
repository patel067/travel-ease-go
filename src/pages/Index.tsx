
import { LandingPage } from "@/components/home/LandingPage";
import { MainLayout } from "@/components/layout/MainLayout";

const Index = () => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userType = localStorage.getItem("userType") || "rider";
  const userName = localStorage.getItem("userName") || "Guest User";

  return (
    <MainLayout 
      isAuthenticated={isAuthenticated}
      userType={userType as 'rider' | 'driver' | 'admin'}
      userName={userName}
    >
      <LandingPage />
    </MainLayout>
  );
};

export default Index;
