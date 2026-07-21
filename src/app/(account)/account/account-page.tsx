"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Heart,
  Home,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner";
import { useFetchUserProfile } from "@/queries/user";
import ProfileSection from "./molecules/profile-section";
import OrdersSection from "./molecules/orders-section";
import AddressesSection from "./molecules/addresses-section";
import WishListSection from "./molecules/wishlist-section";
import SettingsSection from "./molecules/settings-section";
import AccountSidebar from "./molecules/account-sidebar";
import AccountMobileNav from "./molecules/account-mobile-nav";
import { WalletSection } from "./molecules/wallet-section";
import { useAction } from "next-safe-action/hooks";
import { logout } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sp = new URLSearchParams(searchParams.toString());
  const tab = sp.get("tab");
  const [activeTab, setActiveTab] = useState(tab || "profile");
  const [showPassword, setShowPassword] = useState(false);
  const { data } = useFetchUserProfile();

  const user = data?.user;

  console.log("User fetched", user);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Profile updated", {
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Password updated", {
      description: "Your password has been changed successfully.",
    });
  };

  const { execute: logoutExecute } = useAction(logout, {
    onSuccess() {
      toast.warning("Logged out successfully!");
      router.replace("/signin");
      // router.refresh();
    },
    onError() {
      toast.error("Failed to log out. Please try again.");
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">My Account</span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button
            onClick={() => {
              logoutExecute();
            }}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Mobile Navigation */}
          <AccountMobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <div>
            {/* Profile Section */}
            <ProfileSection
              user={user}
              activeTab={activeTab}
              showPassword={showPassword}
              handleSaveProfile={handleSaveProfile}
              handleSavePassword={handleSavePassword}
              setShowPassword={setShowPassword}
            />

            {/* Orders Section */}
            <OrdersSection activeTab={activeTab} />

            {/* Addresses Section */}
            <AddressesSection activeTab={activeTab} />

            {/* Payment Methods Section */}
            <WalletSection activeTab={activeTab} />

            {/* Wishlist Section */}
            <WishListSection activeTab={activeTab} />

            {/* Settings Section */}
            <SettingsSection activeTab={activeTab} />

            {/* Mobile "More" Tab Content */}
            {activeTab === "more" && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="flex h-24 flex-col items-center justify-center gap-2"
                        onClick={() => setActiveTab("addresses")}
                      >
                        <Home className="h-6 w-6" />
                        <span>Addresses</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex h-24 flex-col items-center justify-center gap-2"
                        onClick={() => setActiveTab("wallet")}
                      >
                        <CreditCard className="h-6 w-6" />
                        <span>Wallet</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex h-24 flex-col items-center justify-center gap-2"
                        onClick={() => setActiveTab("wishlist")}
                      >
                        <Heart className="h-6 w-6" />
                        <span>Wishlist</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex h-24 flex-col items-center justify-center gap-2"
                        onClick={() => setActiveTab("settings")}
                      >
                        <Settings className="h-6 w-6" />
                        <span>Settings</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
