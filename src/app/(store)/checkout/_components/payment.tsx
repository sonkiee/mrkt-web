import { placeOrder } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TabsContent } from "@/components/ui/tabs";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Payment = ({ setStep }: { setStep: (step: string) => void }) => {
  const sp = useSearchParams();
  const orderId = sp.get("orderId");
  const router = useRouter();

  console.log("orderId from query params", orderId);

  const { execute, isExecuting } = useAction(placeOrder, {
    onSuccess: (response) => {
      // window.location.href = response?.data?.data.authorizationUrl;
      // console.log("Payment successfully", response?.data?.data);
      console.log("Payment resposne", response);
      const accessCode = response?.data?.data.access_code;

      console.log("Access code for payment", accessCode);
      if (accessCode) {
        pay(accessCode);
        return;
      }
    },
    onError: (error) => {
      console.error("Error placing order", error);
    },
  });

  if (!orderId) {
    console.error("No orderId available");
    return;
  }

  const pay = async (accessCode: string) => {
    const PaystackModule = await import("@paystack/inline-js");
    const Paystack = PaystackModule.default;
    const paystack = new Paystack();
    paystack.resumeTransaction(accessCode, {
      // key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      onCancel: () => {
        router.push(
          `/checkout/verify?reason=cancelled&orderId=${encodeURIComponent(orderId ?? "")}`,
        );
      },
      onError: (e) => {
        router.push(
          `/checkout/verify?reason=${encodeURIComponent(e?.message ?? "error")}&orderId=${encodeURIComponent(orderId ?? "")}`,
        );
      },
      onSuccess: (tx) => {
        router.push(
          `/checkout/verify?trxref=${encodeURIComponent(tx.reference)}&orderId=${encodeURIComponent(orderId ?? "")}`,
        );
      },
    });

    // handler?.openIframe();
  };

  return (
    <TabsContent value="payment" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <RadioGroup defaultValue="credit-card" className="mt-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="font-medium">
                  Credit Card
                </Label>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Visa"
                  width={36}
                  height={24}
                />
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Mastercard"
                  width={36}
                  height={24}
                />
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Amex"
                  width={36}
                  height={24}
                />
              </div>
            </div>
          </RadioGroup>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep("shipping")}>
              Back to Shipping
            </Button>
            <Button onClick={() => execute({ orderId })} disabled={isExecuting}>
              Complete Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Payment;
