import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ProductFilter } from "@/types";

export default function FilterContent({
  slug,
  filter,
  setFilter,
}: {
  slug: string;
  filter: ProductFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProductFilter>>;
}) {
  return (
    <div className=" space-y-6">
      <div>
        <h3 className="mb-4 font-semibold">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 2000]} max={2000} step={1} />
          <div className="flex items-center justify-between">
            <span className="text-sm">$0</span>
            <span className="text-sm">$2000</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Brand</h3>
        <div className="space-y-2">
          {getBrands(slug).map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={`brand-${brand}`} />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {["smartphone", "iphone", "samsung"].some((keyword) =>
        slug.includes(keyword),
      ) && (
        <>
          <div>
            <h3 className="mb-4 font-semibold">Storage</h3>
            <div className="space-y-2">
              {["64GB", "128GB", "256GB", "512GB", "1TB"].map((storage) => (
                <div key={storage} className="flex items-center space-x-2">
                  <Checkbox
                    id={`storage-${storage}`}
                    checked={filter.storage === parseInt(storage)}
                    onCheckedChange={(checked) =>
                      setFilter((prev) => ({
                        ...prev,
                        storage: checked ? parseInt(storage) : undefined,
                      }))
                    }
                  />
                  <label
                    htmlFor={`storage-${storage}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {storage}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Condition</h3>
            <div className="space-y-2">
              {["new", "used", "refurbised", "uk", "fairly used"].map(
                (storage) => (
                  <div key={storage} className="flex items-center space-x-2">
                    <Checkbox id={`storage-${storage}`} />
                    <label
                      htmlFor={`storage-${storage}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {storage}
                    </label>
                  </div>
                ),
              )}
            </div>
          </div>
        </>
      )}

      {slug === "laptops" && (
        <>
          <div>
            <h3 className="mb-4 font-semibold">Processor</h3>
            <div className="space-y-2">
              {[
                "Intel Core i5",
                "Intel Core i7",
                "Intel Core i9",
                "AMD Ryzen 5",
                "AMD Ryzen 7",
                "Apple M1",
                "Apple M2",
              ].map((processor) => (
                <div key={processor} className="flex items-center space-x-2">
                  <Checkbox id={`processor-${processor}`} />
                  <label
                    htmlFor={`processor-${processor}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {processor}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">RAM</h3>
            <div className="space-y-2">
              {["8GB", "16GB", "32GB", "64GB"].map((ram) => (
                <div key={ram} className="flex items-center space-x-2">
                  <Checkbox id={`ram-${ram}`} />
                  <label
                    htmlFor={`ram-${ram}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ram}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* <div>
          <h3 className="mb-4 font-semibold">Rating</h3>
          <div className="space-y-2">
            {[
              "4 Stars & Up",
              "3 Stars & Up",
              "2 Stars & Up",
              "1 Star & Up",
            ].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {rating}
                </label>
              </div>
            ))}
          </div>
        </div> */}

      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}

function getBrands(category: string) {
  switch (category) {
    case "smartphone":
      return ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"];
    case "laptops":
      return ["Apple", "Dell", "HP", "Lenovo", "ASUS"];
    case "tablets":
      return ["Apple", "Samsung", "Microsoft", "Lenovo", "Amazon"];
    case "accessories":
      return ["Anker", "Belkin", "Logitech", "JBL", "Sony"];
    case "parts":
      return ["Samsung", "Western Digital", "Corsair", "Kingston", "Seagate"];
    default:
      return ["Generic Brand"];
  }
}
