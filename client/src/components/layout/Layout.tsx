"use client";
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedSidebar from "./AnimatedSidebar";
import Dashboard from "../dashboard/Dashboard";

export function Layout() {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-[1440px] mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <AnimatedSidebar />
      <Dashboard />
    </div>
  );
}
