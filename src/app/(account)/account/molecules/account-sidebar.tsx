import { Button } from "@/components/ui/button";
import { useSetSearchQuery } from "@/hooks/use-set-search-query";

import {
  CreditCard,
  Heart,
  Home,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

const AccountSidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const setSearchQuery = useSetSearchQuery();

  const onClick = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery("tab", tab);
  };
  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="hidden lg:block lg:top-4">
        <nav className="flex flex-col gap-2">
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="justify-start gap-2"
            onClick={() => onClick("profile")}
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button
            variant={activeTab === "orders" ? "default" : "ghost"}
            className="justify-start gap-2"
            onClick={() => onClick("orders")}
          >
            <ShoppingBag className="h-4 w-4" />
            Orders
          </Button>
          <Button
            variant={activeTab === "addresses" ? "default" : "ghost"}
            className="justify-start gap-2"
            onClick={() => onClick("addresses")}
          >
            <Home className="h-4 w-4" />
            Addresses
          </Button>
          <Button
            variant={activeTab === "wallet" ? "default" : "ghost"}
            className="justify-start gap-2"
            onClick={() => onClick("wallet")}
          >
            <CreditCard className="h-4 w-4" />
            Wallet
          </Button>
          <Button
            variant={activeTab === "wishlist" ? "default" : "ghost"}
            className="justify-start gap-2"
            onClick={() => onClick("wishlist")}
          >
            <Heart className="h-4 w-4" />
            Wishlist
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="justify-start gap-2"
            onClick={() => onClick("settings")}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default AccountSidebar;
