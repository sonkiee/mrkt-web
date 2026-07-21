import { Input } from "@/components/ui/input";

export function AdminHeader() {
  return (
    <header className="border-b p-4 flex items-center justify-between">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <Input placeholder="Search..." className="w-64" />
    </header>
  );
}
