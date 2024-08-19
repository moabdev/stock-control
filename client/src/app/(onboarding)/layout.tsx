"use client";
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedSidebar from "@/components/layout/AnimatedSidebar";
import MainContent from "@/components/layout/Content";
import Dashboard from "@/components/dashboard/Dashboard";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-[1440px] mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen"
      )}
    >
      <AnimatedSidebar />
      <MainContent>
        <Dashboard />
      </MainContent>
    </div>
  );
};

export default OnboardingLayout;
