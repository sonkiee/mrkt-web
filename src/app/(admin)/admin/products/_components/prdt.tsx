export default function Prdt({
  name,
  category,
}: {
  name: string;
  category?: string;
}) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="w-8 h-8 rounded-lg bg-gray-300" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-gray-500">Category</span>
      </div>
    </div>
  );
}
