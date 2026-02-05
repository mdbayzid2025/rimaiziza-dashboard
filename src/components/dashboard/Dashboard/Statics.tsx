import { FiBarChart2, FiPercent, FiPieChart, FiUsers } from "react-icons/fi";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../ui/card";


const StatsCards = () => {
  const stats = [
    {
      title: "Traffic",
      value: "350,897",
      icon: FiBarChart2,
      iconBgColor: "bg-red-500",
      change: 3.48,
      changeLabel: "Since last month",
      isPositive: true,
    },
    {
      title: "New users",
      value: "2,356",
      icon: FiPieChart,
      iconBgColor: "bg-amber-500",
      change: 3.48,
      changeLabel: "Since last week",
      isPositive: false,
    },
    {
      title: "Sales",
      value: "924",
      icon: FiUsers,
      iconBgColor: "bg-yellow-500",
      change: 1.10,
      changeLabel: "Since yesterday",
      isPositive: false,
    },
    {
      title: "Performance",
      value: "49.65%",
      icon: FiPercent,
      iconBgColor: "bg-cyan-500",
      change: 12,
      changeLabel: "Since last month",
      isPositive: true,
    },
  ];

  return (
    <div className="w-full bg-gradient-info px-4 pt-4 pb-56">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden" data-aos="fade-up" data-aos-delay={index * 100}>
              <CardContent className="px-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
                      stat.iconBgColor
                    )}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCards;