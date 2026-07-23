export default function PcOnly() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          PC or Desktop Required
        </h1>

        <p className="mt-3 text-gray-600">
          This page can only be accessed using a PC or desktop computer.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Please switch to a PC or desktop device to continue.
        </p>
      </div>
    </div>
  );
}
