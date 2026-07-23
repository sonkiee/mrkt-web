"use client";

import { useState } from "react";
import { CreditCard, Truck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/components/breadcrumb";
import { CartSummaryCard } from "../cart/cart-summary";
import Shipping from "./_components/shipping";
import Payment from "./_components/payment";

export default function CheckoutPage() {
  // const { data } = useUser();
  // const user = data?.user;
  const [step, setStep] = useState("shipping");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-8 py-2">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold">Checkout</h1>

        <div className="mt-8">
          <Tabs value={step} onValueChange={setStep} className="w-full">
            <TabsList className="grid w-full grid-cols-2 ">
              {/* rounded-md bg-muted p-1 */}
              <TabsTrigger
                disabled
                value="shipping"
                className="flex items-center gap-2"
              >
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Shipping</span>
              </TabsTrigger>
              <TabsTrigger
                disabled
                value="payment"
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Payment</span>
              </TabsTrigger>
              {/* <TabsTrigger value="review" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Review</span>
              </TabsTrigger> */}
            </TabsList>

            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {step === "shipping" && <Shipping setStep={setStep} />}

                {step === "payment" && <Payment setStep={setStep} />}

                {/* <Review setStep={setStep} cart={cart} /> */}
              </div>

              <CartSummaryCard />
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
