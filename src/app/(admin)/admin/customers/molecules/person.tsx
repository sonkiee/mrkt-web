export default function Person({
  fname,
  lname,
  email,
}: {
  fname: string;
  lname: string;
  email: string;
}) {
  const name = `${fname} ${lname}`;
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="w-8 h-8 rounded-full bg-gray-300" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-gray-500">{email}</span>
      </div>
    </div>
  );
}
