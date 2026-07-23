export default function Analytics() {
  return (
    <>
      {/* Analytics */}
      <section className="bg-white border rounded-xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Performance Analytics</h2>

          <select className="text-sm border rounded-md">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year to Date</option>
          </select>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-xs text-indigo-600">Units Sold</p>
            <p className="text-3xl font-bold mt-2">842</p>
            <p className="text-xs text-indigo-500">↑ 12% vs last month</p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg">
            <p className="text-xs text-emerald-600">Gross Revenue</p>
            <p className="text-3xl font-bold mt-2">$294,691</p>
            <p className="text-xs text-emerald-500">↑ 8.4% vs last month</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-xs text-amber-600">Return Rate</p>
            <p className="text-3xl font-bold mt-2">1.2%</p>
            <p className="text-xs text-amber-500">↓ 0.4%</p>
          </div>

          <div className="p-4 bg-sky-50 rounded-lg">
            <p className="text-xs text-sky-600">Conversion Rate</p>
            <p className="text-3xl font-bold mt-2">4.8%</p>
            <p className="text-xs text-sky-500">Stable</p>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="p-6">
          <div className="h-64 flex items-center justify-center border border-dashed rounded-lg text-sm text-gray-400">
            Sales & Revenue Trend Graph
          </div>
        </div>
      </section>
    </>
  );
}
