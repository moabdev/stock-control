import React from "react";
import { PieChartComponent } from "../charts/PieChart";
import { BarChartComponent } from "../charts/BarChart";
import { AreaChartComponent } from "../charts/AreaChart";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PieChartComponent />
      <BarChartComponent />
      <AreaChartComponent />

      <PieChartComponent />
      <BarChartComponent />
      <AreaChartComponent />
    </div>
  );
};

export default Dashboard;
