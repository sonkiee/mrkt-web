import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import FilterContent from "./filter-content";
import { ProductFilter } from "@/types";

export default function FilterMobile({
  filter,
  setFilter,
  slug,
}: {
  filter: ProductFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProductFilter>>;
  slug: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[320px] sm:w-95 px-2 py-6">
        {/* In the drawer, Filter must render its content (no lg:hidden inside it) */}
        <FilterContent {...{ filter, setFilter }} slug={slug} />
      </SheetContent>
    </Sheet>
  );
}
