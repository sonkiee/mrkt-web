import React from "react";
import { cn } from "@/utils/cn";
import { Card } from "./ui/card";

export function ServiceTile({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}) {
  return (
    <Card className="px-10 py-12 text-left shadow-none border-none bg-gray-50 rounded-3xl">
      <ServiceIcon icon={icon} color={color} />
      {/* FIX: remove `text` + remove `-mb-5` */}
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </Card>
  );
}

export const ServiceIcon = ({
  icon,
  color,
}: {
  icon: React.ReactNode;
  color?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-center w-12 h-12 rounded-2xl mb-4",
      color ?? "bg-blue-100",
    )}
  >
    {icon}
  </div>
);
