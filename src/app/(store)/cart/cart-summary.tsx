import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartSummary } from "@/hooks/use-cart-summary";
import { naira } from "@/utils/naira";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function CartSummaryCard() {
  const pathname = usePathname();
  const { subtotal, shipping, total } = useCartSummary();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true);
    }
  };
  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{naira(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{naira(shipping)}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-{naira(subtotal * 0.1)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{naira(total)}</span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Input
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button variant="outline" onClick={handleApplyPromo}>
                Apply
              </Button>
            </div>
            {promoApplied && (
              <div className="text-sm text-green-600">
                Promo code &quot;DISCOUNT10&quot; applied successfully!
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 p-6 pt-0">
          {pathname.includes("/cart") && (
            <Button className="w-full" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          )}

          <div className="mt-4 text-center text-xs text-muted-foreground">
            By proceeding to checkout, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
