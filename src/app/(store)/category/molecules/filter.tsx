import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Filter as FilterIcon } from "lucide-react";
import { useParams } from "next/navigation";
import FilterContent from "./filter-content";
import FilterMobile from "./filter-mobile";
import { ProductFilter } from "@/types";

export default function Filter({
  filter,
  setFilter,
}: {
  filter: ProductFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProductFilter>>;
}) {
  const params = useParams();
  const slug = params.category as string;
  console.log("Filter slug:", slug);
  return (
    <div className="space-y-6 bg-white p-4 rounded-md">
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="font-semibold">Filters</h2>
        <FilterMobile {...{ filter, setFilter }} slug={slug} />
      </div>

      <div className="hidden lg:block">
        <FilterContent {...{ filter, setFilter }} slug={slug} />
      </div>
    </div>
  );
}
