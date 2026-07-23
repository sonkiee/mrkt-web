export default function SecurityAudit() {
  return (
    <div className="bg-white rounded-xl border">
      <div className="px-6 py-4 border-b">
        <h3 className="font-bold">Security & Audit</h3>
      </div>

      <div className="p-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Fraud Score</span>
          <span className="text-green-600 font-bold">02 / 100</span>
        </div>

        <div className="flex justify-between">
          <span>IP Address</span>
          <span>192.168.1.45</span>
        </div>

        <div className="flex justify-between">
          <span>Device</span>
          <span>Safari on macOS</span>
        </div>

        <div className="flex justify-between">
          <span>Location</span>
          <span>San Francisco, US</span>
        </div>
      </div>
    </div>
  );
}
