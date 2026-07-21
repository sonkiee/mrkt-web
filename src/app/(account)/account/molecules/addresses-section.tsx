import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserAddress } from "@/queries";
import { Edit, Plus, Trash2 } from "lucide-react";

const AddressesSection = ({ activeTab }: { activeTab: string }) => {
  const { data: addresses, isLoading } = useGetUserAddress();
  if (isLoading) {
    return null;
  }
  const addr = addresses.data || [];
  console.log("Fetched addresses", addr);
  return (
    <>
      {" "}
      {activeTab === "addresses" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Shipping Addresses</CardTitle>
                <CardDescription>
                  Manage your shipping addresses.
                </CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {isLoading && <p>Loading addresses...</p>}

                {addr?.length === 0 && (
                  <p>No addresses found. Please add one.</p>
                )}

                {addr?.map(
                  (address: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    phone: string;
                    address: string;
                    city: string;
                    state: string;
                    country?: string;
                  }) => (
                    <div
                      key={address.id}
                      className="relative rounded-lg border p-4"
                    >
                      <Badge className="absolute right-2 top-2">Default</Badge>
                      <div className="space-y-1">
                        {/* <h3 className="font-medium">Home</h3> */}
                        <p className="text-sm capitalize">
                          {address.firstName} {address.lastName}
                        </p>
                        <p className="text-sm capitalize">{address.address}</p>
                        <p className="text-sm capitalize">
                          {address.city}, {address.state}{" "}
                        </p>
                        <p className="text-sm capitalize">
                          {address.country ?? "NGN"}
                        </p>
                        <p className="text-sm">{address.phone}</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddressesSection;
