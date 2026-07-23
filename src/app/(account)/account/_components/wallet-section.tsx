import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

export const WalletSection = ({ activeTab }: { activeTab: string }) => {
  return (
    <>
      {activeTab === "wallet" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Manage your wallet.</CardDescription>
              </div>
              <Button disabled size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Top Up Wallet Balance
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm ">
                      Coming Soon: In the future, you&apos;ll be able to manage
                      your wallet here!
                    </h1>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
