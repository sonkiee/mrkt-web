// Featured Brands & Products Section
export function AuthorizedBrands() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <p className="font-semibold text-center uppercase text-gray-500">
          authorized reseller for
        </p>

        {/* Brands */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-500 ">
          {["Apple", "Samsung", "Google", "Xiaomi", "Huawei"].map((brand) => (
            <div
              key={brand}
              className=" p-4  flex items-center justify-center "
            >
              <p className="font-semibold text-lg">{brand}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
