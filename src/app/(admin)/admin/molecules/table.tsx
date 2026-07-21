import { EllipsisVertical } from "lucide-react";

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export function Table({ children, className = "" }: TableProps) {
  return (
    <table
      className={`min-w-full divide-y divide-gray-200 text-sm ${className}`}
    >
      {children}
    </table>
  );
}

export function TableHeader({ children, className = "" }: TableProps) {
  return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
}

export function TableBody({ children, className = "" }: TableProps) {
  return (
    <tbody className={`divide-y divide-gray-200 bg-white ${className}`}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = "" }: TableProps) {
  return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>;
}

export function TableHeaderCell({ children, className = "" }: TableProps) {
  return (
    <th
      className={`px-6 py-3 text-xs text-left font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

export function TableHeaderNameCell({ children, className = "" }: TableProps) {
  return (
    <th
      className={`px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "" }: TableProps) {
  return <td className={`px-6 py-4 text-gray-600 ${className}`}>{children}</td>;
}
