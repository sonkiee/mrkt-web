import { RefreshCw } from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { ImWrench } from "react-icons/im";
import { ServiceTile } from "./service-card";

export function StoreServices() {
  return (
    <section className="py-16 bg-white">
      <div className="px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceTile
            icon={<FaShoppingBag className="text-blue-600 text-xl" />}
            title="Buy Latest Gadgets"
            color="bg-blue-100"
            description="Shop the latest smartphones, tablets, and accessories from top brands at competitive prices."
          />
          <ServiceTile
            icon={<RefreshCw className="text-green-600" size={20} />}
            title="Swap & Upgrade"
            color="bg-green-100"
            description="Trade in your old device for a new one. Get fair value and upgrade to the latest technology."
          />
          <ServiceTile
            icon={<ImWrench className="text-purple-600 text-xl" />}
            title="Expert Repair"
            color="bg-purple-100"
            description="Professional repair services for all major brands. Fast turnaround and quality parts guaranteed."
          />
        </div>
      </div>
    </section>
  );
}
