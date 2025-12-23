import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import { AppPieChart } from "@/components/AppPieChart";
import { AppPieChartStacked } from "@/components/AppPieChartStacked";
import { AppRadarChart } from "@/components/AppRadaarChart";
import { AppRadialChart } from "@/components/AppRadialChart";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-4 grid-flow-dense">
      
      {/* BIG */}
      <div className="p-3 bg-card rounded-lg lg:col-span-2 xl:col-span-2">
        <AppBarChart />
      </div>

      {/* SMALL */}
      <div className="p-3 bg-card rounded-lg">
        <AppPieChart />
      </div>

      <div className="p-3 bg-card rounded-lg">
        <AppRadialChart />
      </div>

      <div className="p-3 bg-card rounded-lg">
        <AppRadarChart />
      </div>

      {/* BIG */}
      <div className="p-3 bg-card rounded-lg lg:col-span-2 xl:col-span-2">
        <AppAreaChart />
      </div>

      {/* SMALL */}
      <div className="p-3 bg-card rounded-lg">
        <AppPieChartStacked />
      </div>

    </div>
  );
};

export default DashboardPage;

