// Shipping.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/actions";
import { useGetUserAddress } from "@/queries/user";

import type { CreateOrderData, ShippingData } from "@/schema";
import { shippingSchema } from "@/schema";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { useOrderStore } from "@/store/order";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetSearchQuery } from "@/hooks/use-set-search-query";
import { Address } from "@/types";

const Shipping = ({ setStep }: { setStep: (step: string) => void }) => {
  const r = useRouter();
  const sp = useSearchParams();
  const setSearchQuery = useSetSearchQuery();
  const { data: addresses } = useGetUserAddress();
  const { items: cartItems } = useCartStore();
  const { setOrderId } = useOrderStore();
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup",
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [saveToAddressBook, setSaveToAddressBook] = useState(false);

  const hasSavedAddresses = addresses;

  console.log("User addresses:", addresses);

  // FORM SHOULD VALIDATE ONLY SHIPPING FIELDS (not the whole createOrder payload)
  const f = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      saveToAddressBook: false, // ✅ add default value

      // optional in schema:
      // zip: "",
      // country: "Nigeria",
      // label: "primary",

      // items: {}
    },
    mode: "onSubmit",
  });

  const { execute, isExecuting } = useAction(createOrder, {
    onSuccess(data) {
      const orderId = data?.data?.data?.id;
      console.log("Order created successfully:", data?.data?.data);
      console.log("Extracted orderId:", orderId);
      if (!orderId) return;
      setOrderId(orderId);
      setStep("payment");

      setSearchQuery("orderId", orderId);
      // setSearchQuery("step", "payment");
    },
    onError(error) {
      console.error("Error creating order:", error);
      toast.error(
        error.error.serverError ??
          "An unexpected error occurred. Please try again.",
      );
    },
  });

  const canUseSavedAddress = deliveryMethod === "delivery" && hasSavedAddresses;

  const onSubmit = (shippingValues: ShippingData) => {
    if (!cartItems.length) {
      console.error("Cart is empty");
      return;
    }

    // Build CreateOrderData that matches createOrderSchema union
    const payload: CreateOrderData =
      canUseSavedAddress && selectedAddressId
        ? {
            items: cartItems,
            deliveryMethod,
            addressId: selectedAddressId,
            // shippingAddress optional in this branch; omit it
          }
        : {
            items: cartItems,
            deliveryMethod,
            saveToAddressBook,
            shippingAddress: {
              ...shippingValues,
            },
          };

    console.log("Submitting order with payload:", payload);

    execute(payload);
  };

  return (
    <TabsContent value="shipping" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Shipping Information</h2>

          {/* Delivery method */}
          <div className="mt-4">
            <Label className="mb-2 block">Delivery Method</Label>

            <RadioGroup
              value={deliveryMethod}
              onValueChange={(v) =>
                setDeliveryMethod(v as "pickup" | "delivery")
              }
              className="grid gap-3"
            >
              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">Pickup</Label>
              </div>

              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Delivery</Label>
              </div>
            </RadioGroup>
          </div>

          {/* If delivery + saved addresses exist, allow selecting */}
          {canUseSavedAddress && (
            <div className="mt-6 space-y-2">
              <Label className="block">Select Saved Address</Label>

              <div className="grid gap-2">
                {addresses?.data?.map((a: Address) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedAddressId(a.id)}
                    className={`rounded-lg border p-3 text-left ${
                      selectedAddressId === a.id ? "border-black" : ""
                    }`}
                  >
                    <div className="font-medium">
                      {a.firstName} {a.lastName} • {a.phone}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {a.addressLine}, {a.city}, {a.state}
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                Or fill a new address below.
              </div>
            </div>
          )}

          {deliveryMethod === "delivery" && (
            <div className="mt-6 grid gap-4">
              <Form {...f}>
                <form onSubmit={f.handleSubmit(onSubmit)} className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={f.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Zakari" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={f.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Kanima" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={f.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="08012345678" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={f.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123 Main Street" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={f.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Lagos" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={f.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Lagos" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Save address checkbox (only makes sense for delivery) */}
                  {deliveryMethod === "delivery" && (
                    <div className="flex items-center space-x-2 pt-2">
                      <FormField
                        control={f.control}
                        name="saveToAddressBook"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Save to Address Book</FormLabel>
                            <FormControl>
                              <Checkbox
                                id="save-address"
                                checked={saveToAddressBook}
                                onCheckedChange={(checked) =>
                                  setSaveToAddressBook(checked === true)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <label
                        htmlFor="save-address"
                        className="text-sm font-medium leading-none"
                      >
                        Save this address for future orders
                      </label>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={isExecuting}>
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Shipping;
