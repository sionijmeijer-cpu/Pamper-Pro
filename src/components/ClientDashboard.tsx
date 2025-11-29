import { Card } from './ui/card';

export function ClientDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Client Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-2">Active Bookings</h3>
          <p className="text-3xl font-bold text-emerald-600">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold mb-2">Completed Services</h3>
          <p className="text-3xl font-bold text-emerald-600">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-emerald-600">$0</p>
        </Card>
      </div>
    </div>
  );
}
