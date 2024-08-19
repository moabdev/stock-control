import { AreaChartComponent } from "../charts/AreaChart";
import { BarChartComponent } from "../charts/BarChart";
import { PieChartComponent } from "../charts/PieChart";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col flex-1 w-full h-full overflow-auto">
        <Navbar />

        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PieChartComponent />

          <BarChartComponent />

          <AreaChartComponent />

          <PieChartComponent />

          <BarChartComponent />

          <AreaChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
