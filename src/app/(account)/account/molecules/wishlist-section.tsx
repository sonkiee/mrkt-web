import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const WishListSection = ({ activeTab }: { activeTab: string }) => {
  return (
    <>
      {" "}
      {activeTab === "wishlist" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
              <CardDescription>
                Items you&apos;ve saved for later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {/* {[...Array(4)].map((_, i) => (
                  <div key={i} className="group relative rounded-lg border">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=300&width=300&text=Item${
                          i + 1
                        }`}
                        alt={`Wishlist item ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">
                        {i === 0
                          ? "Wireless Earbuds"
                          : i === 1
                          ? "Smart Watch"
                          : i === 2
                          ? "Bluetooth Speaker"
                          : "Power Bank"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {i === 0
                          ? "Apple"
                          : i === 1
                          ? "Samsung"
                          : i === 2
                          ? "JBL"
                          : "Anker"}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-semibold">
                          ${(49.99 + i * 20).toFixed(2)}
                        </span>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                ))} */}

                <p className="text-sm text-muted-foreground">
                  Your wishlist is empty. Start adding items you love!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WishListSection;
