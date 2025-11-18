import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import { AppPieChart } from "@/components/AppPieChart";
import { AppPieChartStacked } from "@/components/AppPieChartStacked";
import { AppRadarChart } from "@/components/AppRadaarChart";
import { AppRadialChart } from "@/components/AppRadialChart";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="p-4 bg-card rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="p-4 bg-card rounded-lg">
        <AppPieChart />
      </div>
      <div className="p-4 bg-card rounded-lg">
        <AppRadialChart />
      </div>
      <div className="p-4 bg-card rounded-lg">
        <AppRadarChart />
      </div>
      <div className="p-4 bg-card rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="p-4 bg-card rounded-lg">
        <AppPieChartStacked />
      </div>
    </div>
  );
};

export default DashboardPage;
