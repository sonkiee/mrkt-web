import { CheckCircle, Icon } from "lucide-react";

export function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-row items-center gap-4">
      <IconBox icon={<CheckCircle />} />
      <div>
        <h3 className="font-semibold ">{title}</h3>
        <p className="text-gray-100 text-sm">{description}</p>
      </div>
    </div>
  );
}

export const IconBox = ({ icon }: { icon: React.ReactNode }) => (
  <div className="flexm p-1 shrink-0 items-center justify-center  bg-blue-100 rounded-2xl ">
    {icon}
  </div>
);

// export function FeatureCard({
//   icon,
//   title,
//   description,
// }: {
//   icon?: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
//       {icon ? (
//         <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center">
//           {icon}
//         </div>
//       ) : null}

//       <div className="min-w-0">
//         <h4 className="font-semibold text-gray-900">{title}</h4>
//         <p className="mt-1 text-sm text-gray-600">{description}</p>
//       </div>
//     </div>
//   );
// }
