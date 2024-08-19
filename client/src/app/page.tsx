// /app/page.tsx
import Dashboard from "@/components/dashboard/Dashboard";
import React from "react";
import OnboardingLayout from "./(onboarding)/layout";


const HomePage = () => {
  return (
    <OnboardingLayout>
      <Dashboard />
    </OnboardingLayout>
  );
};

export default HomePage;
