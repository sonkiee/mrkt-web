export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {children}
      </div>
    </div>
  );
}
