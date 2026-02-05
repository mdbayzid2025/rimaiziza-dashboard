import { OrdersChart } from './OrdersChart'
import RecentActivity from './RecentActivity'
import { SalesChart } from './SalesChart'
import StatsCards from './Statics'


const Dashboard = () => {
  return (
    <div className=''>
      <StatsCards />
      <div className="px-5 flex items-center gap-5 -mt-44 mb-6">
        <SalesChart />
        <OrdersChart />
      </div>      
      <RecentActivity />      
    </div>
  )
}

export default Dashboard